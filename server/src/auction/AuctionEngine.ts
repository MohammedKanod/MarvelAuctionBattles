import { AuctionState, Character, Player, BidRecord } from '../../../shared/types';
import { AUCTION_ANTI_SNIPE_THRESHOLD_SEC, AUCTION_ANTI_SNIPE_EXTENSION_SEC } from '../../../shared/constants';

export interface AuctionCallbacks {
  onTick: (timerSeconds: number, endsAt: number) => void;
  onBidPlaced: (bid: BidRecord, auction: AuctionState) => void;
  onOutbid: (outbidPlayerId: string, newBid: number, newLeaderName: string) => void;
  onSold: (winnerId: string, winnerName: string, character: Character, winningBid: number) => void;
  onNoBids: (character: Character) => void;
}

export class AuctionEngine {
  private state: AuctionState;
  private timerInterval: NodeJS.Timeout | null = null;
  private callbacks: AuctionCallbacks;

  constructor(callbacks: AuctionCallbacks) {
    this.callbacks = callbacks;
    this.state = {
      currentRound: 0,
      totalRounds: 0,
      character: null,
      startingBid: 100,
      currentBid: 0,
      currentLeaderId: null,
      currentLeaderName: null,
      timerSeconds: 10,
      endsAt: 0,
      status: 'WAITING',
      bidHistory: [],
      winnerId: null,
      winnerName: null,
      winningBid: null
    };
  }

  public getState(): AuctionState {
    return { ...this.state };
  }

  public startRound(
    character: Character,
    roundNumber: number,
    totalRounds: number,
    timerSeconds: number
  ) {
    this.stopTimer();

    const startingBid = 100;
    const now = Date.now();
    const endsAt = now + (timerSeconds * 1000);

    this.state = {
      currentRound: roundNumber,
      totalRounds,
      character,
      startingBid,
      currentBid: 0, // No bids yet
      currentLeaderId: null,
      currentLeaderName: null,
      timerSeconds,
      endsAt,
      status: 'ACTIVE',
      bidHistory: [],
      winnerId: null,
      winnerName: null,
      winningBid: null
    };

    this.startTicker();
  }

  public placeBid(
    player: Player,
    bidAmount: number,
    minIncrement: number
  ): { success: boolean; error?: string } {
    if (this.state.status !== 'ACTIVE' && this.state.status !== 'EXTENDED') {
      return { success: false, error: 'Auction is not currently accepting bids.' };
    }

    if (!this.state.character) {
      return { success: false, error: 'No active character in auction.' };
    }

    // Rule: Cannot bid if already leader
    if (this.state.currentLeaderId === player.id) {
      return { success: false, error: 'You already hold the highest bid!' };
    }

    // Rule: Coin check
    if (player.coins < bidAmount) {
      return { success: false, error: `Insufficient coins! You have ${player.coins}🪙, but bid is ${bidAmount}🪙.` };
    }

    // Rule: Valid bid amount check
    const minRequiredBid = this.state.currentBid === 0 
      ? this.state.startingBid 
      : this.state.currentBid + minIncrement;

    if (bidAmount < minRequiredBid) {
      return { success: false, error: `Bid too low! Minimum bid is ${minRequiredBid}🪙.` };
    }

    const previousLeaderId = this.state.currentLeaderId;

    // Apply bid
    this.state.currentBid = bidAmount;
    this.state.currentLeaderId = player.id;
    this.state.currentLeaderName = player.name;

    const bidRecord: BidRecord = {
      playerId: player.id,
      playerName: player.name,
      amount: bidAmount,
      timestamp: Date.now()
    };
    this.state.bidHistory.unshift(bidRecord);

    // Anti-snipe mechanic: If bid is placed in final seconds, extend the timer
    const remainingSeconds = Math.max(0, Math.ceil((this.state.endsAt - Date.now()) / 1000));
    if (remainingSeconds <= AUCTION_ANTI_SNIPE_THRESHOLD_SEC) {
      const newTimerSeconds = Math.max(remainingSeconds + AUCTION_ANTI_SNIPE_EXTENSION_SEC, 5);
      this.state.timerSeconds = newTimerSeconds;
      this.state.endsAt = Date.now() + (newTimerSeconds * 1000);
      this.state.status = 'EXTENDED';
    } else {
      this.state.timerSeconds = remainingSeconds;
    }

    // Notify previous leader they were outbid
    if (previousLeaderId && previousLeaderId !== player.id) {
      this.callbacks.onOutbid(previousLeaderId, bidAmount, player.name);
    }

    // Broadcast valid bid
    this.callbacks.onBidPlaced(bidRecord, this.getState());

    return { success: true };
  }

  private startTicker() {
    this.timerInterval = setInterval(() => {
      const now = Date.now();
      const remainingMs = Math.max(0, this.state.endsAt - now);
      const remainingSec = Math.ceil(remainingMs / 1000);

      this.state.timerSeconds = remainingSec;
      this.callbacks.onTick(remainingSec, this.state.endsAt);

      if (remainingSec <= 0) {
        this.stopTimer();
        this.finalizeRound();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private finalizeRound() {
    if (this.state.currentLeaderId && this.state.character) {
      this.state.status = 'SOLD';
      this.state.winnerId = this.state.currentLeaderId;
      this.state.winnerName = this.state.currentLeaderName;
      this.state.winningBid = this.state.currentBid;

      this.callbacks.onSold(
        this.state.winnerId,
        this.state.winnerName || 'Winner',
        this.state.character,
        this.state.winningBid
      );
    } else if (this.state.character) {
      // Unsold character - neither player gets it
      this.state.status = 'UNSOLD';
      this.state.winnerId = null;
      this.state.winnerName = null;
      this.state.winningBid = 0;
      this.callbacks.onNoBids(this.state.character);
    }
  }

  public destroy() {
    this.stopTimer();
  }
}
