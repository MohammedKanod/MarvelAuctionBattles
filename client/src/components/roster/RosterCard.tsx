import React, { useState } from 'react';
import { Character, Rarity } from '../../../../shared/types';
import { Zap, Shield, Swords, Sparkles } from 'lucide-react';

interface RosterCardProps {
  character: Character;
  onClick: () => void;
}

export const RosterCard: React.FC<RosterCardProps> = ({ character, onClick }) => {
  const primarySrc = `/characters/${character.id}.jpg`;
  const fallbackSrc = character.imageUrl || character.artwork || '';
  
  const [currentSrc, setCurrentSrc] = useState<string>(primarySrc);
  const [imageFailed, setImageFailed] = useState(false);

  React.useEffect(() => {
    setCurrentSrc(`/characters/${character.id}.jpg`);
    setImageFailed(false);
  }, [character.id, character.imageUrl]);

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc && fallbackSrc !== primarySrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImageFailed(true);
    }
  };

  const isDc = character.universe.includes('DC');

  // Theme styling based on character rarity
  const rarityConfig: Record<Rarity, {
    border: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    foilGrad: string;
  }> = {
    Cosmic: {
      border: 'border-red-500',
      glow: 'shadow-[0_0_14px_rgba(239,68,68,0.45)] hover:shadow-[0_0_22px_rgba(239,68,68,0.7)]',
      badgeBg: 'bg-gradient-to-r from-red-600 to-amber-600 text-white',
      badgeText: 'COSMIC',
      foilGrad: 'from-red-600/30 via-transparent to-amber-500/20'
    },
    Legendary: {
      border: 'border-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:shadow-[0_0_20px_rgba(245,158,11,0.65)]',
      badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black',
      badgeText: 'LEGEND',
      foilGrad: 'from-amber-500/25 via-transparent to-yellow-400/20'
    },
    Epic: {
      border: 'border-purple-500',
      glow: 'shadow-[0_0_10px_rgba(168,85,247,0.35)] hover:shadow-[0_0_18px_rgba(168,85,247,0.6)]',
      badgeBg: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      badgeText: 'EPIC',
      foilGrad: 'from-purple-600/25 via-transparent to-pink-500/15'
    },
    Rare: {
      border: 'border-blue-500',
      glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_16px_rgba(59,130,246,0.55)]',
      badgeBg: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white',
      badgeText: 'RARE',
      foilGrad: 'from-blue-600/20 via-transparent to-cyan-500/15'
    },
    Common: {
      border: 'border-zinc-700',
      glow: 'shadow-[0_0_6px_rgba(0,0,0,0.5)] hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]',
      badgeBg: 'bg-zinc-800 text-zinc-300',
      badgeText: 'COMMON',
      foilGrad: 'from-zinc-700/20 via-transparent to-zinc-900/10'
    }
  };

  const currentRarity = rarityConfig[character.rarity] || rarityConfig.Common;

  const roleIcons: Record<string, string> = {
    Striker: '⚔️',
    Tank: '🛡️',
    Blaster: '💥',
    Tactician: '🧠',
    Speedster: '⚡',
    Sorcerer: '🔮'
  };

  return (
    <div
      onClick={onClick}
      className={`group relative w-full flex flex-col rounded-xl overflow-hidden bg-[#111218] border-2 ${currentRarity.border} ${currentRarity.glow} transition-all duration-200 cursor-pointer select-none touch-manipulation active:scale-[0.96] hover:-translate-y-1 hover:brightness-105`}
    >
      {/* Top Foil Gradient Ambient Tint */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentRarity.foilGrad} pointer-events-none z-10`} />

      {/* Floating Badges Over Top of Card */}
      <div className="absolute top-2 inset-x-2 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Universe Badge */}
        <span
          className={`px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase rounded-sm border border-black shadow-md ${
            isDc
              ? 'bg-blue-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {isDc ? 'DC' : 'MARVEL'}
        </span>

        {/* Right: Glowing Power Gem */}
        <div className="flex items-center gap-1 bg-black/90 backdrop-blur-sm border border-amber-400/90 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="font-mono font-black text-amber-300 text-xs sm:text-sm leading-none tracking-tight">
            {character.stats.power}
          </span>
        </div>
      </div>

      {/* Main Character Artwork Box */}
      <div
        className="relative w-full aspect-[1/1.12] sm:aspect-[1/1.15] bg-zinc-950 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: character.visuals?.primaryColor || '#18181b' }}
      >
        {/* Halftone Comic Texture */}
        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none z-10" />

        {currentSrc && !imageFailed ? (
          <img
            src={currentSrc}
            alt={character.name}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-[center_15%] filter contrast-[1.05] group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl filter drop-shadow">
              {roleIcons[character.role] || '⭐'}
            </span>
          </div>
        )}

        {/* Bottom Dark Vignette for Smooth Blend */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

        {/* Role & Rarity Overlay Pills at Bottom of Artwork */}
        <div className="absolute bottom-1.5 inset-x-2 z-20 flex items-center justify-between pointer-events-none">
          <span className="bg-black/85 backdrop-blur-xs text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm border border-zinc-700 flex items-center gap-1">
            <span>{roleIcons[character.role]}</span>
            <span className="hidden xs:inline">{character.role}</span>
          </span>

          <span className={`text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm border border-black shadow-sm ${currentRarity.badgeBg}`}>
            {currentRarity.badgeText}
          </span>
        </div>
      </div>

      {/* Card Nameplate & Dossier Cue */}
      <div className="relative z-20 px-2.5 py-2 bg-[#0c0d12] border-t border-zinc-800/80 flex flex-col justify-center min-h-[46px]">
        <h3 className="comic-font text-xs sm:text-sm text-white uppercase tracking-wide truncate leading-tight group-hover:text-amber-300 transition-colors">
          {character.name}
        </h3>
        <p className="text-[10px] font-bold text-zinc-400 truncate leading-none mt-0.5">
          {character.alterEgo || character.universe}
        </p>
      </div>
    </div>
  );
};
