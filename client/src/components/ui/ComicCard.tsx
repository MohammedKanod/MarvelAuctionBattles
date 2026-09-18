import React, { useState } from 'react';
import { Character } from '../../../../shared/types';

interface ComicCardProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  isSelected?: boolean;
  isDefeated?: boolean;
  isUsed?: boolean;
  isWinning?: boolean;
  isLosing?: boolean;
  showStats?: boolean;
  isClashing?: boolean;
  clashSide?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  character,
  size = 'md',
  isSelected = false,
  isDefeated = false,
  isUsed = false,
  isWinning = false,
  isClashing = false,
  clashSide,
  onClick,
  className = ''
}) => {
  const primarySrc = `/characters/${character.id}.jpg`;
  const fallbackSrc = character.imageUrl || character.artwork || '';
  
  const [currentSrc, setCurrentSrc] = useState<string>(primarySrc);
  const [imageFailed, setImageFailed] = useState(false);

  // Sync image source whenever character changes
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

  const rarityColors: Record<string, { bg: string; text: string; border: string }> = {
    Common: { bg: 'bg-zinc-700', text: 'text-zinc-200', border: 'border-zinc-500' },
    Rare: { bg: 'bg-blue-800', text: 'text-blue-100', border: 'border-blue-400' },
    Epic: { bg: 'bg-purple-900', text: 'text-purple-100', border: 'border-purple-400' },
    Legendary: { bg: 'bg-amber-600', text: 'text-amber-100', border: 'border-amber-300' },
    Cosmic: { bg: 'bg-red-700', text: 'text-red-100', border: 'border-yellow-400' }
  };

  const rarity = rarityColors[character.rarity] || rarityColors.Common;

  const sizeClasses = {
    sm: 'w-36 h-52 text-xs',
    md: 'w-48 sm:w-56 h-72 sm:h-80 text-sm',
    lg: 'w-56 sm:w-64 h-84 sm:h-96 text-base',
    hero: 'w-64 sm:w-72 h-96 sm:h-[420px] text-lg'
  };

  const isInactive = isDefeated || isUsed;

  return (
    <div
      onClick={!isInactive ? onClick : undefined}
      className={`relative select-none transition-all duration-200 comic-border bg-comic-panel flex flex-col justify-between overflow-hidden ${
        sizeClasses[size]
      } ${
        isSelected
          ? '-translate-y-3 ring-4 ring-comic-yellow shadow-comic-yellow scale-[1.03]'
          : onClick && !isInactive
          ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-comic-lg active:translate-y-0'
          : ''
      } ${
        isWinning
          ? 'ring-4 ring-comic-yellow shadow-comic-yellow scale-105 z-20'
          : ''
      } ${
        isDefeated
          ? 'opacity-40 grayscale pointer-events-none filter'
          : isUsed
          ? 'opacity-50 grayscale-[85%] pointer-events-none filter'
          : ''
      } ${className}`}
      style={{
        borderTopColor: character.visuals.accentColor,
        borderTopWidth: '5px'
      }}
    >
      {/* Top Banner: Minimalist Category, Power & Rarity */}
      <div className="flex justify-between items-center px-2.5 py-1.5 bg-black/90 border-b-2 border-black z-10">
        <span className="text-[10px] font-black uppercase tracking-wider text-comic-yellow truncate max-w-[110px]">
          {character.visuals.badgeText}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="bg-comic-yellow text-black font-black text-[10px] px-1.5 py-0.2 border border-black font-mono shadow-sm">
            ⚡{character.stats.power}
          </span>
          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 border ${rarity.border} ${rarity.bg} ${rarity.text}`}>
            {character.rarity}
          </span>
        </div>
      </div>

      {/* Dominant Character Artwork Box (Full-Bleed Superhero Art - No Oval Crop) */}
      <div
        className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-zinc-950"
        style={{
          backgroundColor: character.visuals.primaryColor,
        }}
      >
        {/* Halftone Overlay */}
        <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none z-10" />

        {/* Selected Stamp */}
        {isSelected && (
          <div className="absolute top-2 right-2 z-20 bg-comic-yellow text-black comic-font text-xs px-2 py-0.5 border-2 border-black rotate-6 shadow-comic-sm">
            SELECTED
          </div>
        )}

        {/* DEFEATED Stamp Overlay */}
        {isDefeated && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 rotate-[-12deg]">
            <div className="comic-ribbon bg-comic-red border-3 border-black px-4 py-1 shadow-comic-lg">
              <span className="comic-ribbon-content comic-font text-2xl text-white tracking-widest">
                DEFEATED
              </span>
            </div>
          </div>
        )}

        {/* DEPLOYED / USED IN BATTLE Stamp Overlay */}
        {isUsed && !isDefeated && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 rotate-[-12deg]">
            <div className="comic-ribbon bg-zinc-900 border-3 border-comic-yellow px-4 py-1 shadow-comic-lg">
              <span className="comic-ribbon-content comic-font text-xl text-comic-yellow tracking-widest">
                DEPLOYED
              </span>
            </div>
          </div>
        )}

        {/* Character Visual / Full Portrait Artwork (NO OVAL!) */}
        {currentSrc && !imageFailed ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={currentSrc}
              alt={character.name}
              onError={handleImageError}
              className="w-full h-full object-cover object-[center_15%] filter contrast-[1.03]"
              loading="lazy"
            />
            {/* Gradient shadow at bottom of art to blend into role pill and nameplate */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          </div>
        ) : (
          /* Role Emoji Graphic Fallback */
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl sm:text-6xl filter drop-shadow-md">
              {character.role === 'Tank' && '🛡️'}
              {character.role === 'Striker' && '⚔️'}
              {character.role === 'Blaster' && '💥'}
              {character.role === 'Tactician' && '🧠'}
              {character.role === 'Speedster' && '⚡'}
              {character.role === 'Sorcerer' && '🔮'}
            </span>
          </div>
        )}

        {/* Role & Universe Pill - Bottom Left Corner */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-black bg-white/95 px-2 py-0.5 border border-black shadow-comic-sm">
            {character.role}
          </span>
          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 border border-black shadow-comic-sm ${
            character.universe.includes('DC')
              ? 'bg-blue-600 text-white'
              : 'bg-red-600 text-white'
          }`}>
            {character.universe.includes('DC') ? 'DC' : 'MARVEL'}
          </span>
        </div>
      </div>

      {/* Bottom Nameplate (Clean Collectible Card format) */}
      <div className="px-2.5 py-2 bg-black border-t-3 border-black text-center z-10 flex flex-col justify-center">
        <h3 className="comic-font text-base sm:text-xl md:text-2xl text-white leading-tight tracking-wide truncate uppercase">
          {character.name}
        </h3>
        <p className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wide truncate mt-0.5">
          {character.alterEgo || character.universe}
        </p>
      </div>
    </div>
  );
};
