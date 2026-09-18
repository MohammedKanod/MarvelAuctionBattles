import React, { useState, useMemo, useEffect } from 'react';
import { Character, Rarity } from '../../../../shared/types';
import { ALL_CHARACTERS } from '../../data/characters';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import { Search, X, Shield, Swords, Zap, Brain, Sparkles, Flame, Eye, ChevronRight, Award } from 'lucide-react';

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
    { id: 'ALL', label: 'ALL ROLES', icon: '🌟' },
    { id: 'Striker', label: 'STRIKER', icon: '⚔️' },
    { id: 'Tank', label: 'TANK', icon: '🛡️' },
    { id: 'Blaster', label: 'BLASTER', icon: '💥' },
    { id: 'Tactician', label: 'TACTICIAN', icon: '🧠' },
    { id: 'Speedster', label: 'SPEEDSTER', icon: '⚡' },
    { id: 'Sorcerer', label: 'SORCERER', icon: '🔮' }
  ];

  const rarities = ['ALL', 'Cosmic', 'Legendary', 'Epic', 'Rare', 'Common'];

  return (
    <>
      {/* 1. Main Hero Roster Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-pop-in">
        <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-comic-dark comic-border-lg flex flex-col overflow-hidden text-white shadow-comic-xl">
          {/* Halftone BG effect */}
          <div className="absolute inset-0 bg-halftone opacity-15 pointer-events-none" />

          {/* Modal Header */}
          <div className="relative z-10 p-4 sm:p-5 bg-black border-b-3 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Battle Auction"
                className="w-10 h-10 object-cover border-2 border-black rotate-[-4deg] shadow-comic-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="comic-font text-3xl sm:text-4xl text-white tracking-wider uppercase">
                    HERO ROSTER & VAULT
                  </h2>
                  <span className="bg-comic-yellow text-black text-xs font-black px-2 py-0.5 border border-black shadow-comic-sm">
                    {characters.length} HEROES
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-semibold">
                  Browse all authentic Marvel and DC multiverse combatants, battle archetypes, and tactical dossiers.
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                SoundManager.playClick();
                onClose();
              }}
              className="comic-btn bg-zinc-800 hover:bg-comic-red text-white p-2 absolute top-4 right-4 sm:static flex items-center gap-1"
              title="Close Roster"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search & Controls Toolbar */}
          <div className="relative z-10 bg-comic-panel border-b-2 border-black p-3 sm:p-4 flex flex-col gap-3">
            {/* Universe Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[10px] font-black uppercase text-zinc-400 shrink-0">UNIVERSE:</span>
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setSelectedUniverse('ALL');
                }}
                className={`comic-border px-3 py-1 text-xs font-black uppercase whitespace-nowrap transition-all ${
                  selectedUniverse === 'ALL'
                    ? 'bg-comic-yellow text-black -translate-y-0.5 shadow-comic-sm'
                    : 'bg-black text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                🌌 ALL UNIVERSES ({characters.length})
              </button>
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setSelectedUniverse('MARVEL');
                }}
                className={`comic-border px-3 py-1 text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedUniverse === 'MARVEL'
                    ? 'bg-comic-red text-white -translate-y-0.5 shadow-comic-sm'
                    : 'bg-black text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="w-2 h-2 bg-comic-red rounded-full" />
                MARVEL ({characters.filter(c => !c.universe.includes('DC')).length})
              </button>
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setSelectedUniverse('DC');
                }}
                className={`comic-border px-3 py-1 text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedUniverse === 'DC'
                    ? 'bg-blue-600 text-white -translate-y-0.5 shadow-comic-sm'
                    : 'bg-black text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                DC COMICS ({characters.filter(c => c.universe.includes('DC')).length})
              </button>
            </div>
            {/* Top row: Search input & sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search heroes by name, alter ego, or powers..."
                  className="w-full pl-10 pr-4 py-2 bg-black border-2 border-zinc-700 text-white placeholder-zinc-500 font-semibold text-sm rounded-none focus:outline-none focus:border-comic-yellow"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-bold"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <span className="text-[10px] font-black uppercase text-zinc-400">SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-black border-2 border-zinc-700 text-comic-yellow text-xs font-bold px-2 py-2 rounded-none focus:outline-none focus:border-comic-yellow"
                >
                  <option value="power">POWER SCORE</option>
                  <option value="name">NAME (A-Z)</option>
                  <option value="rarity">RARITY TIER</option>
                </select>
              </div>
            </div>

            {/* Role Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {roles.map((r) => {
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      SoundManager.playClick();
                      setSelectedRole(r.id);
                    }}
                    className={`comic-border px-2.5 py-1 text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-1 ${
                      active
                        ? 'bg-comic-yellow text-black -translate-y-0.5 shadow-comic-sm'
                        : 'bg-black text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Characters Grid Container */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-black/40">
            {filteredCharacters.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <p className="comic-font text-3xl text-comic-yellow mb-2">NO HEROES FOUND</p>
                <p className="text-xs text-zinc-400 max-w-sm mb-4">
                  No characters match "{searchTerm}" with role "{selectedRole}". Try resetting your filters.
                </p>
                <ComicButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRole('ALL');
                    setSelectedRarity('ALL');
                  }}
                >
                  RESET FILTERS
                </ComicButton>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
                {filteredCharacters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => {
                      SoundManager.playClick();
                      setInspectCharacter(char);
                    }}
                    className="cursor-pointer group flex flex-col items-center"
                  >
                    <ComicCard
                      character={char}
                      size="sm"
                      className="group-hover:scale-105 group-hover:ring-2 group-hover:ring-comic-yellow transition-transform"
                    />
                    <span className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-comic-yellow mt-1 flex items-center gap-0.5">
                      VIEW DOSSIER <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Status Bar */}
          <div className="relative z-10 px-4 py-2 bg-black border-t-2 border-black flex justify-between items-center text-xs font-semibold text-zinc-400">
            <span>
              Showing <strong className="text-comic-yellow">{filteredCharacters.length}</strong> of{' '}
              <strong>{characters.length}</strong> Characters
            </span>
            <span className="hidden sm:inline text-zinc-500">
              Tap any hero card to inspect abilities and tactical matchup notes
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Dossier Detail Modal - Rendered on the Highest Layer (z-[99999]) */}
      {inspectCharacter && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-pop-in"
          style={{ zIndex: 99999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setInspectCharacter(null);
            }
          }}
        >
          <div 
            className="relative w-full max-w-lg bg-comic-panel comic-border-lg p-5 sm:p-6 text-white max-h-[90vh] overflow-y-auto shadow-comic-xl"
            style={{ zIndex: 100000 }}
          >
            {/* Close button */}
            <button
              onClick={() => setInspectCharacter(null)}
              className="comic-btn bg-zinc-800 hover:bg-comic-red text-white p-1.5 absolute top-4 right-4"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Header */}
            <div className="flex items-center gap-4 mb-4">
              {/* Rectangular Comic Portrait Showcase Frame (NO OVAL) */}
              <div
                className="w-24 h-32 sm:w-28 sm:h-36 border-4 border-black overflow-hidden bg-black flex-shrink-0 shadow-comic-lg relative"
                style={{ backgroundColor: inspectCharacter.visuals.primaryColor }}
              >
                <img
                  src={`/characters/${inspectCharacter.id}.jpg`}
                  alt={inspectCharacter.name}
                  onError={(e) => {
                    if (inspectCharacter.imageUrl && (e.target as HTMLImageElement).src !== inspectCharacter.imageUrl) {
                      (e.target as HTMLImageElement).src = inspectCharacter.imageUrl;
                    }
                  }}
                  className="w-full h-full object-cover object-[center_15%] filter contrast-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-1 right-1 bg-comic-yellow text-black font-black text-[9px] px-1 border border-black leading-none shadow-comic-sm">
                  {inspectCharacter.stats.power} PWR
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-comic-yellow bg-black px-2 py-0.5 border border-black mb-1 inline-block">
                  {inspectCharacter.visuals.badgeText}
                </span>
                <h3 className="comic-font text-3xl text-white uppercase leading-none">
                  {inspectCharacter.name}
                </h3>
                <p className="text-xs font-bold text-zinc-400">
                  {inspectCharacter.alterEgo || inspectCharacter.universe} • {inspectCharacter.role}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black text-black bg-white px-2 py-0.2 border border-black">
                    {inspectCharacter.rarity}
                  </span>
                  <span className="text-xs font-black text-comic-yellow">
                    POWER INDEX: {inspectCharacter.stats.power}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="bg-black/80 border-l-4 border-comic-yellow p-2.5 mb-4 italic text-xs text-zinc-300">
              "{inspectCharacter.visuals.comicQuote}"
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 mb-4 leading-relaxed font-semibold">
              {inspectCharacter.description}
            </p>

            {/* Special Abilities */}
            <div className="mb-4">
              <h4 className="text-xs font-black uppercase text-comic-yellow tracking-wider mb-2 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> SIGNATURE ABILITIES
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {inspectCharacter.specialAbilities.map((ab, i) => (
                  <div
                    key={i}
                    className="bg-black/60 border border-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-200"
                  >
                    • {ab}
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Intel */}
            <div className="mb-4 bg-zinc-900 comic-border p-3">
              <h4 className="text-xs font-black uppercase text-comic-yellow tracking-wider mb-1 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" /> TACTICAL COMBAT INTEL
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                {inspectCharacter.tacticalNotes}
              </p>
            </div>

            {/* Matchups */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-950/40 border border-green-700/60 p-2.5">
                <span className="text-[10px] font-black uppercase text-green-400 block mb-1">
                  STRENGTHS AGAINST
                </span>
                <ul className="text-xs text-zinc-300 space-y-0.5 font-semibold">
                  {inspectCharacter.matchupStrengths.map((s, i) => (
                    <li key={i}>✓ {s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-950/40 border border-red-700/60 p-2.5">
                <span className="text-[10px] font-black uppercase text-red-400 block mb-1">
                  VULNERABILITIES
                </span>
                <ul className="text-xs text-zinc-300 space-y-0.5 font-semibold">
                  {inspectCharacter.matchupWeaknesses.map((w, i) => (
                    <li key={i}>✗ {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action close button */}
            <ComicButton
              variant="primary"
              size="md"
              onClick={() => setInspectCharacter(null)}
              className="w-full"
            >
              BACK TO ROSTER
            </ComicButton>
          </div>
        </div>
      )}
    </>
  );
};
