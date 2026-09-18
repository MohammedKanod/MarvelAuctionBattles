import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Character, Rarity } from '../../../../shared/types';
import { ALL_CHARACTERS } from '../../data/characters';
import { RosterCard } from './RosterCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import {
  Search,
  X,
  Shield,
  Swords,
  Zap,
  Brain,
  Sparkles,
  Flame,
  ArrowUp,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

interface CharacterRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterRosterModal: React.FC<CharacterRosterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [characters, setCharacters] = useState<Character[]>(ALL_CHARACTERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState<'ALL' | 'MARVEL' | 'DC'>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'power' | 'name' | 'rarity'>('power');
  const [inspectCharacter, setInspectCharacter] = useState<Character | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch updated list from server if running, fallback gracefully
  useEffect(() => {
    fetch('/api/characters')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.characters) && data.characters.length > 0) {
          setCharacters(data.characters);
        }
      })
      .catch(() => {
        // Fallback to local ALL_CHARACTERS bundle
      });
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (inspectCharacter) {
          setInspectCharacter(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inspectCharacter, onClose]);

  // Handle scroll to show back-to-top button
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowBackToTop(scrollContainerRef.current.scrollTop > 350);
    }
  };

  const scrollToTop = () => {
    SoundManager.playClick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter and sort
  const filteredCharacters = useMemo(() => {
    return characters
      .filter((char) => {
        const matchesSearch =
          !searchTerm ||
          char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (char.alterEgo && char.alterEgo.toLowerCase().includes(searchTerm.toLowerCase())) ||
          char.specialAbilities.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole = selectedRole === 'ALL' || char.role === selectedRole;
        const matchesRarity = selectedRarity === 'ALL' || char.rarity === selectedRarity;
        const isDc = char.universe.includes('DC');
        const matchesUniverse =
          selectedUniverse === 'ALL' ||
          (selectedUniverse === 'DC' && isDc) ||
          (selectedUniverse === 'MARVEL' && !isDc);

        return matchesSearch && matchesRole && matchesRarity && matchesUniverse;
      })
      .sort((a, b) => {
        if (sortBy === 'power') {
          return b.stats.power - a.stats.power;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'rarity') {
          const rarityRank: Record<Rarity, number> = {
            Cosmic: 5,
            Legendary: 4,
            Epic: 3,
            Rare: 2,
            Common: 1
          };
          return (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0);
        }
        return 0;
      });
  }, [characters, searchTerm, selectedUniverse, selectedRole, selectedRarity, sortBy]);

  if (!isOpen) return null;

  const roles = [
    { id: 'ALL', label: 'ALL', icon: '🌟' },
    { id: 'Striker', label: 'STRIKER', icon: '⚔️' },
    { id: 'Tank', label: 'TANK', icon: '🛡️' },
    { id: 'Blaster', label: 'BLASTER', icon: '💥' },
    { id: 'Tactician', label: 'TACTICIAN', icon: '🧠' },
    { id: 'Speedster', label: 'SPEEDSTER', icon: '⚡' },
    { id: 'Sorcerer', label: 'SORCERER', icon: '🔮' }
  ];

  const marvelCount = characters.filter((c) => !c.universe.includes('DC')).length;
  const dcCount = characters.filter((c) => c.universe.includes('DC')).length;

  const hasActiveFilters =
    searchTerm !== '' || selectedUniverse !== 'ALL' || selectedRole !== 'ALL' || selectedRarity !== 'ALL';

  const resetFilters = () => {
    SoundManager.playClick();
    setSearchTerm('');
    setSelectedUniverse('ALL');
    setSelectedRole('ALL');
    setSelectedRarity('ALL');
    setSortBy('power');
  };

  return (
    <>
      {/* 1. Main Hero Roster Modal: Fullscreen on mobile, centered card on desktop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-black/90 backdrop-blur-md animate-pop-in">
        <div className="relative w-full h-[100dvh] sm:h-[94vh] sm:max-w-6xl sm:max-h-[920px] bg-[#0c0d14] sm:comic-border-xl sm:rounded-2xl flex flex-col overflow-hidden text-white shadow-2xl">
          
          {/* Subtle Halftone BG effect */}
          <div className="absolute inset-0 bg-halftone opacity-15 pointer-events-none" />

          {/* Top Mobile-First HUD Header */}
          <header className="relative z-20 px-3.5 py-2.5 sm:px-6 sm:py-3.5 bg-black/95 border-b-2 sm:border-b-3 border-zinc-800 sm:border-black flex items-center justify-between gap-2 shrink-0">
            {/* Left: Branding & Count */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <img
                src="/logo.png"
                alt="Battle Auction"
                className="w-8 h-8 sm:w-10 sm:h-10 object-cover border-2 border-amber-400 rotate-[-4deg] shadow-[0_0_10px_rgba(251,191,36,0.3)] shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="comic-font text-xl sm:text-3xl text-white tracking-wide uppercase truncate">
                    HERO ROSTER & VAULT
                  </h2>
                  <span className="bg-amber-400 text-black text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded sm:rounded-none border border-black shrink-0 font-mono">
                    {filteredCharacters.length}/{characters.length}
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-zinc-400 font-semibold truncate">
                  Explore all authentic Marvel & DC multiverse champions, combat archetypes, and tactical dossiers.
                </p>
              </div>
            </div>

            {/* Right: Actions (Reset if filtered & Close button) */}
            <div className="flex items-center gap-2 shrink-0">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-400 text-[10px] sm:text-xs font-black uppercase rounded border border-zinc-700 flex items-center gap-1 transition-all"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden xs:inline">RESET</span>
                </button>
              )}

              <button
                onClick={() => {
                  SoundManager.playClick();
                  onClose();
                }}
                className="comic-btn bg-zinc-800 hover:bg-red-600 text-white p-2 rounded-lg sm:rounded-none flex items-center justify-center transition-colors"
                title="Close Roster (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Control Deck: Compact, Mobile-First Search, Sort, & Filter Carousel */}
          <div className="relative z-20 bg-[#12131b] border-b-2 border-black p-2.5 sm:p-4 flex flex-col gap-2 shrink-0 shadow-md">
            
            {/* Row 1: Universe Segmented Switcher & Sort Selector */}
            <div className="flex items-center justify-between gap-2">
              {/* Universe Segmented Control */}
              <div className="flex items-center bg-black/90 p-1 rounded-lg border border-zinc-800 overflow-x-auto no-scrollbar shrink-0">
                <button
                  onClick={() => {
                    SoundManager.playClick();
                    setSelectedUniverse('ALL');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-black uppercase rounded transition-all whitespace-nowrap ${
                    selectedUniverse === 'ALL'
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ALL ({characters.length})
                </button>

                <button
                  onClick={() => {
                    SoundManager.playClick();
                    setSelectedUniverse('MARVEL');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-black uppercase rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                    selectedUniverse === 'MARVEL'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  MARVEL ({marvelCount})
                </button>

                <button
                  onClick={() => {
                    SoundManager.playClick();
                    setSelectedUniverse('DC');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-black uppercase rounded transition-all flex items-center gap-1 whitespace-nowrap ${
                    selectedUniverse === 'DC'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  DC ({dcCount})
                </button>
              </div>

              {/* Sort Selector Dropdown */}
              <div className="flex items-center gap-1 shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    SoundManager.playClick();
                    setSortBy(e.target.value as any);
                  }}
                  className="bg-black/90 border border-zinc-700 text-amber-300 text-[11px] font-bold px-2 py-1.5 rounded focus:outline-none focus:border-amber-400"
                >
                  <option value="power">⚡ POWER</option>
                  <option value="rarity">💎 RARITY</option>
                  <option value="name">🔤 A-Z</option>
                </select>
              </div>
            </div>

            {/* Row 2: Responsive Search Input Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search heroes, alter-egos, signature powers..."
                className="w-full pl-9 pr-8 py-1.5 sm:py-2 bg-black/80 border border-zinc-700 text-white placeholder-zinc-500 font-semibold text-xs sm:text-sm rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Row 3: Horizontal Scrollable Role Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {roles.map((r) => {
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      SoundManager.playClick();
                      setSelectedRole(r.id);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-black uppercase rounded-lg whitespace-nowrap transition-all flex items-center gap-1 shrink-0 border ${
                      active
                        ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)] font-black'
                        : 'bg-black/60 text-zinc-300 border-zinc-800 hover:bg-zinc-800/80 hover:text-white'
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Characters Grid Container: Highly Responsive Mobile Layout */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative z-10 flex-1 overflow-y-auto p-2.5 sm:p-5 bg-gradient-to-b from-black/60 to-[#07080c]"
          >
            {filteredCharacters.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 sm:p-12">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-2xl mb-3">
                  🔍
                </div>
                <p className="comic-font text-2xl sm:text-3xl text-amber-400 mb-1">
                  NO MULTIVERSE HEROES FOUND
                </p>
                <p className="text-xs text-zinc-400 max-w-sm mb-4">
                  No combatants match your search "{searchTerm}" under role "{selectedRole}". Try adjusting your filters.
                </p>
                <ComicButton
                  variant="yellow"
                  size="sm"
                  onClick={resetFilters}
                >
                  RESET FILTERS
                </ComicButton>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
                {filteredCharacters.map((char) => (
                  <RosterCard
                    key={char.id}
                    character={char}
                    onClick={() => {
                      SoundManager.playClick();
                      setInspectCharacter(char);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Floating Back-to-Top Button for Long Roster Browsing */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="absolute bottom-12 right-4 sm:bottom-14 sm:right-6 z-30 p-2.5 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-full border-2 border-black shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pop-in flex items-center gap-1 active:scale-90 transition-transform"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
              <span className="text-[10px] font-black pr-1 hidden xs:inline">TOP</span>
            </button>
          )}

          {/* Bottom Status Bar */}
          <footer className="relative z-20 px-4 py-2 bg-black border-t border-zinc-800 flex justify-between items-center text-[11px] font-semibold text-zinc-400 shrink-0">
            <span>
              Showing <strong className="text-amber-400">{filteredCharacters.length}</strong> of{' '}
              <strong>{characters.length}</strong> Characters
            </span>
            <span className="text-zinc-500 hidden sm:inline">
              Tap any hero card to inspect full combat attributes and tactical intel
            </span>
          </footer>
        </div>
      </div>

      {/* 2. Tactical Hero Dossier Sheet / Modal (Cinematic Mobile Bottom-Sheet & Desktop Centered Modal) */}
      {inspectCharacter && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/92 backdrop-blur-md animate-pop-in"
          style={{ zIndex: 99999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setInspectCharacter(null);
            }
          }}
        >
          <div
            className="relative w-full sm:max-w-xl max-h-[92dvh] sm:max-h-[88vh] bg-[#10121a] border-t-4 sm:border-4 border-black sm:comic-border-xl rounded-t-3xl sm:rounded-2xl text-white flex flex-col overflow-hidden shadow-2xl"
            style={{ zIndex: 100000 }}
          >
            {/* Top Sheet Drag Pill for Mobile */}
            <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

            {/* Dossier Header */}
            <div className="relative px-4 py-3 sm:px-6 sm:py-4 bg-black/90 border-b-2 border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/50">
                  TACTICAL DOSSIER
                </span>
                <span className="text-xs font-bold text-zinc-400">
                  CLASSIFIED S.H.I.E.L.D. INTEL
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setInspectCharacter(null);
                }}
                className="p-1.5 bg-zinc-800 hover:bg-red-600 text-white rounded-full transition-colors"
                title="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Dossier Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Hero Showcase Banner */}
              <div className="flex items-start gap-3.5 sm:gap-4 bg-[#141622] border-2 border-zinc-800 rounded-xl p-3 sm:p-4">
                {/* Hero Portrait Frame */}
                <div
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg border-2 border-amber-400/80 overflow-hidden bg-black flex-shrink-0 shadow-lg relative"
                  style={{ backgroundColor: inspectCharacter.visuals?.primaryColor || '#000' }}
                >
                  <img
                    src={`/characters/${inspectCharacter.id}.jpg`}
                    alt={inspectCharacter.name}
                    onError={(e) => {
                      if (inspectCharacter.imageUrl && (e.target as HTMLImageElement).src !== inspectCharacter.imageUrl) {
                        (e.target as HTMLImageElement).src = inspectCharacter.imageUrl;
                      }
                    }}
                    className="w-full h-full object-cover object-[center_15%] filter contrast-[1.05]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  <div className="absolute bottom-1 right-1 bg-amber-400 text-black font-black text-[9px] px-1 rounded-xs leading-none font-mono">
                    {inspectCharacter.stats.power} PWR
                  </div>
                </div>

                {/* Hero Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded text-white ${
                        inspectCharacter.universe.includes('DC') ? 'bg-blue-600' : 'bg-red-600'
                      }`}
                    >
                      {inspectCharacter.universe.includes('DC') ? 'DC COMICS' : 'MARVEL'}
                    </span>
                    <span className="text-[9px] font-black uppercase bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                      {inspectCharacter.role}
                    </span>
                    <span className="text-[9px] font-black uppercase bg-amber-400 text-black px-1.5 py-0.5 rounded">
                      {inspectCharacter.rarity}
                    </span>
                  </div>

                  <h3 className="comic-font text-2xl sm:text-3xl text-white uppercase leading-none truncate">
                    {inspectCharacter.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-300 truncate mt-0.5">
                    {inspectCharacter.alterEgo || inspectCharacter.universe}
                  </p>

                  {/* Power Index Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase mb-1">
                      <span className="text-zinc-400">COMBAT POWER INDEX</span>
                      <span className="text-amber-400 font-mono text-xs">{inspectCharacter.stats.power} / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-black rounded-full overflow-hidden border border-zinc-700">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(10, inspectCharacter.stats.power))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Banner */}
              {inspectCharacter.visuals?.comicQuote && (
                <div className="bg-black/60 border-l-4 border-amber-400 p-2.5 rounded-r-lg italic text-xs text-zinc-300">
                  "{inspectCharacter.visuals.comicQuote}"
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                {inspectCharacter.description}
              </p>

              {/* Combat Stats Breakdown */}
              <div className="bg-[#141622] border border-zinc-800 rounded-xl p-3">
                <h4 className="text-[11px] font-black uppercase text-amber-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> COMBAT ATTRIBUTES
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-0.5">
                      <span>STRENGTH</span>
                      <span className="font-mono text-zinc-200">{inspectCharacter.stats.strength}</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${inspectCharacter.stats.strength}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-0.5">
                      <span>DURABILITY</span>
                      <span className="font-mono text-zinc-200">{inspectCharacter.stats.durability}</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${inspectCharacter.stats.durability}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-0.5">
                      <span>SPEED</span>
                      <span className="font-mono text-zinc-200">{inspectCharacter.stats.speed}</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${inspectCharacter.stats.speed}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-0.5">
                      <span>COMBAT IQ</span>
                      <span className="font-mono text-zinc-200">{inspectCharacter.stats.combat}</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${inspectCharacter.stats.combat}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature Abilities */}
              <div>
                <h4 className="text-[11px] font-black uppercase text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SIGNATURE ABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {inspectCharacter.specialAbilities.map((ab, i) => (
                    <div
                      key={i}
                      className="bg-black/60 border border-zinc-800/90 rounded-lg px-2.5 py-1.5 text-xs font-bold text-zinc-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                      <span>{ab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tactical Matchups: Strengths vs Vulnerabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-green-950/30 border border-green-700/50 rounded-lg p-2.5">
                  <span className="text-[10px] font-black uppercase text-green-400 flex items-center gap-1 mb-1">
                    <span>✓</span> STRENGTHS AGAINST
                  </span>
                  <ul className="text-xs text-zinc-300 space-y-0.5 font-medium">
                    {inspectCharacter.matchupStrengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-green-500">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-2.5">
                  <span className="text-[10px] font-black uppercase text-red-400 flex items-center gap-1 mb-1">
                    <span>✕</span> VULNERABILITIES
                  </span>
                  <ul className="text-xs text-zinc-300 space-y-0.5 font-medium">
                    {inspectCharacter.matchupWeaknesses.map((w, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-red-500">•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tactical Notes / Battle Advice */}
              {inspectCharacter.tacticalNotes && (
                <div className="bg-zinc-900/80 border border-zinc-700/80 rounded-xl p-3">
                  <h4 className="text-[10px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-amber-400" /> TACTICAL COMBAT INTEL
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    {inspectCharacter.tacticalNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Action: Big Touch-Friendly Button */}
            <div className="p-3 bg-black/95 border-t border-zinc-800 shrink-0">
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setInspectCharacter(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all"
              >
                BACK TO ROSTER
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
