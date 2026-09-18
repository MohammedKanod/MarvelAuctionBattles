import React, { useState, useEffect, useCallback, useRef } from 'react';
import { socket, SessionStorage } from './socket/socket';
import { RoomState, Player, RoomSettings, BattleRoundState, BattleBout } from '../../shared/types';
import { Hero } from './components/landing/Hero';
import { HowToPlayModal } from './components/landing/HowToPlayModal';
import { CreateRoomModal } from './components/room/CreateRoomModal';
import { JoinRoomModal } from './components/room/JoinRoomModal';
import { InviteLandingView, InviteErrorType } from './components/room/InviteLandingView';
import { LobbyView } from './components/lobby/LobbyView';
import { AuctionStage } from './components/auction/AuctionStage';
import { AuctionToBattleTransition } from './components/battle/AuctionToBattleTransition';
import { FighterSelectionView } from './components/battle/FighterSelectionView';
import { CinematicCardClashArena } from './components/battle/CinematicCardClashArena';
import { ResultsView } from './components/results/ResultsView';
import { CharacterRosterModal } from './components/roster/CharacterRosterModal';
import { ToastContainer, ToastMessage } from './components/ui/Toast';
import { SoundManager } from './sound/SoundManager';
import { UpdatePrompt } from './components/pwa/UpdatePrompt';
import { usePwaInstall } from './pwa/usePwaInstall';
import { InstallAppModal } from './components/pwa/InstallAppModal';
import { gameAnalytics } from './analytics/gameAnalytics';

export const App: React.FC = () => {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [selfPlayerId, setSelfPlayerId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(SoundManager.isMuted());

  // PWA Web App Install state & 2.5s building animation
  const {
    isStandalone,
    isInstalled,
    isBuilding,
    buildProgress,
    statusText,
    installStatus,
    isModalOpen: isInstallModalOpen,
    isIos,
    startBuildAndInstall,
    closeModal: closeInstallModal
  } = usePwaInstall();

  // Current active bout in clash arena
  const [currentBout, setCurrentBout] = useState<BattleBout | null>(null);

  // Invite URL routing state
  const [inviteRoomCode, setInviteRoomCode] = useState<string | null>(() => {
    const path = window.location.pathname;
    const joinMatch = path.match(/^\/join\/([A-Za-z0-9]+)$/i);
    if (joinMatch) return joinMatch[1].toUpperCase();
    const roomMatch = path.match(/^\/room\/([A-Za-z0-9]+)$/i);
    if (roomMatch) return roomMatch[1].toUpperCase();
    return null;
  });
  const [inviteErrorType, setInviteErrorType] = useState<InviteErrorType>(null);
  const [isJoiningInvite, setIsJoiningInvite] = useState(false);
  const joiningViaInviteRef = useRef(false);

  // Analytics dedup refs
  const lastAuctionRoundRef = useRef<number>(-1);
  const lastBattleRoundRef = useRef<number>(-1);
  const gameCompletedFiredRef = useRef(false);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [initialRoomCode, setInitialRoomCode] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleMute = () => {
    const nextMuted = SoundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Modal navigation with Android back button support
  const openCreateModal = () => {
    try { window.history.pushState({ modal: 'create' }, ''); } catch {}
    setIsCreateOpen(true);
  };
  const closeCreateModal = () => setIsCreateOpen(false);

  const openJoinModal = (code: string = '') => {
    setInitialRoomCode(code);
    try { window.history.pushState({ modal: 'join' }, ''); } catch {}
    setIsJoinOpen(true);
  };
  const closeJoinModal = () => setIsJoinOpen(false);

  const openHowToPlayModal = () => {
    try { window.history.pushState({ modal: 'howToPlay' }, ''); } catch {}
    setIsHowToPlayOpen(true);
  };
  const closeHowToPlayModal = () => setIsHowToPlayOpen(false);

  const openRosterModal = () => {
    try { window.history.pushState({ modal: 'roster' }, ''); } catch {}
    setIsRosterOpen(true);
  };
  const closeRosterModal = () => setIsRosterOpen(false);

  // Fire app_loaded analytics once on mount
  useEffect(() => {
    gameAnalytics.appLoaded();
  }, []);

  // URL synchronization helper
  const syncUrl = useCallback((path: string) => {
    try {
      if (window.location.pathname !== path) {
        window.history.replaceState(null, '', path);
      }
    } catch {}
  }, []);

  // Sync URL when room state changes
  useEffect(() => {
    if (room) {
      syncUrl(`/room/${room.roomCode}`);
    } else if (!inviteRoomCode) {
      syncUrl('/');
    }
  }, [room, inviteRoomCode, syncUrl]);

  // Android Back button (popstate) handler
  useEffect(() => {
    const handlePopState = () => {
      if (isInstallModalOpen) {
        closeInstallModal();
      } else if (isRosterOpen) {
        setIsRosterOpen(false);
      } else if (isHowToPlayOpen) {
        setIsHowToPlayOpen(false);
      } else if (isJoinOpen) {
        setIsJoinOpen(false);
      } else if (isCreateOpen) {
        setIsCreateOpen(false);
      } else if (inviteRoomCode && !room) {
        // Back from invite landing -> go home
        setInviteRoomCode(null);
        setInviteErrorType(null);
        syncUrl('/');
      } else if (room) {
        // Protect active real-time battle & auction states from accidental back gestures
        if (room.phase === 'AUCTION' || room.phase === 'BATTLE') {
          try { window.history.pushState(null, ''); } catch {}
          addToast('info', 'MATCH IN PROGRESS', 'Active match in progress. Cannot navigate back.');
        } else if (room.phase === 'LOBBY' || room.phase === 'RESULTS') {
          SessionStorage.clearSession();
          setRoom(null);
          setSelfPlayerId(null);
          setCurrentBout(null);
          syncUrl('/');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isRosterOpen, isHowToPlayOpen, isJoinOpen, isCreateOpen, room, inviteRoomCode, addToast, syncUrl]);

  // Socket event subscriptions
  useEffect(() => {
    const saved = SessionStorage.getSavedSession();
    if (saved) {
      socket.emit('RECONNECT_SESSION', {
        sessionToken: saved.sessionToken,
        roomCode: saved.roomCode
      });
    }

    socket.on('ROOM_CREATED', ({ room, selfPlayerId, sessionToken }) => {
      setRoom(room);
      setSelfPlayerId(selfPlayerId);
      SessionStorage.saveSession(sessionToken, room.roomCode, selfPlayerId);
      setIsCreateOpen(false);
      gameAnalytics.roomCreated(room.settings?.maxPlayers || 0, room.players.length);
      gameCompletedFiredRef.current = false;
      addToast('success', 'ROOM CREATED', `Room ${room.roomCode} is live! Share with friends.`);
    });

    socket.on('ROOM_JOINED', ({ room, selfPlayerId, sessionToken }) => {
      setRoom(room);
      setSelfPlayerId(selfPlayerId);
      SessionStorage.saveSession(sessionToken, room.roomCode, selfPlayerId);
      setIsJoinOpen(false);
      // Clear invite state on successful join
      if (joiningViaInviteRef.current) {
        setInviteRoomCode(null);
        setInviteErrorType(null);
        setIsJoiningInvite(false);
        joiningViaInviteRef.current = false;
      }
      gameAnalytics.roomJoined(room.settings?.maxPlayers || 0, room.players.length, room.roomCode);
      gameCompletedFiredRef.current = false;
      addToast('success', 'JOINED LOBBY', `Connected to Room ${room.roomCode}`);
    });

    socket.on('STATE_SYNC', ({ room }) => {
      setRoom(room);
    });

    socket.on('PLAYER_JOINED', ({ player, room }) => {
      setRoom(room);
      SoundManager.playClick();
      addToast('info', 'PLAYER JOINED', `${player.name} joined the battle lobby!`);
    });

    socket.on('PLAYER_LEFT', ({ playerId, room }) => {
      setRoom(room);
      addToast('info', 'PLAYER LEFT', `A player disconnected.`);
    });

    socket.on('PLAYER_READY_CHANGED', ({ room }) => {
      setRoom(room);
      SoundManager.playClick();
    });

    socket.on('SETTINGS_UPDATED', ({ room }) => {
      setRoom(room);
      addToast('info', 'SETTINGS UPDATED', 'Host updated match configuration.');
    });

    socket.on('GAME_STARTED', ({ room }) => {
      setRoom(room);
      SoundManager.playCharacterReveal();
    });

    socket.on('AUCTION_ROUND_STARTED', ({ auction, room }) => {
      setRoom(room);
      SoundManager.playCharacterReveal();
      const roundIndex = auction?.currentRound ?? room?.auction?.currentRound ?? 0;
      if (roundIndex !== lastAuctionRoundRef.current) {
        lastAuctionRoundRef.current = roundIndex;
        if (roundIndex === 0) {
          gameAnalytics.auctionStarted(roundIndex, room.players?.length || 0);
        }
        const charId = auction?.character?.id || room?.auction?.character?.id || '';
        if (charId) {
          gameAnalytics.characterRevealed(charId, roundIndex);
        }
      }
    });

    socket.on('AUCTION_TIMER_TICK', ({ timerSeconds, endsAt }) => {
      setRoom((prev) => {
        if (!prev || !prev.auction) return prev;
        if (prev.auction.timerSeconds === timerSeconds && prev.auction.endsAt === endsAt) {
          return prev;
        }
        return {
          ...prev,
          auction: {
            ...prev.auction,
            timerSeconds,
            endsAt
          }
        };
      });
    });

    socket.on('BID_PLACED', ({ bid, currentBid, currentLeaderId, currentLeaderName, endsAt, timerSeconds }) => {
      SoundManager.playBid();
      setRoom((prev) => {
        if (!prev || !prev.auction) return prev;
        return {
          ...prev,
          auction: {
            ...prev.auction,
            currentBid,
            currentLeaderId,
            currentLeaderName,
            endsAt,
            timerSeconds,
            bidHistory: [bid, ...prev.auction.bidHistory]
          }
        };
      });
    });

    socket.on('PLAYER_OUTBID', ({ newBid, newLeaderName }) => {
      SoundManager.playOutbid();
      addToast('outbid', 'OUTBID!', `${newLeaderName} raised the bid to 🪙 ${newBid}!`);
    });

    socket.on('PLAYER_PASSED_AUCTION', ({ playerId, playerName, room }) => {
      setRoom(room);
      if (playerId === selfPlayerId) {
        addToast('info', 'PASSED', 'You passed this auction. Character will not be yours.');
      } else {
        addToast('info', 'PLAYER PASSED', `${playerName} passed on this character.`);
      }
    });

    socket.on('CHARACTER_SOLD', ({ winnerId, character, winningBid, room }) => {
      setRoom(room);
      if (character?.id) {
        gameAnalytics.characterWon(character.id, winningBid);
      }
    });

    socket.on('CHARACTER_UNSOLD', ({ character, room }) => {
      setRoom(room);
      SoundManager.playGavel();
      addToast('info', 'UNSOLD // DISCARDED', `${character.name} was passed / unsold and returned to the pool.`);
    });

    socket.on('AUCTION_TRANSITION_STARTED', ({ room }) => {
      setRoom(room);
      gameAnalytics.auctionCompleted();
    });

    socket.on('FIGHTER_SELECTION_STARTED', ({ battleRound, room }) => {
      setRoom(room);
      setCurrentBout(null);
      SoundManager.playCharacterReveal();
      const ri = battleRound?.roundIndex ?? 0;
      if (ri !== lastBattleRoundRef.current) {
        lastBattleRoundRef.current = ri;
        gameAnalytics.battleStarted(ri, room.players?.length || 0);
      }
      addToast('info', 'CHOOSE YOUR FIGHTER', `Bout #${battleRound.roundIndex}: Secretly lock in 1 hero!`);
    });

    socket.on('PLAYER_LOCKED_FIGHTER', ({ room }) => {
      setRoom(room);
      SoundManager.playClick();
    });

    socket.on('FIGHTERS_REVEAL_COUNTDOWN', ({ countdown, room }) => {
      setRoom(room);
      SoundManager.playTick(true);
    });

    socket.on('FIGHTERS_REVEALED', ({ battleRound, room }) => {
      setRoom(room);
      SoundManager.playGavel();
    });

    socket.on('BOUT_STARTED', ({ bout, room }) => {
      setRoom(room);
      setCurrentBout(bout);
    });

    socket.on('BOUT_COMPLETED', ({ bout, room }) => {
      setRoom(room);
      const ri = bout?.roundNumber ?? room?.battleRound?.roundIndex ?? 0;
      gameAnalytics.battleCompleted(ri);
    });

    socket.on('GAME_COMPLETED', ({ tournament, room }) => {
      setRoom(room);
      setCurrentBout(null);
      SoundManager.playVictory();
      if (!gameCompletedFiredRef.current) {
        gameCompletedFiredRef.current = true;
        gameAnalytics.winnerRevealed(room.players?.length || 0);
        gameAnalytics.gameCompleted();
      }
    });

    socket.on('ERROR_NOTIFICATION', ({ message }) => {
      SoundManager.playOutbid();
      // Map join errors to invite error types when joining via invite link
      if (joiningViaInviteRef.current) {
        setIsJoiningInvite(false);
        if (message.includes('does not exist')) {
          setInviteErrorType('NOT_FOUND');
        } else if (message.includes('full')) {
          setInviteErrorType('FULL');
        } else if (message.includes('already started')) {
          setInviteErrorType('STARTED');
        } else {
          setInviteErrorType('GENERIC');
        }
        joiningViaInviteRef.current = false;
        return; // Don't show normal toast for invite errors
      }
      addToast('error', 'REJECTED', message);
    });

    return () => {
      socket.off('ROOM_CREATED');
      socket.off('ROOM_JOINED');
      socket.off('STATE_SYNC');
      socket.off('PLAYER_JOINED');
      socket.off('PLAYER_LEFT');
      socket.off('PLAYER_READY_CHANGED');
      socket.off('SETTINGS_UPDATED');
      socket.off('GAME_STARTED');
      socket.off('AUCTION_ROUND_STARTED');
      socket.off('AUCTION_TIMER_TICK');
      socket.off('BID_PLACED');
      socket.off('PLAYER_OUTBID');
      socket.off('PLAYER_PASSED_AUCTION');
      socket.off('CHARACTER_SOLD');
      socket.off('CHARACTER_UNSOLD');
      socket.off('AUCTION_TRANSITION_STARTED');
      socket.off('FIGHTER_SELECTION_STARTED');
      socket.off('PLAYER_LOCKED_FIGHTER');
      socket.off('FIGHTERS_REVEAL_COUNTDOWN');
      socket.off('FIGHTERS_REVEALED');
      socket.off('BOUT_STARTED');
      socket.off('BOUT_COMPLETED');
      socket.off('GAME_COMPLETED');
      socket.off('ERROR_NOTIFICATION');
    };
  }, [selfPlayerId, addToast]);

  // Client Actions
  const handleCreateRoom = (playerName: string, settings: RoomSettings) => {
    gameAnalytics.createRoomClicked();
    socket.emit('CREATE_ROOM', { playerName, settings });
  };

  const handleJoinRoom = (roomCode: string, playerName: string) => {
    gameAnalytics.joinRoomClicked(roomCode);
    socket.emit('JOIN_ROOM', { roomCode, playerName });
  };

  // Join via invite link
  const handleInviteJoin = (roomCode: string, playerName: string) => {
    gameAnalytics.playClicked('invite_landing');
    gameAnalytics.joinRoomClicked(roomCode);
    setIsJoiningInvite(true);
    joiningViaInviteRef.current = true;
    socket.emit('JOIN_ROOM', { roomCode, playerName });
  };

  // Return from invite landing to home
  const handleInviteBackToHome = () => {
    setInviteRoomCode(null);
    setInviteErrorType(null);
    setIsJoiningInvite(false);
    joiningViaInviteRef.current = false;
    syncUrl('/');
  };

  const handleToggleReady = () => {
    const selfP = room?.players.find((p) => p.id === selfPlayerId);
    gameAnalytics.playerReady(!selfP?.isReady);
    socket.emit('TOGGLE_READY');
  };

  const handleStartGame = () => {
    socket.emit('START_GAME');
  };

  const handlePlaceBid = (amount: number) => {
    const charId = room?.auction?.character?.id;
    gameAnalytics.bidPlaced(amount, charId);
    socket.emit('PLACE_BID', { amount });
  };

  const handlePassAuction = () => {
    socket.emit('PASS_AUCTION');
  };

  const handleLockFighter = (characterId: string) => {
    socket.emit('LOCK_FIGHTER', { characterId });
  };

  const handleNextBout = () => {
    socket.emit('NEXT_BOUT');
  };

  const handlePlayAgain = () => {
    gameAnalytics.rematchClicked();
    gameCompletedFiredRef.current = false;
    socket.emit('PLAY_AGAIN');
  };

  const handleLeaveRoom = () => {
    SessionStorage.clearSession();
    setRoom(null);
    setSelfPlayerId(null);
    setCurrentBout(null);
    syncUrl('/');
  };

  const selfPlayer = room?.players.find((p) => p.id === selfPlayerId) || null;

  return (
    <div className="min-h-screen bg-comic-dark text-white flex flex-col justify-between select-none">
      {/* Dynamic View by Game Phase */}
      {/* Show InviteLandingView when invite URL is active and not yet in a room */}
      {inviteRoomCode && (!room || !selfPlayer) ? (
        <InviteLandingView
          roomCode={inviteRoomCode}
          onJoin={handleInviteJoin}
          onBackToHome={handleInviteBackToHome}
          errorType={inviteErrorType}
          isJoining={isJoiningInvite}
        />
      ) : !room || !selfPlayer ? (
        <Hero
          onCreateRoom={() => {
            gameAnalytics.playClicked('hero_create');
            openCreateModal();
          }}
          onJoinRoom={() => {
            gameAnalytics.playClicked('hero_join');
            openJoinModal();
          }}
          onOpenHowToPlay={openHowToPlayModal}
          onOpenRoster={openRosterModal}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onInstallApp={startBuildAndInstall}
          isInstalled={isInstalled}
        />
      ) : room.phase === 'LOBBY' ? (
        <LobbyView
          room={room}
          selfPlayer={selfPlayer}
          onToggleReady={handleToggleReady}
          onStartGame={handleStartGame}
          onLeaveRoom={handleLeaveRoom}
          onOpenRoster={openRosterModal}
          onInstallApp={startBuildAndInstall}
          isInstalled={isInstalled}
        />
      ) : room.phase === 'AUCTION' && room.auction ? (
        <AuctionStage
          room={room}
          auction={room.auction}
          selfPlayer={selfPlayer}
          onPlaceBid={handlePlaceBid}
          onPassAuction={handlePassAuction}
          onOpenRoster={openRosterModal}
        />
      ) : room.phase === 'AUCTION_TRANSITION' ? (
        <AuctionToBattleTransition />
      ) : room.phase === 'BATTLE' && room.battleRound ? (
        currentBout ? (
          <CinematicCardClashArena
            bout={currentBout}
            room={room}
            selfPlayerId={selfPlayer.id}
            onNextBout={handleNextBout}
          />
        ) : (
          <FighterSelectionView
            room={room}
            battleRound={room.battleRound}
            selfPlayer={selfPlayer}
            onLockFighter={handleLockFighter}
          />
        )
      ) : room.phase === 'RESULTS' && room.tournament ? (
        <ResultsView
          room={room}
          tournament={room.tournament}
          selfPlayerId={selfPlayer.id}
          onPlayAgain={handlePlayAgain}
          onReturnToHome={handleLeaveRoom}
        />
      ) : (
        <div className="p-12 text-center">
          <p className="comic-font text-2xl text-comic-yellow animate-pulse">
            SYNCHRONIZING MULTIVERSE STATE...
          </p>
        </div>
      )}

      {/* Floating Modals */}
      <CreateRoomModal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateRoom}
      />

      <JoinRoomModal
        isOpen={isJoinOpen}
        onClose={closeJoinModal}
        onJoin={handleJoinRoom}
        initialRoomCode={initialRoomCode}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={closeHowToPlayModal}
      />

      <CharacterRosterModal
        isOpen={isRosterOpen}
        onClose={closeRosterModal}
      />

      {/* 2.5s Nano-Forge Building & PWA Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={closeInstallModal}
        isBuilding={isBuilding}
        buildProgress={buildProgress}
        statusText={statusText}
        installStatus={installStatus}
        isIos={isIos}
      />

      {/* Unobtrusive PWA Update Banner */}
      <UpdatePrompt currentPhase={room?.phase} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
