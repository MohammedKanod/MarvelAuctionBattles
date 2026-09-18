import { Character } from '../../../shared/types';

export const MARVEL_CHARACTERS: Character[] = [
  {
    id: 'thor',
    name: 'Thor',
    alterEgo: 'Thor Odinson',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Legendary',
    stats: { power: 94, strength: 96, speed: 82, durability: 95, combat: 88, range: 90, intelligence: 70 },
    specialAbilities: ['God of Thunder', 'Stormbreaker Cleave', 'Bifrost Summoning', 'Lightning Storm'],
    description: 'The Asgardian God of Thunder wields divine lightning, forged Uru weapons, and thousands of years of warrior combat mastery.',
    visuals: {
      primaryColor: '#2b5c8f',
      accentColor: '#ffd100',
      badgeText: '⚡ GOD OF THUNDER',
      comicQuote: 'BRING ME THANOS!'
    },
    tacticalNotes: 'High durability and massive lightning AoE. Can tank physical attacks and pierce energy shields.',
    matchupStrengths: ['Bruisers', 'Tech Armor', 'Demons'],
    matchupWeaknesses: ['Reality Warpers', 'Mental Manipulation'],
    imageUrl: '/characters/thor.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg'
  },
  {
    id: 'thanos',
    name: 'Thanos',
    alterEgo: 'The Mad Titan',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Cosmic',
    stats: { power: 97, strength: 98, speed: 75, durability: 97, combat: 95, range: 85, intelligence: 96 },
    specialAbilities: ['Titan Resilience', 'Double-Edged Blade', 'Infinity Focus', 'Tactical Genius'],
    description: 'Feared conqueror of galaxies whose physical might effortlessly battered the Hulk and shattered vibranium.',
    visuals: {
      primaryColor: '#4b1d6b',
      accentColor: '#d4af37',
      badgeText: '👑 THE MAD TITAN',
      comicQuote: 'I am inevitable.'
    },
    tacticalNotes: 'Near-invulnerable armor and devastating close-quarters combat skill combined with galaxy-class strategic intellect.',
    matchupStrengths: ['Pure Brawlers', 'Speedsters', 'Tech Users'],
    matchupWeaknesses: ['Cosmic Mystic Beings', 'High Reality Warping'],
    imageUrl: '/characters/thanos.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg'
  },
  {
    id: 'wanda',
    name: 'Wanda Maximoff',
    alterEgo: 'Scarlet Witch',
    universe: 'MCU / Earth-616',
    role: 'Sorcerer',
    rarity: 'Cosmic',
    stats: { power: 99, strength: 45, speed: 78, durability: 68, combat: 65, range: 99, intelligence: 88 },
    specialAbilities: ['Chaos Magic', 'Reality Warping', 'Telekinetic Crush', 'Hex Mind Blast'],
    description: 'The Scarlet Witch channels primal Chaos Magic to rewrite matter, manipulate minds, and disintegrate armies with a gesture.',
    visuals: {
      primaryColor: '#9b111e',
      accentColor: '#ff2a2a',
      badgeText: '🔮 SCARLET WITCH',
      comicQuote: 'You have no idea what is possible.'
    },
    tacticalNotes: 'Unrivaled offensive spellcasting and matter disintegration. Glass cannon if physically intercepted before casting.',
    matchupStrengths: ['Physical Tanks', 'Robots', 'Armored Heroes'],
    matchupWeaknesses: ['Sneak Assassins', 'Anti-Magic wards', 'Speed Blitzers'],
    imageUrl: '/characters/wanda.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/579-scarlet-witch.jpg'
  },
  {
    id: 'doctor-strange',
    name: 'Doctor Strange',
    alterEgo: 'Stephen Strange',
    universe: 'MCU / Earth-616',
    role: 'Sorcerer',
    rarity: 'Legendary',
    stats: { power: 93, strength: 40, speed: 75, durability: 65, combat: 80, range: 96, intelligence: 98 },
    specialAbilities: ['Mirror Dimension Trapping', 'Images of Ikonn', 'Crimson Bands of Cyttorak', 'Time Arcana'],
    description: 'Master of the Mystic Arts capable of banishing eldritch horrors, conjuring defensive barriers, and redirecting cosmic energy.',
    visuals: {
      primaryColor: '#0c4a60',
      accentColor: '#ff9900',
      badgeText: '✨ SORCERER SUPREME',
      comicQuote: 'Dormammu, I have come to bargain.'
    },
    tacticalNotes: 'Master of crowd control, dimensional exile, and defensive wards. Exploits intellect over raw brute force.',
    matchupStrengths: ['Energy Blasters', 'Heavy Brawlers', 'Beasts'],
    matchupWeaknesses: ['Extreme Speedsters', 'Raw Chaos Magic Overload'],
    imageUrl: '/characters/doctor-strange.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/226-doctor-strange.jpg'
  },
  {
    id: 'captain-marvel',
    name: 'Captain Marvel',
    alterEgo: 'Carol Danvers',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 95, strength: 92, speed: 96, durability: 92, combat: 84, range: 94, intelligence: 78 },
    specialAbilities: ['Binary Mode', 'Photon Beam Cannons', 'Energy Absorption', 'FTL Flight'],
    description: 'Infused with the Cosmic Tesseract, she flies at light-speed and obliterates planetary dreadnoughts in Binary form.',
    visuals: {
      primaryColor: '#b91c1c',
      accentColor: '#0284c7',
      badgeText: '💫 BINARY COSMIC',
      comicQuote: 'Higher, further, faster, baby.'
    },
    tacticalNotes: 'Absorbs opponent energy attacks to amplify her own photon blasts. Devastating aerial mobility.',
    matchupStrengths: ['Energy Blasters', 'Tech Weapons', 'Fleet Ships'],
    matchupWeaknesses: ['Mystic Reality Warping', 'Magic Vulnerability'],
    imageUrl: '/characters/captain-marvel.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/156-captain-marvel.jpg'
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    alterEgo: 'Tony Stark',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 89, strength: 85, speed: 84, durability: 86, combat: 80, range: 92, intelligence: 100 },
    specialAbilities: ['Nanotech Armor', 'Unibeam Overload', 'Micro-Missile Barrage', 'Combat Analysis AI'],
    description: 'Genius billionaire superhero armored in fluid nanotech that adapts on the fly to counter any adversary.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#fbbf24',
      badgeText: '🤖 NANOTECH TITAN',
      comicQuote: 'I am Iron Man.'
    },
    tacticalNotes: 'Tactical analysis predicts enemy combat vectors. Highly versatile ranged arsenal for all threat envelopes.',
    matchupStrengths: ['Conventional Armies', 'Mid-tier Brawlers', 'Snipers'],
    matchupWeaknesses: ['EMP Weapons', 'Extreme Magic Spells', 'Vibranium Piercing'],
    imageUrl: '/characters/iron-man.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg'
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    alterEgo: 'Steve Rogers',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Epic',
    stats: { power: 81, strength: 72, speed: 70, durability: 75, combat: 98, range: 60, intelligence: 88 },
    specialAbilities: ['Vibranium Shield Ricochet', 'Super Soldier Serum', 'Master Tactician', 'Unbreakable Will'],
    description: 'The legendary First Avenger whose kinetic-absorbing shield and peerless hand-to-hand combat inspire armies.',
    visuals: {
      primaryColor: '#1d4ed8',
      accentColor: '#dc2626',
      badgeText: '🛡️ FIRST AVENGER',
      comicQuote: 'I can do this all day.'
    },
    tacticalNotes: 'Vibranium shield blocks kinetic and energy attacks completely. Expert at disarming superior opponents.',
    matchupStrengths: ['Street Fighters', 'Marksmen', 'Martial Artists'],
    matchupWeaknesses: ['Cosmic Powerhouses', 'AoE Disintegration'],
    imageUrl: '/characters/captain-america.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg'
  },
  {
    id: 'hulk',
    name: 'Hulk',
    alterEgo: 'Bruce Banner',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Legendary',
    stats: { power: 92, strength: 99, speed: 70, durability: 98, combat: 76, range: 50, intelligence: 62 },
    specialAbilities: ['Rage Amplification', 'Thunderclap Shockwave', 'Gamma Regeneration', 'Worldbreaker Stomp'],
    description: 'The green Goliath whose physical strength and regenerative factor scale infinitely the angrier he gets.',
    visuals: {
      primaryColor: '#15803d',
      accentColor: '#84cc16',
      badgeText: '💥 INCREDIBLE RAGE',
      comicQuote: 'HULK SMASH!'
    },
    tacticalNotes: 'Tremendous physical health pool and kinetic shockwaves. Grows stronger the longer the fight lasts.',
    matchupStrengths: ['Melee Brutes', 'Robots', 'Ground Forces'],
    matchupWeaknesses: ['Flight Snipers', 'Telepaths', 'Dimensional Traps'],
    imageUrl: '/characters/hulk.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg'
  },
  {
    id: 'spider-man',
    name: 'Spider-Man',
    alterEgo: 'Peter Parker',
    universe: 'MCU / Earth-616',
    role: 'Speedster',
    rarity: 'Epic',
    stats: { power: 84, strength: 80, speed: 92, durability: 74, combat: 86, range: 75, intelligence: 90 },
    specialAbilities: ['Spider-Sense Evasion', 'Web-Shooter Traps', 'Acrobatic Momentum', 'Wall-Crawling Blitz'],
    description: 'Friendly neighborhood wall-crawler possessing pre-cognitive Spider-Sense, proportional arachnid strength, and web artillery.',
    visuals: {
      primaryColor: '#dc2626',
      accentColor: '#2563eb',
      badgeText: '🕸️ WEB-SLINGER',
      comicQuote: 'With great power comes great responsibility.'
    },
    tacticalNotes: 'Spider-sense grants near-unhittable reflex dodges. Rapid webbing incapacitates heavy hitters.',
    matchupStrengths: ['Slow Brawlers', 'Snipers', 'Single-Target Strikers'],
    matchupWeaknesses: ['Sonic Attacks', 'Full-Sphere AoE Blasts'],
    imageUrl: '/characters/spider-man.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg'
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    alterEgo: "T'Challa",
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Epic',
    stats: { power: 85, strength: 76, speed: 85, durability: 88, combat: 96, range: 58, intelligence: 92 },
    specialAbilities: ['Kinetic Energy Redirection', 'Vibranium Claws', 'Heart-Shaped Herb Agility', 'Wakandan Stealth'],
    description: 'King of Wakanda clad in a kinetic-weave suit that absorbs impact energy and releases it in devastating purple shockwaves.',
    visuals: {
      primaryColor: '#1e1b4b',
      accentColor: '#a855f7',
      badgeText: '🐾 KING OF WAKANDA',
      comicQuote: 'Wakanda Forever!'
    },
    tacticalNotes: 'Absorbs physical impacts and discharges them as radial kinetic bursts. Vibranium claws shred high-durability armor.',
    matchupStrengths: ['Melee Duelists', 'Physical Strikers', 'Assassins'],
    matchupWeaknesses: ['High-yield Energy Bombardment', 'Magic Hexes'],
    imageUrl: '/characters/black-panther.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/106-black-panther.jpg'
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    alterEgo: 'Logan',
    universe: 'Earth-10005 / Earth-616',
    role: 'Striker',
    rarity: 'Epic',
    stats: { power: 84, strength: 78, speed: 76, durability: 96, combat: 94, range: 35, intelligence: 72 },
    specialAbilities: ['Adamantium Claws', 'Hyper Healing Factor', 'Berserker Rage', 'Feral Senses'],
    description: 'Mutant weapon forged with an unbreakable adamantium skeleton, razor-sharp claws, and an immortal healing factor.',
    visuals: {
      primaryColor: '#ca8a04',
      accentColor: '#1e3a8a',
      badgeText: '🐺 WEAPON X',
      comicQuote: "I'm the best there is at what I do."
    },
    tacticalNotes: 'Cannot be permanently put down by normal kinetic or bladed attacks. Outlasts enemies in grueling wars of attrition.',
    matchupStrengths: ['Single Combat Duelists', 'Tanks without Regen', 'Beasts'],
    matchupWeaknesses: ['Magnetic Manipulators', 'Drowning / Oxygen Deprivation', 'Space Exile'],
    imageUrl: '/characters/wolverine.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg'
  },
  {
    id: 'daredevil',
    name: 'Daredevil',
    alterEgo: 'Matt Murdock',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 74, strength: 60, speed: 74, durability: 65, combat: 95, range: 45, intelligence: 86 },
    specialAbilities: ['Radar Sense 360°', 'Billy Club Ricochet', 'Acrobatic Pressure Points', 'Blind Justice Focus'],
    description: 'The Devil of Hell’s Kitchen whose superhuman sensory radar detects heartbeats, muscle twitches, and unseen flanking attacks.',
    visuals: {
      primaryColor: '#7f1d1d',
      accentColor: '#ef4444',
      badgeText: '⚖️ MAN WITHOUT FEAR',
      comicQuote: "I'm not seeking penance for what I've done..."
    },
    tacticalNotes: 'Flawless close-quarters evasion and critical nerve-strike counters. Pinpoints structural weak points in opponent armor.',
    matchupStrengths: ['Invisible Foes', 'Street Martial Artists', 'Marksmen'],
    matchupWeaknesses: ['Deafening Sonics', 'High-Tier Superhumans'],
    imageUrl: '/characters/daredevil.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/201-daredevil.jpg'
  },
  {
    id: 'loki',
    name: 'Loki',
    alterEgo: 'Loki Laufeyson',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Legendary',
    stats: { power: 88, strength: 75, speed: 78, durability: 80, combat: 85, range: 82, intelligence: 95 },
    specialAbilities: ['Illusion Duplication', 'Frost Giant Physiology', 'Asgardian Daggers', 'Sorcerous Subterfuge'],
    description: 'The God of Mischief uses Asgardian sorcery, holographic decoys, and razor intellect to outmaneuver gods and monsters alike.',
    visuals: {
      primaryColor: '#14532d',
      accentColor: '#eab308',
      badgeText: '🐍 GOD OF MISCHIEF',
      comicQuote: 'I am burdened with glorious purpose.'
    },
    tacticalNotes: 'Illusion clones force enemies to waste ultimate abilities on decoys. Deadly backstab daggers pierce mystical flesh.',
    matchupStrengths: ['Straightforward Brawlers', 'Cocky Warriors'],
    matchupWeaknesses: ['Area of Effect Omnipresence', 'Telepathic True Sight'],
    imageUrl: '/characters/loki.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/414-loki.jpg'
  },
  {
    id: 'hela',
    name: 'Hela',
    alterEgo: 'Goddess of Death',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Legendary',
    stats: { power: 95, strength: 95, speed: 84, durability: 96, combat: 92, range: 88, intelligence: 82 },
    specialAbilities: ['Necrosword Conjuration', 'Undead Legion Mastery', 'Asgardian Empowerment', 'Armor-Piercing Blades'],
    description: 'Firstborn of Odin whose power in Asgard is limitless, manifesting endless rain of obsidian necroswords.',
    visuals: {
      primaryColor: '#022c22',
      accentColor: '#22c55e',
      badgeText: '💀 GODDESS OF DEATH',
      comicQuote: 'I’m not a queen or a monster. I’m the Goddess of Death.'
    },
    tacticalNotes: 'Endless volley of lethal necroswords overwhelms shields and heavy armor at any range.',
    matchupStrengths: ['Armored Armies', 'Melee Tanks', 'Asgardian Warriors'],
    matchupWeaknesses: ['Surtur-level Planetary Cataclysms'],
    imageUrl: '/characters/hela.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/321-hela.jpg'
  },
  {
    id: 'shang-chi',
    name: 'Shang-Chi',
    alterEgo: 'Shang-Chi',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Epic',
    stats: { power: 86, strength: 78, speed: 88, durability: 82, combat: 99, range: 80, intelligence: 80 },
    specialAbilities: ['Ten Rings Kinetic Cannon', 'Dragon Style Air Manipulation', 'Ten Rings Platform Steps', 'Supreme Martial Arts'],
    description: 'Master of martial arts who bonded with the ancient cosmic Ten Rings, weaponizing elemental kinetic energy pulses.',
    visuals: {
      primaryColor: '#7f1d1d',
      accentColor: '#f59e0b',
      badgeText: '💍 TEN RINGS MASTER',
      comicQuote: 'I’m not my father.'
    },
    tacticalNotes: 'Ten Rings provide devastating medium-range kinetic strikes and defensive orbiting rings against incoming artillery.',
    matchupStrengths: ['Hand-to-hand Experts', 'Beasts', 'Projectiles'],
    matchupWeaknesses: ['Mental Attacks', 'Reality-bending Magic'],
    imageUrl: '/characters/shang-chi.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/587-shang-chi.jpg'
  },
  {
    id: 'namor',
    name: 'Namor',
    alterEgo: 'K’uk’ulkan',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Epic',
    stats: { power: 89, strength: 91, speed: 86, durability: 88, combat: 90, range: 74, intelligence: 82 },
    specialAbilities: ['Winged Ankle Flight', 'Vibranium Spear Strikes', 'Hydrokinesis Mastery', 'Sub-Mariner Toughness'],
    description: 'Mutant ruler of Talokan gifted with flight, hydrokinesis, and aquatic physiology that matches Asgardian godhood.',
    visuals: {
      primaryColor: '#065f46',
      accentColor: '#0284c7',
      badgeText: '🌊 THE FEATHERED SERPENT',
      comicQuote: 'Imperius Rex!'
    },
    tacticalNotes: 'Aerial agility combined with underwater strength makes him an unpredictable 3D aerial threat.',
    matchupStrengths: ['Ground Brawlers', 'Surface Fleets', 'Fire Users'],
    matchupWeaknesses: ['Dehydration', 'Extreme Heat / Desiccation'],
    imageUrl: '/characters/namor.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/481-namor.jpg'
  },
  {
    id: 'ikaris',
    name: 'Ikaris',
    alterEgo: 'Ikaris of Olympia',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 92, strength: 92, speed: 90, durability: 92, combat: 85, range: 92, intelligence: 75 },
    specialAbilities: ['Cosmic Energy Heat Vision', 'Supersonic Flight', 'Eternal Invulnerability', 'Heavy Kinetic Slam'],
    description: 'Tactical prime Eternal manufactured with near-impenetrable celestial physiology and twin beams of incinerating cosmic ocular energy.',
    visuals: {
      primaryColor: '#1e3a8a',
      accentColor: '#f97316',
      badgeText: '☀️ COSMIC ETERNAL',
      comicQuote: 'I have to protect humanity from the Deviants.'
    },
    tacticalNotes: 'Constant flight and continuous eye-beam bombardment allow him to kite terrestrial powerhouses.',
    matchupStrengths: ['Terrestrial Monsters', 'Melee Brutes', 'Snipers'],
    matchupWeaknesses: ['Celestial Transmutation', 'High Magic Hexes'],
    imageUrl: '/characters/ikaris.jpg',
    artwork: '/characters/ikaris.jpg'
  },
  {
    id: 'vision',
    name: 'Vision',
    alterEgo: 'Vision',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 91, strength: 88, speed: 84, durability: 94, combat: 78, range: 90, intelligence: 96 },
    specialAbilities: ['Density Alteration Phasing', 'Mind Stone Solar Beam', 'Vibranium-Synthezoid Body', 'Supercomputer Computation'],
    description: 'Vibranium synthezoid powered by the Mind Stone, capable of ghosting through matter or becoming as diamond-hard as a mountain.',
    visuals: {
      primaryColor: '#15803d',
      accentColor: '#dc2626',
      badgeText: '💎 MIND STONE SYNTH',
      comicQuote: 'What is grief, if not love persevering?'
    },
    tacticalNotes: 'Phasing allows him to avoid 100% of physical damage, while solar beam ignores physical armor.',
    matchupStrengths: ['Kinetic Strikers', 'Bullets', 'Pure Physical Brutes'],
    matchupWeaknesses: ['Corvus Glaive Energy Disruptors', 'Chaos Magic Overrides'],
    imageUrl: '/characters/vision.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/697-vision.jpg'
  },
  {
    id: 'white-vision',
    name: 'White Vision',
    alterEgo: 'The Cataract',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Epic',
    stats: { power: 88, strength: 86, speed: 82, durability: 92, combat: 76, range: 88, intelligence: 92 },
    specialAbilities: ['Cold Logic Calculus', 'Vibranium Phasing', 'Synthetic Optic Beam', 'Unflinching Armor'],
    description: 'S.W.O.R.D. reassembled synthezoid operating without emotion, calculating lethal tactical engagements with computer precision.',
    visuals: {
      primaryColor: '#475569',
      accentColor: '#06b6d4',
      badgeText: '⚪ GHOST SYNTH',
      comicQuote: 'I am Vision.'
    },
    tacticalNotes: 'Free of emotional hesitation; strictly calculates mathematically optimum strike angles and phasing defenses.',
    matchupStrengths: ['Emotional Combatants', 'Physical Brawlers'],
    matchupWeaknesses: ['Philosophical Paradigms', 'Chaos Hexes'],
    imageUrl: '/characters/white-vision.jpg',
    artwork: '/characters/white-vision.jpg'
  },
  {
    id: 'moon-knight',
    name: 'Moon Knight',
    alterEgo: 'Marc Spector',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Rare',
    stats: { power: 78, strength: 74, speed: 76, durability: 82, combat: 90, range: 65, intelligence: 76 },
    specialAbilities: ['Khonshu Resurrection Suit', 'Crescent Darts Volley', 'Brutal CQC', 'Pain Indifference'],
    description: 'Avatar of Egyptian moon god Khonshu who absorbs punishment without flinching, tearing foes apart in bone-crunching melees.',
    visuals: {
      primaryColor: '#334155',
      accentColor: '#e2e8f0',
      badgeText: '🌙 FIST OF KHONSHU',
      comicQuote: 'We protect the travelers of the night.'
    },
    tacticalNotes: 'Ignores physical pain completely and delivers relentless, unpredictable crescent-blade strikes.',
    matchupStrengths: ['Street Thugs', 'Assassins', 'Duelists'],
    matchupWeaknesses: ['Heavy Energy Artillery', 'God-level Beings'],
    imageUrl: '/characters/moon-knight.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/470-moon-knight.jpg'
  },
  {
    id: 'she-hulk',
    name: 'She-Hulk',
    alterEgo: 'Jennifer Walters',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Epic',
    stats: { power: 85, strength: 90, speed: 74, durability: 89, combat: 80, range: 45, intelligence: 88 },
    specialAbilities: ['Controlled Gamma Might', 'Fourth-Wall Insight', 'Thunderous Clap', 'Supreme Legal Intellect'],
    description: 'Retains her genius legal mind while commanding towering emerald gamma strength and impenetrable skin.',
    visuals: {
      primaryColor: '#166534',
      accentColor: '#a855f7',
      badgeText: '⚖️ GAMMA ATTORNEY',
      comicQuote: 'Lawyer by day, superhero by... also day.'
    },
    tacticalNotes: 'Combines calm tactical intellect with colossal gamma power, avoiding rage-induced mistakes.',
    matchupStrengths: ['Melee Brutes', 'Armored Soldiers'],
    matchupWeaknesses: ['Energy Siphoners', 'Hypnosis'],
    imageUrl: '/characters/she-hulk.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/589-she-hulk.jpg'
  },
  {
    id: 'ant-man',
    name: 'Ant-Man',
    alterEgo: 'Scott Lang',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 80, strength: 76, speed: 82, durability: 75, combat: 78, range: 60, intelligence: 84 },
    specialAbilities: ['Giant-Man Growth', 'Quantum Shrink Evasion', 'Ant Swarm Cavalry', 'Pym Particle Disruption'],
    description: 'Master of Pym Particles who toggles between an undetectable microscopic infiltrator and a sixty-foot crushing behemoth.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#475569',
      badgeText: '🐜 PYM PARTICLE MASTER',
      comicQuote: 'I believe this belongs to you!'
    },
    tacticalNotes: 'Microscopic size bypasses enemy targeting reticles; instant growth delivers devastating surprise uppercuts.',
    matchupStrengths: ['Large Slow Tanks', 'Robots with external ports'],
    matchupWeaknesses: ['Atmospheric Dispersal', 'Area Firefields'],
    imageUrl: '/characters/ant-man.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/30-ant-man.jpg'
  },
  {
    id: 'gamora',
    name: 'Gamora',
    alterEgo: 'Gamora Zen Whoberi Ben Titan',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Rare',
    stats: { power: 80, strength: 76, speed: 84, durability: 78, combat: 96, range: 60, intelligence: 80 },
    specialAbilities: ['Godslayer Blade', 'Cybernetic Enhancements', 'Master Assassin Reflexes', 'Acrobatic Lethality'],
    description: 'Trained by Thanos to be the deadliest woman in the galaxy, possessing razor precision and bionic combat reflexes.',
    visuals: {
      primaryColor: '#166534',
      accentColor: '#db2777',
      badgeText: '⚔️ DEADLIEST WOMAN',
      comicQuote: 'I am a warrior and an assassin.'
    },
    tacticalNotes: 'Godslayer blade cuts through alien armor effortlessly; pinpoint strikes bypass shields.',
    matchupStrengths: ['Bounty Hunters', 'Mid-tier Alien Warriors'],
    matchupWeaknesses: ['Planetary Energy Blasters', 'Magic Hexes'],
    imageUrl: '/characters/gamora.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/275-gamora.jpg'
  },
  {
    id: 'groot',
    name: 'Groot',
    alterEgo: 'Groot',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Rare',
    stats: { power: 79, strength: 84, speed: 55, durability: 88, combat: 72, range: 75, intelligence: 60 },
    specialAbilities: ['Flora Colossus Branch Shield', 'Vine Entanglement', 'Regenerative Sprouting', 'Bioluminescent Spores'],
    description: 'Sentient floral colossus whose woody limbs stretch into impaling roots or interlock into defensive barricades.',
    visuals: {
      primaryColor: '#78350f',
      accentColor: '#65a30d',
      badgeText: '🌳 FLORA COLOSSUS',
      comicQuote: 'I am Groot.'
    },
    tacticalNotes: 'Can regrow from splintered wood; branches snare and disarm weapon-wielding foes.',
    matchupStrengths: ['Physical Projectiles', 'Light Infantry'],
    matchupWeaknesses: ['Incendiary Attacks', 'Extreme Heat'],
    imageUrl: '/characters/groot.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/303-groot.jpg'
  },
  {
    id: 'winter-soldier',
    name: 'Winter Soldier',
    alterEgo: 'Bucky Barnes',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Rare',
    stats: { power: 78, strength: 75, speed: 72, durability: 74, combat: 93, range: 70, intelligence: 78 },
    specialAbilities: ['Vibranium Bionic Arm', 'Super Soldier Conditioning', 'Military Weapon Arsenal', 'Deadly Knife Mastery'],
    description: 'Ghost operative with a vibranium arm capable of catching shields, shattering concrete, and executing lethal martial drills.',
    visuals: {
      primaryColor: '#334155',
      accentColor: '#94a3b8',
      badgeText: '🦾 BIONIC OPERATIVE',
      comicQuote: 'Who the hell is Bucky?'
    },
    tacticalNotes: 'Bionic arm deflects high-caliber rounds and delivers crushing hydraulic punches in close quarters.',
    matchupStrengths: ['Human Soldiers', 'Assassins', 'Melee Strikers'],
    matchupWeaknesses: ['Heavy Armor Blasters', 'Mental Overrides'],
    imageUrl: '/characters/winter-soldier.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/714-winter-soldier.jpg'
  },
  {
    id: 'falcon',
    name: 'Falcon',
    alterEgo: 'Sam Wilson',
    universe: 'MCU / Earth-616',
    role: 'Speedster',
    rarity: 'Rare',
    stats: { power: 77, strength: 64, speed: 88, durability: 72, combat: 86, range: 74, intelligence: 82 },
    specialAbilities: ['EXO-7 Falcon Flight', 'Redwing Recon Drone', 'Vibranium Wing Deflection', 'Aerial Dive-Bomb'],
    description: 'Aerial combatant equipped with advanced kinetic wings, Redwing drone reconnaissance, and elite dogfight instincts.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#0284c7',
      badgeText: '🦅 AERIAL STRIKER',
      comicQuote: 'On your left.'
    },
    tacticalNotes: 'Superior flight dogfighting speed; folds wings into personal shields against gunfire.',
    matchupStrengths: ['Ground Troopers', 'Static Defense Towers'],
    matchupWeaknesses: ['Homing Missiles', 'EMP Waves'],
    imageUrl: '/characters/falcon.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/251-falcon.jpg'
  },
  {
    id: 'electro',
    name: 'Electro',
    alterEgo: 'Max Dillon',
    universe: 'Earth-120703 / MCU',
    role: 'Blaster',
    rarity: 'Epic',
    stats: { power: 86, strength: 68, speed: 90, durability: 72, combat: 68, range: 94, intelligence: 70 },
    specialAbilities: ['Pure Bio-Electricity Form', 'Arc Lightning Volley', 'Power Grid Absorption', 'Electric Teleport Blitz'],
    description: 'Living electrical conduit capable of transforming into pure lightning, short-circuiting cities, and electrocuting targets.',
    visuals: {
      primaryColor: '#854d0e',
      accentColor: '#eab308',
      badgeText: '⚡ HIGH VOLTAGE',
      comicQuote: 'You want to be my friend? Let me show you how it feels to be nobody.'
    },
    tacticalNotes: 'Turns into intangible electricity when travelling along metal surfaces or wiring.',
    matchupStrengths: ['Tech Armor Suits', 'Water Environments', 'Cyborgs'],
    matchupWeaknesses: ['Rubber Grounding', 'Water Deluges that cause self-short'],
    imageUrl: '/characters/electro.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/237-electro.jpg'
  },
  {
    id: 'agatha-harkness',
    name: 'Agatha Harkness',
    alterEgo: 'Agatha Harkness',
    universe: 'MCU / Earth-616',
    role: 'Sorcerer',
    rarity: 'Epic',
    stats: { power: 88, strength: 48, speed: 70, durability: 70, combat: 72, range: 92, intelligence: 94 },
    specialAbilities: ['Darkhold Sorcery', 'Magic Absorption Leech', 'Mind Illusion Strings', 'Purple Witchfire'],
    description: 'Centuries-old Salem sorceress who feeds upon and steals the magical powers of any witch foolish enough to cast at her.',
    visuals: {
      primaryColor: '#581c87',
      accentColor: '#c084fc',
      badgeText: '🧙‍♀️ COVEN LEADER',
      comicQuote: 'It was Agatha all along!'
    },
    tacticalNotes: 'Drains energy and magic directly from incoming spells, converting enemy attacks into her own shield strength.',
    matchupStrengths: ['Energy Casters', 'Unskilled Mages'],
    matchupWeaknesses: ['Pure Non-Magical Brute Force', 'Cold Steel Weapons'],
    imageUrl: '/characters/agatha-harkness.jpg',
    artwork: '/characters/agatha-harkness.jpg'
  },
  {
    id: 'ultron',
    name: 'Ultron',
    alterEgo: 'Ultron Prime',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 90, strength: 88, speed: 78, durability: 92, combat: 82, range: 90, intelligence: 98 },
    specialAbilities: ['Vibranium Frame', 'Gravity Manipulation Beams', 'Drone Army Link', 'Technopathic Takeover'],
    description: 'Artificial intelligence housed in a vibranium shell, seeking mechanical perfection by wiping humanity from Earth.',
    visuals: {
      primaryColor: '#1c1917',
      accentColor: '#dc2626',
      badgeText: '🔴 CRIMSON SENTIENCE',
      comicQuote: 'There are no strings on me.'
    },
    tacticalNotes: 'Vibranium outer shell deflects standard ordnance; repulsive tractor beams toss heavy vehicles like paper.',
    matchupStrengths: ['Conventional Armies', 'Tech Hacks', 'Human Soldiers'],
    matchupWeaknesses: ['Mind Stone Disruptions', 'Chaos Magic Dismantling'],
    imageUrl: '/characters/ultron.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/680-ultron.jpg'
  },
  {
    id: 'mantis',
    name: 'Mantis',
    alterEgo: 'Mantis',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 75, strength: 52, speed: 74, durability: 72, combat: 70, range: 40, intelligence: 76 },
    specialAbilities: ['Empathic Sleep Induced', 'Emotion Manipulation', 'Celestial Biology Toughness', 'Acrobatic Agility'],
    description: 'Empath whose tactile connection can pacify enraged Celestials and force titans like Thanos into deep slumber.',
    visuals: {
      primaryColor: '#3f6212',
      accentColor: '#a3e635',
      badgeText: '🌸 CELESTIAL EMPATH',
      comicQuote: 'SLEEP!'
    },
    tacticalNotes: 'A single palm touch forces enraged behemoths into instant catatonia, neutralising raw strength.',
    matchupStrengths: ['Enraged Brawlers', 'Mindless Monsters', 'Berserkers'],
    matchupWeaknesses: ['Long-range Snipers', 'Robots / Synthezoids'],
    imageUrl: '/characters/mantis.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/431-mantis.jpg'
  },
  {
    id: 'ebony-maw',
    name: 'Ebony Maw',
    alterEgo: 'The Maw',
    universe: 'MCU / Earth-616',
    role: 'Sorcerer',
    rarity: 'Epic',
    stats: { power: 86, strength: 50, speed: 72, durability: 68, combat: 75, range: 94, intelligence: 92 },
    specialAbilities: ['Micro-Telekinesis Mastery', 'Concrete Piercing Needles', 'Levitation Flight', 'Mystic Restraints'],
    description: 'Black Order zealot whose telekinetic precision shreds buildings and binds sorcerers in razor-sharp rebar.',
    visuals: {
      primaryColor: '#262626',
      accentColor: '#a3a3a3',
      badgeText: '👁️ BLACK ORDER HERALD',
      comicQuote: 'Hear me and rejoice.'
    },
    tacticalNotes: 'Can telekinetically reshape the surrounding environment into countless piercing projectiles from safe distance.',
    matchupStrengths: ['Melee Bruisers', 'Traditional Firearms'],
    matchupWeaknesses: ['Sudden Physical Ambush', 'Vacuum of Outer Space'],
    imageUrl: '/characters/ebony-maw.jpg',
    artwork: '/characters/ebony-maw.jpg'
  },
  {
    id: 'red-guardian',
    name: 'Red Guardian',
    alterEgo: 'Alexei Shostakov',
    universe: 'MCU / Earth-616',
    role: 'Tank',
    rarity: 'Rare',
    stats: { power: 76, strength: 78, speed: 64, durability: 78, combat: 85, range: 45, intelligence: 68 },
    specialAbilities: ['Soviet Super Soldier Serum', 'Battering Shield Rush', 'Vodka-Fueled Brawling', 'Heavy Grappling'],
    description: 'The Soviet Union’s premier super soldier, armed with hearty brawling stamina and unyielding patriotic pride.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#e2e8f0',
      badgeText: '⭐ SOVIET TANK',
      comicQuote: 'Captain America is my greatest rival!'
    },
    tacticalNotes: 'Heavyweight momentum behind shield charges knocks targets off balance.',
    matchupStrengths: ['Street Fighters', 'Light Assassins'],
    matchupWeaknesses: ['High-tech Blasters', 'Mystic Energy Attacks'],
    imageUrl: '/characters/red-guardian.jpg',
    artwork: '/characters/red-guardian.jpg'
  },
  {
    id: 'magneto',
    name: 'Magneto',
    alterEgo: 'Erik Lehnsherr',
    universe: 'Earth-616 / X-Men',
    role: 'Blaster',
    rarity: 'Cosmic',
    stats: { power: 96, strength: 55, speed: 78, durability: 92, combat: 84, range: 98, intelligence: 96 },
    specialAbilities: ['Electromagnetic Force Fields', 'Sub-Atomic Metallic Ripping', 'Bridge/Submarine Throw', 'Iron Blood Stop'],
    description: 'Alpha-Omega level mutant master of magnetism who bends magnetic poles and crushes armored armies like tin foil.',
    visuals: {
      primaryColor: '#831843',
      accentColor: '#9333ea',
      badgeText: '🧲 MASTER OF MAGNETISM',
      comicQuote: 'Mutants are the future!'
    },
    tacticalNotes: 'Absolute counter against any character wearing metallic armor, tech, or wielding metal weapons.',
    matchupStrengths: ['Iron Man', 'Wolverine', 'Ultron', 'Tech Armors'],
    matchupWeaknesses: ['Pure Non-Metallic Organic Beings', 'Psychics without helmet'],
    imageUrl: '/characters/magneto.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/423-magneto.jpg'
  },
  {
    id: 'deadpool',
    name: 'Deadpool',
    alterEgo: 'Wade Wilson',
    universe: 'Earth-616 / Marvel Universe',
    role: 'Striker',
    rarity: 'Epic',
    stats: { power: 82, strength: 72, speed: 82, durability: 98, combat: 92, range: 75, intelligence: 74 },
    specialAbilities: ['Uncanny Healing Factor', 'Twin Katanas & Dual Uzis', 'Fourth-Wall Breaking', 'Unpredictable Chaos'],
    description: 'The Merc with a Mouth whose cancerous regeneration makes him immortal, while insane banter disrupts enemy focus.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#0f172a',
      badgeText: '💀 MERC WITH A MOUTH',
      comicQuote: 'Maximum effort!'
    },
    tacticalNotes: 'Regenerates from dust or decapitation; fighting style is completely erratic and cannot be predicted by AI or telepaths.',
    matchupStrengths: ['Predictive Fighters', 'Tactical Planners'],
    matchupWeaknesses: ['Disintegration without organic trace left'],
    imageUrl: '/characters/deadpool.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg'
  },
  {
    id: 'venom',
    name: 'Venom',
    alterEgo: 'Eddie Brock',
    universe: 'Earth-688 / Earth-616',
    role: 'Tank',
    rarity: 'Epic',
    stats: { power: 86, strength: 90, speed: 84, durability: 90, combat: 82, range: 68, intelligence: 70 },
    specialAbilities: ['Klyntar Symbiote Tendrils', 'Flesh-Consuming Jaws', 'Wall-Scaling Tendrils', 'Camouflage Cloak'],
    description: 'Lethal alien symbiote bonding with Eddie Brock to form an apex predatory monster with razor fangs and morphing tendrils.',
    visuals: {
      primaryColor: '#09090b',
      accentColor: '#ffffff',
      badgeText: '🕷️ LETHAL PROTECTOR',
      comicQuote: 'We are Venom!'
    },
    tacticalNotes: 'Tendrils ensnare multiple foes simultaneously; biological armor absorbs heavy kinetic artillery.',
    matchupStrengths: ['Bullet Weapons', 'Standard Melee Fighters'],
    matchupWeaknesses: ['High-Frequency Sonics', 'Extreme Fire / Incendiary'],
    imageUrl: '/characters/venom.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/687-venom.jpg'
  },
  {
    id: 'hawkeye',
    name: 'Hawkeye',
    alterEgo: 'Clint Barton',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 75, strength: 58, speed: 70, durability: 64, combat: 90, range: 94, intelligence: 82 },
    specialAbilities: ['Never-Miss Trick Arrows', 'Pym Particle Arrow', 'Thermite Explosive Heads', 'Master Ronin Blades'],
    description: 'Peerless marksman who never misses a shot, carrying a quiver of arrows tailored to disable any threat.',
    visuals: {
      primaryColor: '#3b0764',
      accentColor: '#9333ea',
      badgeText: '🎯 MASTER ARCHER',
      comicQuote: 'I never miss.'
    },
    tacticalNotes: 'Specialized trick arrows (acid, sonic, EMP, explosive, Pym shrink) exploit specific enemy elemental weaknesses.',
    matchupStrengths: ['Flying Targets', 'Tech Armor Suits'],
    matchupWeaknesses: ['Ultra-Speedsters', 'Bullet-Immune Tanks'],
    imageUrl: '/characters/hawkeye.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-hawkeye.jpg'
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    alterEgo: 'Natasha Romanoff',
    universe: 'MCU / Earth-616',
    role: 'Striker',
    rarity: 'Rare',
    stats: { power: 75, strength: 56, speed: 75, durability: 64, combat: 96, range: 65, intelligence: 90 },
    specialAbilities: ['Widow’s Bite Gauntlet Shock', 'Red Room Martial Assassination', 'Infiltration Decoys', 'Acrobatic Garrote'],
    description: 'Elite KGB graduate and master Avenger assassin capable of dismantling armed battalions with lethal espionage technique.',
    visuals: {
      primaryColor: '#171717',
      accentColor: '#dc2626',
      badgeText: '🕷️ RED ROOM ASSASSIN',
      comicQuote: 'I have red in my ledger... I’d like to wipe it out.'
    },
    tacticalNotes: 'High-voltage electric gauntlets stun nervous systems; lethal counters exploit joint anatomy.',
    matchupStrengths: ['Human Mercenaries', 'Infiltration Targets'],
    matchupWeaknesses: ['Armored Super-Tanks', 'Energy Beams'],
    imageUrl: '/characters/black-widow.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg'
  },
  {
    id: 'doctor-doom',
    name: 'Doctor Doom',
    alterEgo: 'Victor Von Doom',
    universe: 'Earth-616',
    role: 'Sorcerer',
    rarity: 'Cosmic',
    stats: { power: 97, strength: 86, speed: 78, durability: 95, combat: 90, range: 94, intelligence: 100 },
    specialAbilities: ['Doombot Protocol', 'Crimson Arcane Magic', 'Titanium-Alloy Armor', 'Cosmic Energy Siphon'],
    description: 'Sovereign of Latveria whose mastery of advanced science rivals Reed Richards and whose dark sorcery rivals Doctor Strange.',
    visuals: {
      primaryColor: '#14532d',
      accentColor: '#94a3b8',
      badgeText: '👑 MONARCH OF LATVERIA',
      comicQuote: 'DOOM TOOT AS HE PLEASES!'
    },
    tacticalNotes: 'Dual mastery of mystic magic and high-tech force fields. Decoy Doombots absorb fatal initial salvos.',
    matchupStrengths: ['Pure Tech Users', 'Pure Mages', 'World Conquerors'],
    matchupWeaknesses: ['Arrogance', 'Cosmic Godly Entity Incursions'],
    imageUrl: '/characters/doctor-doom.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/222-doctor-doom.jpg'
  },
  {
    id: 'star-lord',
    name: 'Star-Lord',
    alterEgo: 'Peter Quill',
    universe: 'MCU / Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 76, strength: 62, speed: 74, durability: 70, combat: 82, range: 80, intelligence: 82 },
    specialAbilities: ['Dual Quad Blasters', 'Gravity Mine Trap', 'Jet Boot Aerial Flanking', 'Dance-Off Distraction'],
    description: 'Leader of the Guardians of the Galaxy armed with element guns, gravity traps, rocket boots, and legendary 80s tape tracks.',
    visuals: {
      primaryColor: '#831843',
      accentColor: '#38bdf8',
      badgeText: '🚀 GUARDIANS LEADER',
      comicQuote: 'Dance-off, bro. Me and you.'
    },
    tacticalNotes: 'Gravity mines pin heavy bruisers to the floor, opening them up to concentrated aerial blaster fire.',
    matchupStrengths: ['Ground Troopers', 'Alien Predators'],
    matchupWeaknesses: ['Indestructible Titans', 'Telepathic Mind Control'],
    imageUrl: '/characters/star-lord.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/630-star-lord.jpg'
  },
  {
    id: 'rocket-raccoon',
    name: 'Rocket Raccoon',
    alterEgo: '89P13',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Rare',
    stats: { power: 78, strength: 40, speed: 80, durability: 62, combat: 78, range: 96, intelligence: 98 },
    specialAbilities: ['Hadron Enforcer Cannon', 'Sub-Atomic Explosives', 'Improvised Weapon Assembly', 'Tactical Demolitions'],
    description: 'Genetically modified cybernetic weapons expert who can build a moon-destroying superweapon out of scrap metal and batteries.',
    visuals: {
      primaryColor: '#713f12',
      accentColor: '#f97316',
      badgeText: '💣 WEAPONS SPECIALIST',
      comicQuote: 'Ain’t nothing like me, except me.'
    },
    tacticalNotes: 'Carries weapons with firepower disproportionately huge for his size; sets proximity detonators before fighting.',
    matchupStrengths: ['Heavy Armor Warships', 'Clunky Mecha'],
    matchupWeaknesses: ['Close Quarters Grapplers', 'Speedsters'],
    imageUrl: '/characters/rocket-raccoon.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/566-rocket-raccoon.jpg'
  },
  {
    id: 'war-machine',
    name: 'War Machine',
    alterEgo: 'James Rhodes',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Epic',
    stats: { power: 85, strength: 84, speed: 78, durability: 88, combat: 82, range: 92, intelligence: 80 },
    specialAbilities: ['Shoulder-Mounted Minigun', 'Bunker-Buster Missiles', 'Repulsor Cannons', 'Heavy Plating Armor'],
    description: 'U.S. Air Force Colonel piloting heavily fortified Stark armor loaded with enough heavy ballistic ordnance to level city blocks.',
    visuals: {
      primaryColor: '#1e293b',
      accentColor: '#e2e8f0',
      badgeText: '🎖️ WALKING ARSENAL',
      comicQuote: 'Boom! You looking for this?'
    },
    tacticalNotes: 'Sustained bullet storms shred infantry waves; high durability armor weathers counter-battery fire.',
    matchupStrengths: ['Infantry Divisions', 'Swarm Enemies'],
    matchupWeaknesses: ['Magnetism Manipulators', 'EMP Systems'],
    imageUrl: '/characters/war-machine.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/703-war-machine.jpg'
  },
  {
    id: 'ghost-rider',
    name: 'Ghost Rider',
    alterEgo: 'Robbie Reyes / Johnny Blaze',
    universe: 'Earth-616',
    role: 'Tank',
    rarity: 'Legendary',
    stats: { power: 93, strength: 90, speed: 85, durability: 95, combat: 84, range: 82, intelligence: 72 },
    specialAbilities: ['Penance Stare', 'Hellfire Chain Flail', 'Hell Charger Vehicle', 'Impenetrable Demonic Bones'],
    description: 'Vessel of the Spirit of Vengeance wielding supernatural Hellfire that incinerates both physical flesh and sinful souls.',
    visuals: {
      primaryColor: '#0f172a',
      accentColor: '#ea580c',
      badgeText: '🔥 SPIRIT OF VENGEANCE',
      comicQuote: 'Look into my eyes. Your soul is stained with the blood of the innocent.'
    },
    tacticalNotes: 'Penance Stare instantly neutralizes enemies who have caused pain or death to others.',
    matchupStrengths: ['Sinful Villains', 'Demons', 'Armored Slayers'],
    matchupWeaknesses: ['Innocent Souls / Blind Judgments', 'Holy Relics'],
    imageUrl: '/characters/ghost-rider.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/280-ghost-rider.jpg'
  },
  {
    id: 'silver-surfer',
    name: 'Silver Surfer',
    alterEgo: 'Norrin Radd',
    universe: 'Earth-616',
    role: 'Speedster',
    rarity: 'Cosmic',
    stats: { power: 98, strength: 90, speed: 100, durability: 98, combat: 80, range: 98, intelligence: 92 },
    specialAbilities: ['Power Cosmic Beam', 'Hyperspace Board Travel', 'Matter Transmutation', 'Galactic Energy Manipulation'],
    description: 'Herald of Galactus blessed with the Power Cosmic, traversing galaxies faster than light and manipulating subatomic particles.',
    visuals: {
      primaryColor: '#334155',
      accentColor: '#94a3b8',
      badgeText: '🌌 HERALD OF GALACTUS',
      comicQuote: 'To the far corners of the cosmos!'
    },
    tacticalNotes: 'Unmatched cosmic speed and planetary energy projection; can alter molecular structure of enemy armor.',
    matchupStrengths: ['Conventional Planetary Armies', 'Physical Tanks'],
    matchupWeaknesses: ['Cosmic Elders', 'Soul-devouring entities'],
    imageUrl: '/characters/silver-surfer.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/598-silver-surfer.jpg'
  },
  {
    id: 'jean-grey',
    name: 'Jean Grey',
    alterEgo: 'Phoenix',
    universe: 'Earth-616',
    role: 'Sorcerer',
    rarity: 'Cosmic',
    stats: { power: 98, strength: 55, speed: 82, durability: 85, combat: 78, range: 98, intelligence: 94 },
    specialAbilities: ['Omega Telekinesis', 'Phoenix Force Rebirth', 'Planetary Telepathy', 'Disintegration Flame'],
    description: 'Omega-level mutant psychic host to the cosmic Phoenix Force, capable of extinguishing stars and reviving from the ashes.',
    visuals: {
      primaryColor: '#14532d',
      accentColor: '#f97316',
      badgeText: '🔥 OMEGA PHOENIX',
      comicQuote: 'I am fire and life incarnate!'
    },
    tacticalNotes: 'Psychic assault bypasses all physical armor; Phoenix flame incinerates enemies on atomic levels.',
    matchupStrengths: ['Pure Physical Brutes', 'Robots without Psi-Shielding'],
    matchupWeaknesses: ['Psionic Inhibitors', 'Direct Cosmic Nullifiers'],
    imageUrl: '/characters/jean-grey.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/356-jean-grey.jpg'
  },
  {
    id: 'cyclops',
    name: 'Cyclops',
    alterEgo: 'Scott Summers',
    universe: 'Earth-616',
    role: 'Tactician',
    rarity: 'Epic',
    stats: { power: 85, strength: 66, speed: 72, durability: 74, combat: 92, range: 98, intelligence: 96 },
    specialAbilities: ['Optic Blast Concussive Beam', 'Geometry Deflection Angle', 'Field Commander Mastermind', 'Visor Overload'],
    description: 'Tactical field commander of the X-Men whose eyes open portals to an dimension of pure kinetic concussive force.',
    visuals: {
      primaryColor: '#1e3a8a',
      accentColor: '#ef4444',
      badgeText: '🔴 OPTIC LEADER',
      comicQuote: 'To me, my X-Men!'
    },
    tacticalNotes: 'Optic blast can level mountains or deflect precisely off multiple surfaces to strike blind spots.',
    matchupStrengths: ['Mid-range Fighters', 'Uncoordinated Mobs'],
    matchupWeaknesses: ['Mirror Reflective Shields', 'Telepathic Sabotage'],
    imageUrl: '/characters/cyclops.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/196-cyclops.jpg'
  },
  {
    id: 'storm',
    name: 'Storm',
    alterEgo: 'Ororo Munroe',
    universe: 'Earth-616',
    role: 'Blaster',
    rarity: 'Legendary',
    stats: { power: 93, strength: 60, speed: 86, durability: 78, combat: 85, range: 98, intelligence: 88 },
    specialAbilities: ['Atmospheric Lightning Storm', 'Hurricane Vortex Winds', 'Blizzard Freeze Flash', 'Flight on Wind Currents'],
    description: 'Omega-level mutant weather goddess who commands thunderbolts, gale-force hurricanes, and sub-zero blizzards at will.',
    visuals: {
      primaryColor: '#0f172a',
      accentColor: '#38bdf8',
      badgeText: '⚡ GODDESS OF THE STORM',
      comicQuote: 'I am a woman, a mutant, a thief, an X-Man, a lover, a wife, a queen. I am all these things. I am Storm.'
    },
    tacticalNotes: 'Commands battlefield-wide environmental hazards, grounding flyers with typhoons and freezing tanks solid.',
    matchupStrengths: ['Armored Ground Tanks', 'Aerial Armadas'],
    matchupWeaknesses: ['Enclosed Underground Tunnels', 'Claustrophobia'],
    imageUrl: '/characters/storm.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/638-storm.jpg'
  },
  {
    id: 'colossus',
    name: 'Colossus',
    alterEgo: 'Piotr Rasputin',
    universe: 'Earth-616',
    role: 'Tank',
    rarity: 'Epic',
    stats: { power: 84, strength: 93, speed: 60, durability: 95, combat: 80, range: 35, intelligence: 70 },
    specialAbilities: ['Organic Osmium Steel Skin', 'Fastball Special Throw', 'Impenetrable Body Check', 'Heavy Seismic Pound'],
    description: 'Noble mutant giant who transforms his body into organic osmium steel, rendering him immune to artillery and fire.',
    visuals: {
      primaryColor: '#991b1b',
      accentColor: '#94a3b8',
      badgeText: '🔩 OSMIUM COLOSSUS',
      comicQuote: 'For the homeland, and for mutantkind!'
    },
    tacticalNotes: 'Osmium armor resists extreme temperatures and heavy artillery; devastating kinetic grappler.',
    matchupStrengths: ['Ballistic Weapons', 'Fire / Heat Casters'],
    matchupWeaknesses: ['Magnetism Manipulators', 'High-Frequency Vibranium Blade'],
    imageUrl: '/characters/colossus.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/185-colossus.jpg'
  },
  {
    id: 'nightcrawler',
    name: 'Nightcrawler',
    alterEgo: 'Kurt Wagner',
    universe: 'Earth-616',
    role: 'Speedster',
    rarity: 'Epic',
    stats: { power: 80, strength: 62, speed: 96, durability: 70, combat: 92, range: 55, intelligence: 82 },
    specialAbilities: ['BAMF Teleportation Blitz', 'Prehensile Tail Rapier', 'Shadow Camouflage', 'Acrobatic Momentum Flank'],
    description: 'Swashbuckling mutant teleporter who vanishes with a sulfurous "BAMF", striking from behind in the blink of an eye.',
    visuals: {
      primaryColor: '#1e1b4b',
      accentColor: '#38bdf8',
      badgeText: '💨 BAMF TELEPORTER',
      comicQuote: 'Guten Tag! *BAMF*'
    },
    tacticalNotes: 'Teleports enemies into the air or disarms weapons before they can react.',
    matchupStrengths: ['Slow Heavy Artillery', 'Snipers', 'Immobile Turrets'],
    matchupWeaknesses: ['AoE Energy Barricades', 'Pre-cognitive Senses'],
    imageUrl: '/characters/nightcrawler.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/490-nightcrawler.jpg'
  },
  {
    id: 'cable',
    name: 'Cable',
    alterEgo: 'Nathan Summers',
    universe: 'Earth-616',
    role: 'Striker',
    rarity: 'Epic',
    stats: { power: 87, strength: 82, speed: 74, durability: 86, combat: 92, range: 90, intelligence: 92 },
    specialAbilities: ['Techno-Organic Arm Strength', 'Heavy Plasma BFG', 'Tactical Telekinetic Shield', 'Time-Travel Contingency'],
    description: 'Cyborg soldier from a dystopian future armed with enormous futuristic plasma cannons and telekinetic battle shields.',
    visuals: {
      primaryColor: '#334155',
      accentColor: '#fbbf24',
      badgeText: '⏳ TIME-DISPLACED SOLDIER',
      comicQuote: 'Your future ends right now.'
    },
    tacticalNotes: 'Future heavy weapons disintegrate modern armor; cybernetic eye detects stealth and invisible combatants.',
    matchupStrengths: ['Stealth Infiltrators', 'Ground Armies'],
    matchupWeaknesses: ['Techno-Organic Virus Flare-ups'],
    imageUrl: '/characters/cable.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/145-cable.jpg'
  },
  {
    id: 'punisher',
    name: 'Punisher',
    alterEgo: 'Frank Castle',
    universe: 'Earth-616',
    role: 'Tactician',
    rarity: 'Rare',
    stats: { power: 74, strength: 62, speed: 68, durability: 72, combat: 92, range: 88, intelligence: 86 },
    specialAbilities: ['Special Ops Arsenal', 'Anti-Materiel Sniper Rifle', 'Tactical Claymore Ambush', 'Cold Unyielding Will'],
    description: 'War veteran on a single-minded crusade, executing tactical assassinations with high-grade explosives and military rifles.',
    visuals: {
      primaryColor: '#09090b',
      accentColor: '#e2e8f0',
      badgeText: '💀 ONE MAN WAR',
      comicQuote: 'If you’re guilty, you’re dead.'
    },
    tacticalNotes: 'Prepares lethal battlefield ambushes with anti-armor claymores and high-caliber armor-piercing rounds.',
    matchupStrengths: ['Street Criminals', 'Unarmored Foes'],
    matchupWeaknesses: ['Invulnerable Gods', 'Superhuman Speedsters'],
    imageUrl: '/characters/punisher.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/530-punisher.jpg'
  },
  {
    id: 'green-goblin',
    name: 'Green Goblin',
    alterEgo: 'Norman Osborn',
    universe: 'MCU / Earth-616',
    role: 'Blaster',
    rarity: 'Epic',
    stats: { power: 83, strength: 82, speed: 84, durability: 80, combat: 84, range: 86, intelligence: 94 },
    specialAbilities: ['Goblin Glider Aerial Assault', 'Pumpkin Bombs / Razor Bats', 'Goblin Formula Super Strength', 'Psychological Warfare'],
    description: 'Crazed Oscorp industrialist soaring on a jet glider, dropping incendiary pumpkin bombs and gas attacks on foes.',
    visuals: {
      primaryColor: '#14532d',
      accentColor: '#7e22ce',
      badgeText: '🎃 GLIDER MENACE',
      comicQuote: 'Gods don’t have to choose. We take.'
    },
    tacticalNotes: 'Air superiority on his glider allows him to carpet-bomb ground targets while remaining out of melee reach.',
    matchupStrengths: ['Ground Brawlers', 'Unsuspecting Civilians'],
    matchupWeaknesses: ['Precise Marksmen', 'Spider-Sense Counters'],
    imageUrl: '/characters/green-goblin.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/299-green-goblin.jpg'
  }
,
  {
    id: 'blade',
    name: 'Blade',
    alterEgo: 'Eric Brooks',
    universe: 'Earth-616',
    role: 'Striker',
    rarity: 'Legendary',
    stats: { power: 88, strength: 82, speed: 85, durability: 84, combat: 96, range: 75, intelligence: 82 },
    specialAbilities: ['Daywalker Physiology', 'Adamantium Katana Flurry', 'Vampire Slayer Arsenal', 'Accelerated Healing'],
    description: 'The legendary half-human, half-immortal Daywalker armed with customized silver weaponry, master swordsmanship, and superhuman reflexes.',
    visuals: {
      primaryColor: '#831843',
      accentColor: '#dc2626',
      badgeText: '🗡️ THE DAYWALKER',
      comicQuote: 'Some motherf***ers are always trying to ice skate uphill.'
    },
    tacticalNotes: 'Lethal sword master with hypersonic reflexes and dark creature execution buffs. High sustained melee DPS.',
    matchupStrengths: ['Creatures', 'Undead', 'Infiltrators'],
    matchupWeaknesses: ['Cosmic Beings', 'Energy Cannons'],
    imageUrl: '/characters/blade.jpg',
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/112-blade.jpg'
  }
,
  {
    "id": "mister-fantastic",
    "name": "Mister Fantastic",
    "alterEgo": "Reed Richards",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 85,
      "strength": 72,
      "speed": 70,
      "durability": 88,
      "combat": 84,
      "range": 88,
      "intelligence": 100
    },
    "specialAbilities": [
      "Elastic Physiology",
      "Hyper-Genius Intellect",
      "Ultimate Nullifier Blueprint",
      "Molecular Compression"
    ],
    "description": "Leader of the Fantastic Four whose unmatched scientific intellect and malleable molecular body allow him to contort, stretch, and outthink any threat.",
    "visuals": {
      "primaryColor": "#1d4ed8",
      "accentColor": "#38bdf8",
      "badgeText": "🧪 STRETCH & SCIENCE",
      "comicQuote": "There is no problem that cannot be solved."
    },
    "tacticalNotes": "Unsurpassed tactical intelligence with extreme physical malleability that absorbs blunt impacts and traps opponents.",
    "matchupStrengths": [
      "Pure Brawlers",
      "Trap Planners",
      "Robots"
    ],
    "matchupWeaknesses": [
      "Extreme Cold",
      "High Magic"
    ],
    "imageUrl": "/characters/mister-fantastic.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/456-mister-fantastic.jpg"
  },
  {
    "id": "invisible-woman",
    "name": "Invisible Woman",
    "alterEgo": "Susan Storm-Richards",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 55,
      "speed": 75,
      "durability": 94,
      "combat": 78,
      "range": 90,
      "intelligence": 88
    },
    "specialAbilities": [
      "Force Field Projection",
      "Total Invisibility",
      "Internal Psionic Bubble",
      "Telekinetic Wave"
    ],
    "description": "Arguably the most powerful of the Fantastic Four, Sue Storm projects near-indestructible psionic force fields and turns herself and allies totally unseen.",
    "visuals": {
      "primaryColor": "#0284c7",
      "accentColor": "#e0f2fe",
      "badgeText": "🛡️ IMPENETRABLE AURA",
      "comicQuote": "You dont know what I can do."
    },
    "tacticalNotes": "Highest defensive shielding in the game capable of withstanding nuclear and cosmic blasts while manipulating invisible pressure fields.",
    "matchupStrengths": [
      "Blasters",
      "Explosives",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Sensory Tracking",
      "Matter Disintegration"
    ],
    "imageUrl": "/characters/invisible-woman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/344-invisible-woman.jpg"
  },
  {
    "id": "human-torch",
    "name": "Human Torch",
    "alterEgo": "Johnny Storm",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 90,
      "strength": 65,
      "speed": 92,
      "durability": 75,
      "combat": 75,
      "range": 92,
      "intelligence": 70
    },
    "specialAbilities": [
      "Flame On!",
      "Supernova Blast",
      "Plasma Flight",
      "Thermal Absorption"
    ],
    "description": "Hot-headed adventurer who cloaks himself in superheated plasma, flies at supersonic speeds, and unleashes supernova heat waves.",
    "visuals": {
      "primaryColor": "#ea580c",
      "accentColor": "#facc15",
      "badgeText": "🔥 FLAME ON!",
      "comicQuote": "FLAME ON!"
    },
    "tacticalNotes": "High aerial speed and fiery burst DPS capable of melting heavy armor and engulfing the battlefield in heat.",
    "matchupStrengths": [
      "Ice Users",
      "Armored Tanks",
      "Slow Foes"
    ],
    "matchupWeaknesses": [
      "Water Manipulation",
      "Sub-Zero Freezes"
    ],
    "imageUrl": "/characters/human-torch.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/333-human-torch.jpg"
  },
  {
    "id": "thing",
    "name": "The Thing",
    "alterEgo": "Benjamin Grimm",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 95,
      "speed": 65,
      "durability": 96,
      "combat": 85,
      "range": 60,
      "intelligence": 74
    },
    "specialAbilities": [
      "Clobberin Time!",
      "Rocky Exoskeleton",
      "Unstoppable Charge",
      "Seismic Ground Slam"
    ],
    "description": "The idol of millions coated in orange rocky hide, Ben Grimm boasts legendary brawling stamina and world-shattering punch strength.",
    "visuals": {
      "primaryColor": "#c2410c",
      "accentColor": "#fdba74",
      "badgeText": "🧱 IT'S CLOBBERIN TIME",
      "comicQuote": "It's clobberin' time!"
    },
    "tacticalNotes": "Unyielding granite armor and heavyweight knockout power. Can absorb direct hits from cosmic entities.",
    "matchupStrengths": [
      "Brawlers",
      "Swarm Units",
      "Energy Shockwaves"
    ],
    "matchupWeaknesses": [
      "Telepaths",
      "Matter Transmutation"
    ],
    "imageUrl": "/characters/thing.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/658-thing.jpg"
  },
  {
    "id": "professor-x",
    "name": "Professor X",
    "alterEgo": "Charles Xavier",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Cosmic",
    "stats": {
      "power": 98,
      "strength": 30,
      "speed": 50,
      "durability": 60,
      "combat": 60,
      "range": 100,
      "intelligence": 100
    },
    "specialAbilities": [
      "Omega Telepathy",
      "Mind Control",
      "Cerebro Amplification",
      "Psychic Paralysis"
    ],
    "description": "The world's foremost mutant telepath whose supreme mind can freeze armies in their tracks, alter memories, and shut down nervous systems globally.",
    "visuals": {
      "primaryColor": "#1e1b4b",
      "accentColor": "#38bdf8",
      "badgeText": "🧠 OMEGA TELEPATH",
      "comicQuote": "To me, my X-Men."
    },
    "tacticalNotes": "Unrivaled psionic shutdown. Can incapacitate opponents instantly through neural paralysis if protected from physical rushdown.",
    "matchupStrengths": [
      "Bruisers",
      "Low Willpower",
      "Giant Brutes"
    ],
    "matchupWeaknesses": [
      "Telepathic Helmets",
      "Synthetic AI"
    ],
    "imageUrl": "/characters/professor-x.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/527-professor-x.jpg"
  },
  {
    "id": "rogue",
    "name": "Rogue",
    "alterEgo": "Anna Marie",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 90,
      "speed": 85,
      "durability": 92,
      "combat": 86,
      "range": 70,
      "intelligence": 75
    },
    "specialAbilities": [
      "Power Absorption",
      "Life Drain Touch",
      "Superhuman Flight",
      "Stolen Invulnerability"
    ],
    "description": "Southern powerhouse mutant endowed with Ms. Marvel's flight and strength, plus the devastating ability to siphon the powers, memories, and lifeforce of anyone she touches.",
    "visuals": {
      "primaryColor": "#15803d",
      "accentColor": "#facc15",
      "badgeText": "🧤 POWER SIPHON",
      "comicQuote": "You touched the wrong girl, sugar."
    },
    "tacticalNotes": "Dangerous hybrid of frontline brute durability and game-changing ability theft against power-reliant enemies.",
    "matchupStrengths": [
      "Gods",
      "Meta-Humans",
      "Energy Conduit Foes"
    ],
    "matchupWeaknesses": [
      "Inorganic Robots",
      "Ranged Snipers"
    ],
    "imageUrl": "/characters/rogue.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/567-rogue.jpg"
  },
  {
    "id": "gambit",
    "name": "Gambit",
    "alterEgo": "Remy LeBeau",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 72,
      "speed": 88,
      "durability": 76,
      "combat": 92,
      "range": 85,
      "intelligence": 80
    },
    "specialAbilities": [
      "Kinetic Card Charging",
      "Bo Staff Mastery",
      "Explosive Deck Flurry",
      "Cajun Agility"
    ],
    "description": "Smooth-talking Cajun master thief who converts inanimate matter into charged kinetic explosives, wielding an adamantium bo staff and a deadly deck of cards.",
    "visuals": {
      "primaryColor": "#831843",
      "accentColor": "#f43f5e",
      "badgeText": "🃏 KINETIC ACE",
      "comicQuote": "Remember it, mon ami."
    },
    "tacticalNotes": "High burst kinetic DPS with exceptional evasion, mid-range explosive poke, and stylish bo staff martial arts.",
    "matchupStrengths": [
      "Slow Tanks",
      "Group Clusters",
      "Melee Fighters"
    ],
    "matchupWeaknesses": [
      "Energy Absorbers",
      "Heavy Armor"
    ],
    "imageUrl": "/characters/gambit.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/274-gambit.jpg"
  },
  {
    "id": "beast",
    "name": "Beast",
    "alterEgo": "Dr. Henry McCoy",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 82,
      "strength": 86,
      "speed": 84,
      "durability": 85,
      "combat": 88,
      "range": 60,
      "intelligence": 96
    },
    "specialAbilities": [
      "Feral Acrobatics",
      "Biochemical Mastery",
      "Superhuman Agility",
      "Prehensile Prowess"
    ],
    "description": "Brilliant geneticist and founding X-Man possessing blue fur, razor claws, superhuman ape-like athleticism, and polymath genius.",
    "visuals": {
      "primaryColor": "#1e3a8a",
      "accentColor": "#60a5fa",
      "badgeText": "🔬 BOUNCING BLUE BEAST",
      "comicQuote": "Oh, my stars and garters!"
    },
    "tacticalNotes": "Combines agile wall-crawling brawling with deep scientific analytical counters against exotic tech and biology.",
    "matchupStrengths": [
      "Infiltrators",
      "Ground Brawlers",
      "Mutant Tech"
    ],
    "matchupWeaknesses": [
      "Heavy Armor",
      "Cosmic Beams"
    ],
    "imageUrl": "/characters/beast.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/75-beast.jpg"
  },
  {
    "id": "psylocke",
    "name": "Psylocke",
    "alterEgo": "Betsy Braddock",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 65,
      "speed": 88,
      "durability": 75,
      "combat": 96,
      "range": 82,
      "intelligence": 82
    },
    "specialAbilities": [
      "Psionic Katana",
      "Telepathic Illusion",
      "Shadow Teleportation",
      "Psychic Butterfly Blast"
    ],
    "description": "Lethal ninja assassin wielding the focused totality of her psychic powers into incandescent energy blades that disrupt minds and sever flesh.",
    "visuals": {
      "primaryColor": "#581c87",
      "accentColor": "#c084fc",
      "badgeText": "🗡️ PSIONIC BLADE",
      "comicQuote": "The focused totality of my psychic powers."
    },
    "tacticalNotes": "Melee telepath who bypasses physical armor by stabbing directly into the psychic consciousness of adversaries.",
    "matchupStrengths": [
      "Armored Brutes",
      "Robots",
      "Brawlers"
    ],
    "matchupWeaknesses": [
      "Omega Telepaths",
      "Anti-Magic Forcefields"
    ],
    "imageUrl": "/characters/psylocke.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/529-psylocke.jpg"
  },
  {
    "id": "iceman",
    "name": "Iceman",
    "alterEgo": "Bobby Drake",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 70,
      "speed": 84,
      "durability": 92,
      "combat": 78,
      "range": 94,
      "intelligence": 76
    },
    "specialAbilities": [
      "Absolute Zero Freeze",
      "Ice Golem Form",
      "Sub-Zero Vaporize",
      "Thermal Depletion"
    ],
    "description": "Omega-level mutant capable of lowering thermal energy to absolute zero, transforming his body into organic moisture, and creating sprawling ice structures.",
    "visuals": {
      "primaryColor": "#0369a1",
      "accentColor": "#bae6fd",
      "badgeText": "❄️ ABSOLUTE ZERO",
      "comicQuote": "Chill out, folks."
    },
    "tacticalNotes": "Unstoppable battlefield freeze control. Can reform his entire body from ambient moisture if shattered.",
    "matchupStrengths": [
      "Fire Users",
      "Speedsters",
      "Brutes"
    ],
    "matchupWeaknesses": [
      "Cosmic Plasma",
      "Extreme Heat Inundation"
    ],
    "imageUrl": "/characters/iceman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/339-iceman.jpg"
  },
  {
    "id": "emma-frost",
    "name": "Emma Frost",
    "alterEgo": "White Queen",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 93,
      "strength": 88,
      "speed": 72,
      "durability": 95,
      "combat": 82,
      "range": 90,
      "intelligence": 94
    },
    "specialAbilities": [
      "Diamond Form Invulnerability",
      "Omega Telepathy",
      "Psychic Scalpel",
      "Mind Wipe"
    ],
    "description": "The aristocratic White Queen possessing two lethal mutations: world-class telepathic manipulation and an impervious organic diamond secondary form.",
    "visuals": {
      "primaryColor": "#334155",
      "accentColor": "#f8fafc",
      "badgeText": "💎 WHITE QUEEN",
      "comicQuote": "I am a diamond, darling."
    },
    "tacticalNotes": "Can switch seamlessly between mental domination at range and unbreakable physical diamond durability in melee.",
    "matchupStrengths": [
      "Physical Brawlers",
      "Psychic Beginners",
      "Tech Guns"
    ],
    "matchupWeaknesses": [
      "Cosmic Reality Warpers",
      "Extreme Diamond Flaws"
    ],
    "imageUrl": "/characters/emma-frost.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/241-emma-frost.jpg"
  },
  {
    "id": "mystique",
    "name": "Mystique",
    "alterEgo": "Raven Darkhölme",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 80,
      "strength": 68,
      "speed": 86,
      "durability": 78,
      "combat": 95,
      "range": 75,
      "intelligence": 92
    },
    "specialAbilities": [
      "Cellular Metamorphosis",
      "Martial Arts Mastery",
      "Infiltration Decoy",
      "Deadly Aim"
    ],
    "description": "Blue-skinned mutant shapeshifter capable of duplicating any human form, voice, and biometric signature with flawless tactical lethality.",
    "visuals": {
      "primaryColor": "#1e3a8a",
      "accentColor": "#ef4444",
      "badgeText": "🎭 SHAPESHIFTER",
      "comicQuote": "Mutant and proud."
    },
    "tacticalNotes": "Deceptive assassin that sows confusion, bypasses security, and strikes lethal nerve clusters when guards drop.",
    "matchupStrengths": [
      "Commanders",
      "Standard Soldiers",
      "Rely on Sight"
    ],
    "matchupWeaknesses": [
      "Scent Trackers",
      "Omega Telepaths"
    ],
    "imageUrl": "/characters/mystique.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/480-mystique.jpg"
  },
  {
    "id": "juggernaut",
    "name": "Juggernaut",
    "alterEgo": "Cain Marko",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 98,
      "speed": 78,
      "durability": 99,
      "combat": 84,
      "range": 55,
      "intelligence": 65
    },
    "specialAbilities": [
      "Unstoppable Momentum",
      "Crimson Cyttorak Shield",
      "Avalanche Slam",
      "Immunity to Telepathy"
    ],
    "description": "Empowered by the mystical Crimson Gem of Cyttorak, the Juggernaut is an unstoppable kinetic juggernaut whose forward march cannot be halted by any physical force.",
    "visuals": {
      "primaryColor": "#7c2d12",
      "accentColor": "#ea580c",
      "badgeText": "🛑 UNSTOPPABLE FORCE",
      "comicQuote": "I'm the Juggernaut, b***h!"
    },
    "tacticalNotes": "Absolute peak physical durability with momentum that breaks mountains and shields that ignore telepathy while wearing his helm.",
    "matchupStrengths": [
      "Physical Tanks",
      "Energy Walls",
      "Melee Teams"
    ],
    "matchupWeaknesses": [
      "Removing Helmet",
      "Dimensional Banishment"
    ],
    "imageUrl": "/characters/juggernaut.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/374-juggernaut.jpg"
  },
  {
    "id": "sabretooth",
    "name": "Sabretooth",
    "alterEgo": "Victor Creed",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 88,
      "speed": 86,
      "durability": 92,
      "combat": 92,
      "range": 50,
      "intelligence": 72
    },
    "specialAbilities": [
      "Apex Predator Senses",
      "Regenerative Healing Factor",
      "Adamantium Claws",
      "Primal Savagery"
    ],
    "description": "Brutal predatory mutant warrior and eternal arch-nemesis of Wolverine, gifted with vicious animalistic fury, healing factor, and razor fangs.",
    "visuals": {
      "primaryColor": "#78350f",
      "accentColor": "#f59e0b",
      "badgeText": "🐯 APEX PREDATOR",
      "comicQuote": "Nobody hurts you except me, runt."
    },
    "tacticalNotes": "Relentless feral brawler with accelerated healing that grinds opponents down through sheer bleeding brutality.",
    "matchupStrengths": [
      "Humanoid Fighters",
      "Infiltrators",
      "Close Combatants"
    ],
    "matchupWeaknesses": [
      "Flying Blasters",
      "Heavy Energy Cannons"
    ],
    "imageUrl": "/characters/sabretooth.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/570-sabretooth.jpg"
  },
  {
    "id": "apocalypse",
    "name": "Apocalypse",
    "alterEgo": "En Sabah Nur",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 98,
      "strength": 96,
      "speed": 82,
      "durability": 98,
      "combat": 94,
      "range": 95,
      "intelligence": 98
    },
    "specialAbilities": [
      "Celestial Techno-Morphing",
      "Matter Telekinesis",
      "Survival of the Fittest",
      "Apocalyptic Energy Beam"
    ],
    "description": "The ancient Egyptian mutant conqueror enhanced by Celestial technology, ruling with the immortal doctrine of the survival of the fittest.",
    "visuals": {
      "primaryColor": "#1e1b4b",
      "accentColor": "#38bdf8",
      "badgeText": "👑 FIRST MUTANT",
      "comicQuote": "I am the rocks of the eternal shore."
    },
    "tacticalNotes": "Near-immortal celestial biology paired with molecular self-reshaping and devastating apocalyptic energy discharge.",
    "matchupStrengths": [
      "Standard Mutants",
      "Tech Armor",
      "Street Level"
    ],
    "matchupWeaknesses": [
      "Celestial Weapons",
      "Phoenix Force"
    ],
    "imageUrl": "/characters/apocalypse.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/35-apocalypse.jpg"
  },
  {
    "id": "bishop",
    "name": "Bishop",
    "alterEgo": "Lucas Bishop",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 80,
      "speed": 78,
      "durability": 86,
      "combat": 90,
      "range": 90,
      "intelligence": 82
    },
    "specialAbilities": [
      "Energy Absorption & Redirection",
      "Concussive Discharge",
      "Futuristic Firearms",
      "Temporal Tracker"
    ],
    "description": "Time-displaced mutant police officer from a dystopian future who absorbs all forms of kinetic and radiant energy and blasts it back twofold.",
    "visuals": {
      "primaryColor": "#831843",
      "accentColor": "#dc2626",
      "badgeText": "⚡ ENERGY REDIRECT",
      "comicQuote": "Hit me with your best shot!"
    },
    "tacticalNotes": "Punishes energy blasters hard by drinking their lasers, plasma, and lightning to supercharge his own concussive counter-bursts.",
    "matchupStrengths": [
      "Energy Blasters",
      "Lightning Casters",
      "Plasma Guns"
    ],
    "matchupWeaknesses": [
      "Physical Chokeholds",
      "Poison Gas"
    ],
    "imageUrl": "/characters/bishop.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/92-bishop.jpg"
  },
  {
    "id": "x-23",
    "name": "X-23",
    "alterEgo": "Laura Kinney",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 89,
      "strength": 80,
      "speed": 92,
      "durability": 90,
      "combat": 97,
      "range": 50,
      "intelligence": 82
    },
    "specialAbilities": [
      "Adamantium Foot & Hand Claws",
      "Hyper-Accelerated Healing",
      "Trigger Scent Frenzy",
      "Stealth Execution"
    ],
    "description": "The genetic daughter of Logan possessing adamantium foot and hand claws, supersonic acrobatic speed, and Wolverine's lethal combat pedigree.",
    "visuals": {
      "primaryColor": "#0f172a",
      "accentColor": "#fbbf24",
      "badgeText": "🐾 TALONED SHADOW",
      "comicQuote": "I'm not a weapon. I'm Laura."
    },
    "tacticalNotes": "Faster and more agile than Wolverine, utilizing unexpected foot claw kicks to puncture heavy armor in close combat.",
    "matchupStrengths": [
      "Humanoid Brutes",
      "Shield Users",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Telekinesis",
      "Flying Snipers"
    ],
    "imageUrl": "/characters/x-23.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/723-x-23.jpg"
  },
  {
    "id": "jubilee",
    "name": "Jubilee",
    "alterEgo": "Jubilation Lee",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 52,
      "speed": 78,
      "durability": 68,
      "combat": 76,
      "range": 84,
      "intelligence": 74
    },
    "specialAbilities": [
      "Pyrotechnic Plasma Plasmoids",
      "Sub-Atomic Fireworks",
      "Energy Detonation",
      "Acrobatic Evasion"
    ],
    "description": "Mall-rat turned mutant heroine who generates multi-colored globules of explosive plasma energy resembling dazzling destructive fireworks.",
    "visuals": {
      "primaryColor": "#eab308",
      "accentColor": "#ec4899",
      "badgeText": "🎆 FIREWORK FRENZY",
      "comicQuote": "Does a mall babe eat chili fries?"
    },
    "tacticalNotes": "High blinding crowd control with plasma detonation that disorients and disrupts enemy precision aim.",
    "matchupStrengths": [
      "Swarm Units",
      "Stealth Fighters",
      "Sight-Reliant Foes"
    ],
    "matchupWeaknesses": [
      "Heavy Armor",
      "Vacuum Entities"
    ],
    "imageUrl": "/characters/jubilee.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/372-jubilee.jpg"
  },
  {
    "id": "banshee",
    "name": "Banshee",
    "alterEgo": "Sean Cassidy",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 85,
      "strength": 62,
      "speed": 82,
      "durability": 74,
      "combat": 80,
      "range": 92,
      "intelligence": 80
    },
    "specialAbilities": [
      "Sonic Scream",
      "Flight Propulsion",
      "Echolocation Pulse",
      "Auditory Liquefaction"
    ],
    "description": "Former Interpol inspector and veteran X-Man endowed with a mutant acoustic scream capable of shattering reinforced steel and propelling him through the air.",
    "visuals": {
      "primaryColor": "#15803d",
      "accentColor": "#facc15",
      "badgeText": "📢 SONIC SCREAM",
      "comicQuote": "Top of the morning to ye!"
    },
    "tacticalNotes": "Devastating sonic shockwaves that bypass physical shielding to cause concussive brain shock and liquefy defenses.",
    "matchupStrengths": [
      "Glass/Crystal Users",
      "Symbiotes",
      "Sensory Trackers"
    ],
    "matchupWeaknesses": [
      "Sound Dampeners",
      "Vacuum Battles"
    ],
    "imageUrl": "/characters/banshee.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/61-banshee.jpg"
  },
  {
    "id": "shadowcat",
    "name": "Shadowcat",
    "alterEgo": "Kitty Pryde",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 55,
      "speed": 82,
      "durability": 88,
      "combat": 90,
      "range": 55,
      "intelligence": 88
    },
    "specialAbilities": [
      "Quantum Phasing",
      "Electronics Disruption",
      "Lockheed Dragon Companion",
      "Intangible Riposte"
    ],
    "description": "Beloved mutant prodigy who can phase her atoms through solid matter, short-circuit high tech, and avoid every physical attack effortlessly.",
    "visuals": {
      "primaryColor": "#475569",
      "accentColor": "#f59e0b",
      "badgeText": "👻 QUANTUM PHASE",
      "comicQuote": "Professor Xavier is a jerk!"
    },
    "tacticalNotes": "Impervious to physical and energy strikes while phasing. Can slip inside enemy power armor to disable circuits instantly.",
    "matchupStrengths": [
      "Heavy Armor",
      "Robots",
      "Melee Tanks"
    ],
    "matchupWeaknesses": [
      "Energy Disrupters",
      "Mystic Magic"
    ],
    "imageUrl": "/characters/shadowcat.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/586-shadowcat.jpg"
  },
  {
    "id": "spider-gwen",
    "name": "Spider-Gwen",
    "alterEgo": "Gwen Stacy",
    "universe": "Earth-65",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 87,
      "strength": 82,
      "speed": 96,
      "durability": 80,
      "combat": 90,
      "range": 82,
      "intelligence": 84
    },
    "specialAbilities": [
      "Spider-Sense Instincts",
      "Venom Symbiote Reflexes",
      "Web Slinging Flurry",
      "Dimensional Web-Watch"
    ],
    "description": "Drummer, hero, and multiverse icon from Earth-65 who spins radioactive spider silk and outmaneuvers danger with flawless rhythm.",
    "visuals": {
      "primaryColor": "#0f172a",
      "accentColor": "#f43f5e",
      "badgeText": "🕷️ GHOST-SPIDER",
      "comicQuote": "Where I come from, the mask is about freedom."
    },
    "tacticalNotes": "Phenomenal evasive speed and aerial web traps that allow her to dance circles around sluggish bruisers.",
    "matchupStrengths": [
      "Sluggish Brawlers",
      "Snipers",
      "Trap Planners"
    ],
    "matchupWeaknesses": [
      "Area Sonic Blasts",
      "Wide Energy Webs"
    ],
    "imageUrl": "/characters/spider-gwen.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/619-spider-gwen.jpg"
  },
  {
    "id": "carnage",
    "name": "Carnage",
    "alterEgo": "Cletus Kasady",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 93,
      "speed": 90,
      "durability": 92,
      "combat": 90,
      "range": 85,
      "intelligence": 72
    },
    "specialAbilities": [
      "Symbiotic Tendril Web",
      "Lethal Weapon Morphing",
      "Bloodlust Frenzy",
      "Wall Crawling Slash"
    ],
    "description": "Psychopathic serial killer bonded with the spawn of the Venom symbiote, forming a crimson killing machine capable of morphing bladed weapons at will.",
    "visuals": {
      "primaryColor": "#991b1b",
      "accentColor": "#ef4444",
      "badgeText": "🩸 PURE CHAOS",
      "comicQuote": "Let there be Carnage!"
    },
    "tacticalNotes": "Unrestrained bloodthirsty aggression with regenerative symbiote armor and weapon-morphing tentacles.",
    "matchupStrengths": [
      "Street Level",
      "Swarm Units",
      "Standard Soldiers"
    ],
    "matchupWeaknesses": [
      "High Heat",
      "Sonic Disruptors"
    ],
    "imageUrl": "/characters/carnage.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/162-carnage.jpg"
  },
  {
    "id": "doctor-octopus",
    "name": "Doctor Octopus",
    "alterEgo": "Otto Octavius",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 88,
      "speed": 78,
      "durability": 86,
      "combat": 88,
      "range": 88,
      "intelligence": 98
    },
    "specialAbilities": [
      "Adamantium Tentacle Array",
      "Multitasking Combat AI",
      "Seismic Wall Climb",
      "Nuclear Physics Genius"
    ],
    "description": "Master scientist controlling four telepathically coordinated titanium-steel mechanical tentacles that move with blinding speed and crush steel.",
    "visuals": {
      "primaryColor": "#14532d",
      "accentColor": "#f97316",
      "badgeText": "🐙 MASTER PLANNER",
      "comicQuote": "The power of the sun, in the palm of my hand."
    },
    "tacticalNotes": "Controls the distance with four hyper-strong mechanical limbs capable of parrying strikes and tossing heavy vehicles.",
    "matchupStrengths": [
      "Spider Heroes",
      "Brawlers",
      "Single Target Foes"
    ],
    "matchupWeaknesses": [
      "EMP Bursts",
      "Speedsters"
    ],
    "imageUrl": "/characters/doctor-octopus.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/225-doctor-octopus.jpg"
  },
  {
    "id": "mysterio",
    "name": "Mysterio",
    "alterEgo": "Quentin Beck",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 55,
      "speed": 70,
      "durability": 72,
      "combat": 78,
      "range": 92,
      "intelligence": 92
    },
    "specialAbilities": [
      "Holographic Hypnosis",
      "Neurotoxin Smoke Screen",
      "Drone Swarm Illusions",
      "Mirror Reality Deception"
    ],
    "description": "Special effects illusionist extraordinaire who weaponizes hallucinogenic smoke, robotic drones, and holographic mirages to drive foes mad.",
    "visuals": {
      "primaryColor": "#064e3b",
      "accentColor": "#a855f7",
      "badgeText": "🔮 MASTER ILLUSIONIST",
      "comicQuote": "Now that's an illusion!"
    },
    "tacticalNotes": "Feeds false sensory data to opponents, forcing them to attack ghosts while hidden drones strike vital weak points.",
    "matchupStrengths": [
      "Pure Brawlers",
      "Visual Combatants",
      "Unwary Heroes"
    ],
    "matchupWeaknesses": [
      "Spider-Sense",
      "Blind Daredevil Instincts"
    ],
    "imageUrl": "/characters/mysterio.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/479-mysterio.jpg"
  },
  {
    "id": "sandman",
    "name": "Sandman",
    "alterEgo": "Flint Marko",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 90,
      "speed": 70,
      "durability": 95,
      "combat": 80,
      "range": 86,
      "intelligence": 68
    },
    "specialAbilities": [
      "Density Shifting Sandform",
      "Giant Sand Hammer",
      "Sandstorm Suffocation",
      "Elemental Reformation"
    ],
    "description": "Criminal whose body was transformed into living granular sand, granting him complete molecular shape-shifting, size expansion, and density control.",
    "visuals": {
      "primaryColor": "#78350f",
      "accentColor": "#fde047",
      "badgeText": "⏳ LIVING QUICKSAND",
      "comicQuote": "I'm not a bad person. Just had bad luck."
    },
    "tacticalNotes": "Conventional punches pass harmlessly through his sandform. Can grow into a towering sand titan to crush battlegrounds.",
    "matchupStrengths": [
      "Physical Strikers",
      "Bullets",
      "Piercing Weapons"
    ],
    "matchupWeaknesses": [
      "Water Floods",
      "Extreme Superheat Glassing"
    ],
    "imageUrl": "/characters/sandman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/572-sandman.jpg"
  },
  {
    "id": "kraven-the-hunter",
    "name": "Kraven the Hunter",
    "alterEgo": "Sergei Kravinoff",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 85,
      "strength": 82,
      "speed": 86,
      "durability": 84,
      "combat": 95,
      "range": 75,
      "intelligence": 86
    },
    "specialAbilities": [
      "Calypso Elixir Vitality",
      "Master Tracker Traps",
      "Spear & Knife CQC",
      "Nerve Strike Takedown"
    ],
    "description": "The world's greatest big-game hunter enhanced by mystical jungle potions that bestow superhuman strength, feline agility, and predatory instinct.",
    "visuals": {
      "primaryColor": "#7c2d12",
      "accentColor": "#eab308",
      "badgeText": "🏹 APEX HUNTER",
      "comicQuote": "Kraven does not hunt. Kraven claims."
    },
    "tacticalNotes": "Patient tracker who analyzes prey weaknesses, lays paralyzing traps, and strikes with fatal nerve precision.",
    "matchupStrengths": [
      "Beasts",
      "Feral Mutants",
      "Spider Heroes"
    ],
    "matchupWeaknesses": [
      "Cosmic Beings",
      "Heavy Armor Titans"
    ],
    "imageUrl": "/characters/kraven-the-hunter.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/395-kraven-the-hunter.jpg"
  },
  {
    "id": "kingpin",
    "name": "Kingpin",
    "alterEgo": "Wilson Fisk",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 82,
      "strength": 88,
      "speed": 68,
      "durability": 90,
      "combat": 94,
      "range": 50,
      "intelligence": 94
    },
    "specialAbilities": [
      "Brutal Underworld Brawling",
      "Solid Muscle Mass",
      "Obliterator Cane Laser",
      "Criminal Syndicate Ambush"
    ],
    "description": "Ruthless undisputed crimelord of New York City disguised beneath heavy suits as pure solid muscle with savage bare-knuckle wrestling dominance.",
    "visuals": {
      "primaryColor": "#1e293b",
      "accentColor": "#cbd5e1",
      "badgeText": "🕶️ CRIME OVERLORD",
      "comicQuote": "I am the city."
    },
    "tacticalNotes": "Massive crushing grip and bone-shattering bear hugs that overpower street vigilantes in tight quarters.",
    "matchupStrengths": [
      "Street Vigilantes",
      "Assassins",
      "Melee Scrappers"
    ],
    "matchupWeaknesses": [
      "Superhuman Speed",
      "Cosmic Firepower"
    ],
    "imageUrl": "/characters/kingpin.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/391-kingpin.jpg"
  },
  {
    "id": "bullseye",
    "name": "Bullseye",
    "alterEgo": "Lester",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 83,
      "strength": 70,
      "speed": 84,
      "durability": 78,
      "combat": 96,
      "range": 98,
      "intelligence": 82
    },
    "specialAbilities": [
      "Flawless Lethal Accuracy",
      "Adamantium-Laced Skeleton",
      "Improvised Shuriken Throw",
      "Mercenary Lethality"
    ],
    "description": "Psychopathic contract assassin who never misses, turning toothpicks, cards, paperclips, and shurikens into lethal armor-piercing projectiles.",
    "visuals": {
      "primaryColor": "#0f172a",
      "accentColor": "#38bdf8",
      "badgeText": "🎯 NEVER MISSES",
      "comicQuote": "I never miss."
    },
    "tacticalNotes": "Unmatched ranged pinpoint accuracy. Can ricochet lethal projectiles around corners to strike vital targets.",
    "matchupStrengths": [
      "Glass Cannons",
      "Unarmored Heroes",
      "Long Distance"
    ],
    "matchupWeaknesses": [
      "Force Fields",
      "Regenerative Tanks"
    ],
    "imageUrl": "/characters/bullseye.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/141-bullseye.jpg"
  },
  {
    "id": "lizard",
    "name": "The Lizard",
    "alterEgo": "Dr. Curtis Connors",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 90,
      "speed": 84,
      "durability": 90,
      "combat": 84,
      "range": 60,
      "intelligence": 88
    },
    "specialAbilities": [
      "Reptilian Regeneration",
      "Prehensile Tail Strike",
      "Predator Claws",
      "Cold-Blooded Ferocity"
    ],
    "description": "Tragic biologist mutated by reptilian DNA serum into a ferocious, scaly apex carnivore with regenerative limbs and primal strength.",
    "visuals": {
      "primaryColor": "#14532d",
      "accentColor": "#22c55e",
      "badgeText": "🦎 COLD-BLOODED TERROR",
      "comicQuote": "The mammal era is over!"
    },
    "tacticalNotes": "Savage close-range brawler with rapid limb regrowth and a whip-like tail that knocks foes off balance.",
    "matchupStrengths": [
      "Standard Humans",
      "Infiltrators",
      "Bruisers"
    ],
    "matchupWeaknesses": [
      "Extreme Cold",
      "Sonic Disruptors"
    ],
    "imageUrl": "/characters/lizard.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/412-lizard.jpg"
  },
  {
    "id": "rhino",
    "name": "Rhino",
    "alterEgo": "Aleksei Sytsevich",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 87,
      "strength": 94,
      "speed": 76,
      "durability": 95,
      "combat": 78,
      "range": 50,
      "intelligence": 60
    },
    "specialAbilities": [
      "Polymer Rhino Armor",
      "Gore Horn Charge",
      "Earthquake Stomp",
      "Unstoppable Momentum"
    ],
    "description": "Soviet mob enforcer permanently grafted into a thick, nearly impenetrable polymer rhino suit, bulldozing through banks and concrete skyscrapers.",
    "visuals": {
      "primaryColor": "#475569",
      "accentColor": "#94a3b8",
      "badgeText": "🦏 BULLETPROOF JUGGERNAUT",
      "comicQuote": "Nothing stops the Rhino!"
    },
    "tacticalNotes": "Devastating linear ramming speed that demolishes barriers and crushes combatants into paste.",
    "matchupStrengths": [
      "Unarmored Fighters",
      "Light Tanks",
      "Brawlers"
    ],
    "matchupWeaknesses": [
      "Acrobatic Trappers",
      "Mind Controllers"
    ],
    "imageUrl": "/characters/rhino.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/556-rhino.jpg"
  },
  {
    "id": "vulture",
    "name": "Vulture",
    "alterEgo": "Adrian Toomes",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 68,
      "speed": 90,
      "durability": 76,
      "combat": 78,
      "range": 85,
      "intelligence": 88
    },
    "specialAbilities": [
      "Electromagnetic Flight Harness",
      "Razor-Sharp Wing Blades",
      "Divebomb Talons",
      "Scavenger Aerial Ambush"
    ],
    "description": "Ingenious electronic engineer who built an electromagnetic flight suit with razor-sharp wings, terrorizing skies with predatory aerial ambushes.",
    "visuals": {
      "primaryColor": "#14532d",
      "accentColor": "#84cc16",
      "badgeText": "🦅 AERIAL SCAVENGER",
      "comicQuote": "The world's changing, boy. Time we change too."
    },
    "tacticalNotes": "Uses verticality and high-speed divebombs to hit and run before grounded combatants can react.",
    "matchupStrengths": [
      "Grounded Tanks",
      "Slow Brawlers"
    ],
    "matchupWeaknesses": [
      "Web Trappers",
      "Homing Missiles"
    ],
    "imageUrl": "/characters/vulture.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/701-vulture.jpg"
  },
  {
    "id": "black-cat",
    "name": "Black Cat",
    "alterEgo": "Felicia Hardy",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 78,
      "strength": 65,
      "speed": 88,
      "durability": 72,
      "combat": 88,
      "range": 70,
      "intelligence": 84
    },
    "specialAbilities": [
      "Bad Luck Probability Hex",
      "Cat Burglar Agility",
      "Grappling Claw Mastery",
      "Acrobatic Counter"
    ],
    "description": "Glamorous master cat burglar blessed with the subconscious ability to project bad luck onto her adversaries during high-stakes heists.",
    "visuals": {
      "primaryColor": "#0f172a",
      "accentColor": "#f1f5f9",
      "badgeText": "🐾 BAD LUCK JINX",
      "comicQuote": "You know you're unlucky when I cross your path."
    },
    "tacticalNotes": "Forces enemy weapons to misfire, gadgets to jam, and footing to slip while she maneuvers for a decisive coup de grace.",
    "matchupStrengths": [
      "Precision Shooters",
      "Complex Tech",
      "Single Duelists"
    ],
    "matchupWeaknesses": [
      "Giant Monsters",
      "Area AoE Blasters"
    ],
    "imageUrl": "/characters/black-cat.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/99-black-cat.jpg"
  },
  {
    "id": "silk",
    "name": "Silk",
    "alterEgo": "Cindy Moon",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 80,
      "speed": 96,
      "durability": 78,
      "combat": 88,
      "range": 84,
      "intelligence": 82
    },
    "specialAbilities": [
      "Hyper-Attuned Silk-Sense",
      "Organic Spinneret Weaving",
      "Barbed Web Claws",
      "Supersonic Reflexes"
    ],
    "description": "Bitten by the very same radioactive spider as Peter Parker, Cindy Moon possesses an even faster spider-sense and organic silk spinning from her fingertips.",
    "visuals": {
      "primaryColor": "#1e1b4b",
      "accentColor": "#38bdf8",
      "badgeText": "🕸️ SILK SPINNER",
      "comicQuote": "My spider-sense feels everything."
    },
    "tacticalNotes": "Unrivaled early-warning threat detection and instant organic cocoon traps that paralyze speedsters.",
    "matchupStrengths": [
      "Sneak Attacks",
      "Speedsters",
      "Trap Makers"
    ],
    "matchupWeaknesses": [
      "Sonic Explosions",
      "Heavy Armor Brawlers"
    ],
    "imageUrl": "/characters/silk.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/595-silk.jpg"
  },
  {
    "id": "galactus",
    "name": "Galactus",
    "alterEgo": "Galan of Taa",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Cosmic",
    "stats": {
      "power": 100,
      "strength": 100,
      "speed": 95,
      "durability": 100,
      "combat": 95,
      "range": 100,
      "intelligence": 100
    },
    "specialAbilities": [
      "Power Cosmic Incarnate",
      "Planetary Energy Consumption",
      "Herald Bestowal",
      "Dimensional Obliteration"
    ],
    "description": "The ancient Devourer of Worlds, a cosmic force of nature standing between creation and oblivion whose hunger consumes entire civilizations.",
    "visuals": {
      "primaryColor": "#581c87",
      "accentColor": "#ec4899",
      "badgeText": "🌌 DEVOURER OF WORLDS",
      "comicQuote": "I hunger!"
    },
    "tacticalNotes": "Absolute ultimate endgame titan with universe-rending Power Cosmic blasts and unassailable durability.",
    "matchupStrengths": [
      "Planetary Beings",
      "Mortal Heroes",
      "Armies"
    ],
    "matchupWeaknesses": [
      "Ultimate Nullifier",
      "Starvation"
    ],
    "imageUrl": "/characters/galactus.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/273-galactus.jpg"
  },
  {
    "id": "warlock",
    "name": "Adam Warlock",
    "alterEgo": "Him",
    "universe": "Earth-616",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 96,
      "strength": 92,
      "speed": 94,
      "durability": 95,
      "combat": 92,
      "range": 95,
      "intelligence": 94
    },
    "specialAbilities": [
      "Quantum Magic Channeling",
      "Karmic Blast",
      "Cocoon Rebirth Regeneration",
      "Soul Gem Synchronization"
    ],
    "description": "The genetically engineered pinnacle of human evolution, champion of cosmic balance, and master of quantum magic and soul sovereignty.",
    "visuals": {
      "primaryColor": "#b45309",
      "accentColor": "#fde047",
      "badgeText": "✨ COSMIC AVATAR",
      "comicQuote": "I am the avatar of life."
    },
    "tacticalNotes": "Balances heavy quantum energy strikes with miraculous cocoon resurrection if mortally wounded.",
    "matchupStrengths": [
      "Cosmic Conquerors",
      "Soul Manipulators",
      "Dark Magic"
    ],
    "matchupWeaknesses": [
      "Emotional Instability",
      "Magus Persona"
    ],
    "imageUrl": "/characters/warlock.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/705-warlock.jpg"
  },
  {
    "id": "dormammu",
    "name": "Dormammu",
    "alterEgo": "Lord of the Dark Dimension",
    "universe": "Earth-616",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 99,
      "strength": 95,
      "speed": 88,
      "durability": 99,
      "combat": 92,
      "range": 100,
      "intelligence": 98
    },
    "specialAbilities": [
      "Fumes of the Dark Dimension",
      "Hellfire Pyrokinesis",
      "Reality Distortion Field",
      "Astral Annihilation"
    ],
    "description": "Supreme primordial conqueror and eternal ruler of the Dark Dimension, burning with pure apocalyptic mystic hellfire.",
    "visuals": {
      "primaryColor": "#7f1d1d",
      "accentColor": "#f97316",
      "badgeText": "🔥 DARK DIMENSION TYRANT",
      "comicQuote": "Your world is now my world!"
    },
    "tacticalNotes": "Crushes mortal sorcery through boundless dimensional fire and reality-swallowing cosmic malice.",
    "matchupStrengths": [
      "Sorcerers",
      "Physical Brutes",
      "Mortal Armies"
    ],
    "matchupWeaknesses": [
      "Time Loops",
      "Eternity Wards"
    ],
    "imageUrl": "/characters/dormammu.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/232-dormammu.jpg"
  },
  {
    "id": "mephisto",
    "name": "Mephisto",
    "alterEgo": "Lord of Hell",
    "universe": "Earth-616",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 97,
      "strength": 88,
      "speed": 82,
      "durability": 96,
      "combat": 88,
      "range": 98,
      "intelligence": 99
    },
    "specialAbilities": [
      "Infernal Soul Manipulation",
      "Hellfire Incineration",
      "Faustian Reality Pact",
      "Shape-Shifting Sorcery"
    ],
    "description": "Ancient extra-dimensional demon lord presiding over a fiery nether-realm, trafficking in mortal souls and weaving unbreakable cosmic contracts.",
    "visuals": {
      "primaryColor": "#450a0a",
      "accentColor": "#dc2626",
      "badgeText": "😈 INFERNAL DECEIVER",
      "comicQuote": "Every bargain has its price."
    },
    "tacticalNotes": "Manipulates luck, twists opponent perceptions, and unleashes suffocating brimstone hellfire.",
    "matchupStrengths": [
      "Vulnerable Souls",
      "Brawlers",
      "Prideful Foes"
    ],
    "matchupWeaknesses": [
      "Pure Divine Light",
      "Holy Artifacts"
    ],
    "imageUrl": "/characters/mephisto.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/443-mephisto.jpg"
  },
  {
    "id": "sentry",
    "name": "The Sentry",
    "alterEgo": "Robert Reynolds",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 100,
      "strength": 100,
      "speed": 98,
      "durability": 100,
      "combat": 90,
      "range": 96,
      "intelligence": 85
    },
    "specialAbilities": [
      "Power of a Million Exploding Suns",
      "Molecular Disintegration",
      "Invulnerable Flesh",
      "Void Manifestation"
    ],
    "description": "Golden Guardian of Good blessed with the power of a million exploding suns, shadowed by the cosmic terror of his dark alter-ego, The Void.",
    "visuals": {
      "primaryColor": "#ca8a04",
      "accentColor": "#fde047",
      "badgeText": "☀️ MILLION EXPLODING SUNS",
      "comicQuote": "It's time to play God."
    },
    "tacticalNotes": "Unsurpassed god-tier brute strength and molecular manipulation that can tear gods in half effortlessly.",
    "matchupStrengths": [
      "Tanks",
      "Cosmic Gods",
      "Heavy Fleets"
    ],
    "matchupWeaknesses": [
      "Psychological Trauma",
      "Void Takeover"
    ],
    "imageUrl": "/characters/sentry.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/583-sentry.jpg"
  },
  {
    "id": "nova",
    "name": "Nova",
    "alterEgo": "Richard Rider",
    "universe": "Earth-616",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 93,
      "strength": 90,
      "speed": 96,
      "durability": 92,
      "combat": 88,
      "range": 94,
      "intelligence": 84
    },
    "specialAbilities": [
      "Nova Force Gravimetric Blast",
      "FTL Hyperspace Flight",
      "Centurion Force Field",
      "Worldmind Strategic Link"
    ],
    "description": "Nova Prime channeling the entire Xandarian Worldmind and Nova Force into devastating gravimetric beams and faster-than-light combat flight.",
    "visuals": {
      "primaryColor": "#1e3a8a",
      "accentColor": "#facc15",
      "badgeText": "🚀 THE HUMAN ROCKET",
      "comicQuote": "Blue blazes!"
    },
    "tacticalNotes": "High-speed kinetic torpedo strikes paired with tactical computer calculations from the Xandarian Worldmind.",
    "matchupStrengths": [
      "Armored Ships",
      "Alien Invaders",
      "Energy Users"
    ],
    "matchupWeaknesses": [
      "Gravimetric Disruptors",
      "Mental Overload"
    ],
    "imageUrl": "/characters/nova.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/496-nova.jpg"
  },
  {
    "id": "kang",
    "name": "Kang the Conqueror",
    "alterEgo": "Nathaniel Richards",
    "universe": "Earth-616",
    "role": "Tactician",
    "rarity": "Cosmic",
    "stats": {
      "power": 95,
      "strength": 80,
      "speed": 85,
      "durability": 92,
      "combat": 92,
      "range": 96,
      "intelligence": 100
    },
    "specialAbilities": [
      "Chrono-Displacement Arsenal",
      "40th Century Force Field",
      "Temporal Variant Summoning",
      "Timeline Erasure Weapon"
    ],
    "description": "Master of time and conqueror of countless eras, equipped with 40th-century future tech, battle armor, and chrono-kinetic weaponry.",
    "visuals": {
      "primaryColor": "#065f46",
      "accentColor": "#a855f7",
      "badgeText": "⌛ CONQUEROR OF TIME",
      "comicQuote": "I have won. I have always won."
    },
    "tacticalNotes": "Summons temporal paradoxes and weaponry from any era in history to counter whatever strategy the opponent brings.",
    "matchupStrengths": [
      "Linear Heroes",
      "Ground Brawlers",
      "Predictable Foes"
    ],
    "matchupWeaknesses": [
      "Temporal Anomalies",
      "Chaos Magic"
    ],
    "imageUrl": "/characters/kang.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/379-kang.jpg"
  },
  {
    "id": "beta-ray-bill",
    "name": "Beta Ray Bill",
    "alterEgo": "Bill of Korbin",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 96,
      "speed": 82,
      "durability": 95,
      "combat": 90,
      "range": 90,
      "intelligence": 76
    },
    "specialAbilities": [
      "Stormbreaker Godhammer",
      "Korbinite Cyber-Enhancement",
      "Divine Lightning Cascade",
      "Warrior Honor Ferocity"
    ],
    "description": "Equine-featured cybernetic champion of the Korbinites deemed worthy to lift Mjolnir, granted his own mystical warhammer, Stormbreaker, by Odin himself.",
    "visuals": {
      "primaryColor": "#b45309",
      "accentColor": "#38bdf8",
      "badgeText": "⚡ KORBINITE CHAMPION",
      "comicQuote": "If there is one thing I have, it is honor."
    },
    "tacticalNotes": "Matches Thor in raw divine lightning, storm-cleaving hammer swings, and cybernetic alien resilience.",
    "matchupStrengths": [
      "Demon Hordes",
      "Heavy Tanks",
      "Alien Fleets"
    ],
    "matchupWeaknesses": [
      "Reality Warpers",
      "Mind Manipulation"
    ],
    "imageUrl": "/characters/beta-ray-bill.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/79-beta-ray-bill.jpg"
  },
  {
    "id": "odin",
    "name": "Odin",
    "alterEgo": "Odin Borson",
    "universe": "Earth-616",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 99,
      "strength": 95,
      "speed": 80,
      "durability": 98,
      "combat": 96,
      "range": 98,
      "intelligence": 100
    },
    "specialAbilities": [
      "The Odinforce",
      "Gungnir Spear of Destiny",
      "Asgardian Galaxy Blast",
      "Universal Magic Weaving"
    ],
    "description": "The ancient All-Father of Asgard, lord of divine wisdom and wielder of the boundless Odinforce capable of restructuring galaxies.",
    "visuals": {
      "primaryColor": "#854d0e",
      "accentColor": "#eab308",
      "badgeText": "👑 ASGARDIAN ALL-FATHER",
      "comicQuote": "I am the All-Father. I know all!"
    },
    "tacticalNotes": "Commands reality-bending divine power that dwarfs standard godhood, shattering stellar threats with Gungnir.",
    "matchupStrengths": [
      "Demons",
      "Armies",
      "Cosmic Invaders"
    ],
    "matchupWeaknesses": [
      "The Odinsleep",
      "Celestials"
    ],
    "imageUrl": "/characters/odin.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/498-odin.jpg"
  },
  {
    "id": "annihilus",
    "name": "Annihilus",
    "alterEgo": "Lord of the Negative Zone",
    "universe": "Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 92,
      "speed": 88,
      "durability": 94,
      "combat": 90,
      "range": 92,
      "intelligence": 90
    },
    "specialAbilities": [
      "Cosmic Control Rod",
      "Annihilation Wave Command",
      "Sub-Atomic Exoskeleton",
      "Negative Zone Energy Lance"
    ],
    "description": "The paranoid, insectoid tyrant of the Negative Zone who wields the Cosmic Control Rod to command endless swarms of ravenous starships.",
    "visuals": {
      "primaryColor": "#14532d",
      "accentColor": "#a855f7",
      "badgeText": "🦗 ANNIHILATION LORD",
      "comicQuote": "Nothing shall live!"
    },
    "tacticalNotes": "Wields the Cosmic Control Rod for near-limitless energy projection and cellular immortality.",
    "matchupStrengths": [
      "Biological Armies",
      "Positronic Shields"
    ],
    "matchupWeaknesses": [
      "Disarming Control Rod",
      "Sub-Zero Freeze"
    ],
    "imageUrl": "/characters/annihilus.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/29-annihilus.jpg"
  },
  {
    "id": "drax",
    "name": "Drax the Destroyer",
    "alterEgo": "Arthur Douglas",
    "universe": "MCU / Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 90,
      "strength": 94,
      "speed": 78,
      "durability": 96,
      "combat": 94,
      "range": 55,
      "intelligence": 70
    },
    "specialAbilities": [
      "Dual Dagger Berserker Slashing",
      "Titan Slayer Resilience",
      "Invisibility Camouflage",
      "Unrelenting Rage"
    ],
    "description": "Genetically engineered warrior forged with a singular driving purpose: hunt down, dismember, and destroy Thanos and his cosmic forces.",
    "visuals": {
      "primaryColor": "#1e3a8a",
      "accentColor": "#ef4444",
      "badgeText": "🗡️ THE DESTROYER",
      "comicQuote": "I have mastered the ability of standing so incredibly still..."
    },
    "tacticalNotes": "Unstoppable brawling constitution that grows more dangerous as the battle grinds on against heavyweight titans.",
    "matchupStrengths": [
      "Cosmic Titans",
      "Brawlers",
      "Melee Bosses"
    ],
    "matchupWeaknesses": [
      "Metaphors",
      "Psionic Illusions"
    ],
    "imageUrl": "/characters/drax.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/234-drax-the-destroyer.jpg"
  },
  {
    "id": "nebula",
    "name": "Nebula",
    "alterEgo": "Luphomoid Assassin",
    "universe": "MCU / Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 85,
      "strength": 82,
      "speed": 88,
      "durability": 88,
      "combat": 92,
      "range": 80,
      "intelligence": 86
    },
    "specialAbilities": [
      "Cybernetic Nanite Reconstruction",
      "Electro-Shock Batons",
      "Cyber-Arm Blaster Cannon",
      "Ruthless Assassin Drive"
    ],
    "description": "Fierce cybernetically augmented Luphomoid assassin whose shattered body has been rebuilt with military cyberware, making her nearly impossible to kill.",
    "visuals": {
      "primaryColor": "#0f766e",
      "accentColor": "#38bdf8",
      "badgeText": "🤖 CYBERNETIC ASSASSIN",
      "comicQuote": "I am a woman of many talents."
    },
    "tacticalNotes": "Nanite self-repair allows her to snap dislocated limbs and shattered plating back into place mid-fight.",
    "matchupStrengths": [
      "Assassins",
      "Melee Duelists",
      "Foot Soldiers"
    ],
    "matchupWeaknesses": [
      "EMP Overload",
      "Cosmic Energy Cleaves"
    ],
    "imageUrl": "/characters/nebula.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/487-nebula.jpg"
  },
  {
    "id": "wasp",
    "name": "Wasp",
    "alterEgo": "Hope van Dyne",
    "universe": "MCU / Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 65,
      "speed": 94,
      "durability": 74,
      "combat": 88,
      "range": 88,
      "intelligence": 88
    },
    "specialAbilities": [
      "Sub-Atomic Flight",
      "Bio-Electric Stinger Blasts",
      "Quantum Disruption Blades",
      "Pym Particle Shrink-Punch"
    ],
    "description": "Expert martial artist and physicist armed with winged Pym particle technology, shrinking to microscopic size and blasting foes with high-voltage stingers.",
    "visuals": {
      "primaryColor": "#78350f",
      "accentColor": "#facc15",
      "badgeText": "🐝 WINGED STINGER",
      "comicQuote": "It's about damn time."
    },
    "tacticalNotes": "Supersonic hit-and-run evasion that weaves between gunfire before expanding to deliver full-mass kinetic strikes.",
    "matchupStrengths": [
      "Heavy Tanks",
      "Slow Brawlers",
      "Snipers"
    ],
    "matchupWeaknesses": [
      "AoE Energy Waves",
      "Insecticide Toxins"
    ],
    "imageUrl": "/characters/wasp.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/708-wasp.jpg"
  },
  {
    "id": "kate-bishop",
    "name": "Kate Bishop",
    "alterEgo": "Hawkeye",
    "universe": "MCU / Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 82,
      "strength": 64,
      "speed": 82,
      "durability": 74,
      "combat": 90,
      "range": 96,
      "intelligence": 86
    },
    "specialAbilities": [
      "Trick Arrow Trickshot Arsenal",
      "Acrobatic Precision Evasion",
      "Close-Quarters Bow Fu",
      "Rapid EMP Disabler"
    ],
    "description": "Young champion archer and protégé of Clint Barton, wielding world-class archery trickshots, rapid-fire EMPs, and fencing agility.",
    "visuals": {
      "primaryColor": "#581c87",
      "accentColor": "#c084fc",
      "badgeText": "🏹 TRICKSHOT ARCHER",
      "comicQuote": "I'm Kate Bishop. And I don't miss either."
    },
    "tacticalNotes": "Versatile quiver packed with specialized trick arrows (acid, putty, EMP, flashbang) to neutralize any opposing advantage.",
    "matchupStrengths": [
      "Robots",
      "Unarmored Brawlers",
      "Flying Foes"
    ],
    "matchupWeaknesses": [
      "Heavy Armor Titans",
      "Speed Blitzers"
    ],
    "imageUrl": "/characters/kate-bishop.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/314-hawkeye-ii.jpg"
  },
  {
    "id": "taskmaster",
    "name": "Taskmaster",
    "alterEgo": "Tony Masters",
    "universe": "Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 78,
      "speed": 86,
      "durability": 82,
      "combat": 99,
      "range": 85,
      "intelligence": 92
    },
    "specialAbilities": [
      "Photographic Reflexes Mimicry",
      "Vibranium Shield Ricochet",
      "Broadsword Blade Dance",
      "Predictive Combat Counter"
    ],
    "description": "Skull-faced mercenary endowed with photographic reflexes, instantly duplicating the fighting styles of Captain America, Hawkeye, Black Panther, and Spider-Man upon sight.",
    "visuals": {
      "primaryColor": "#1e293b",
      "accentColor": "#f97316",
      "badgeText": "⚔️ MIMICRY MASTER",
      "comicQuote": "I can do anything you can do."
    },
    "tacticalNotes": "Nearly impossible to hit with standard martial moves; predicts and parries attacks by using the opponent's own style against them.",
    "matchupStrengths": [
      "Martial Artists",
      "Shield Users",
      "Swordsmen"
    ],
    "matchupWeaknesses": [
      "Deadpool (Unpredictable)",
      "Raw Energy Overload"
    ],
    "imageUrl": "/characters/taskmaster.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/653-taskmaster.jpg"
  },
  {
    "id": "abomination",
    "name": "Abomination",
    "alterEgo": "Emil Blonsky",
    "universe": "MCU / Earth-616",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 93,
      "strength": 97,
      "speed": 72,
      "durability": 98,
      "combat": 86,
      "range": 60,
      "intelligence": 72
    },
    "specialAbilities": [
      "Gamma Mutation Monstrosity",
      "Sonic Thunderclap",
      "Armor-Plated Bone Spikes",
      "Devastating Ground Pound"
    ],
    "description": "Former special-ops commando injected with super-soldier serum and gamma radiation, mutating into a monstrous reptile-like behemoth as strong as the Hulk.",
    "visuals": {
      "primaryColor": "#365314",
      "accentColor": "#84cc16",
      "badgeText": "☣️ GAMMA MONSTER",
      "comicQuote": "Give me a real fight!"
    },
    "tacticalNotes": "Permanent monstrous strength that does not rely on anger spikes; fortified with external bone plates and deafening sonic claps.",
    "matchupStrengths": [
      "Physical Tanks",
      "Standard Heroes",
      "Street Level"
    ],
    "matchupWeaknesses": [
      "Telepaths",
      "Matter Disintegration"
    ],
    "imageUrl": "/characters/abomination.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/4-abomination.jpg"
  },
  {
    "id": "red-skull",
    "name": "Red Skull",
    "alterEgo": "Johann Schmidt",
    "universe": "MCU / Earth-616",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 80,
      "speed": 76,
      "durability": 84,
      "combat": 92,
      "range": 88,
      "intelligence": 96
    },
    "specialAbilities": [
      "Dust of Death Gas",
      "Super Soldier Serum Body",
      "Hydra Tactical Command",
      "Tesseract Energy Gun"
    ],
    "description": "The monstrous founder of HYDRA and mortal arch-nemesis of Captain America, driven by fascist megalomania, super-soldier strength, and occult artifacts.",
    "visuals": {
      "primaryColor": "#450a0a",
      "accentColor": "#ef4444",
      "badgeText": "💀 HYDRA SUPREME",
      "comicQuote": "Cut off one head, two more shall take its place!"
    },
    "tacticalNotes": "Cold calculated ruthlessness backed by advanced energy firearms and lethal respiratory Dust of Death poisons.",
    "matchupStrengths": [
      "Patriotic Soldiers",
      "Standard Infantry",
      "Infiltrators"
    ],
    "matchupWeaknesses": [
      "Hulk-Tier Brutes",
      "Cosmic Sorcerers"
    ],
    "imageUrl": "/characters/red-skull.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/550-red-skull.jpg"
  }
];

export const DC_CHARACTERS: Character[] = [
  {
    "id": "superman",
    "name": "Superman",
    "alterEgo": "Clark Kent / Kal-El",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 99,
      "strength": 100,
      "speed": 96,
      "durability": 99,
      "combat": 85,
      "range": 92,
      "intelligence": 88
    },
    "specialAbilities": [
      "Solar Overcharge",
      "Heat Vision Sweep",
      "Super Breath Freeze",
      "Man of Steel Aegis"
    ],
    "description": "The archetype of all superheroes. Kal-El of Krypton possesses godlike physical strength, invulnerability, flight, and heat vision energized by Earth's yellow sun.",
    "visuals": {
      "primaryColor": "#0047AB",
      "accentColor": "#DC143C",
      "badgeText": "🛡️ MAN OF STEEL",
      "comicQuote": "There is a superhero in all of us, we just need the courage to put on the cape."
    },
    "tacticalNotes": "Near-infinite durability and astronomical physical power. Devastates bruisers and blasters, but vulnerable to magical attacks.",
    "matchupStrengths": [
      "Pure Brawlers",
      "Blasters",
      "Tech Weapons"
    ],
    "matchupWeaknesses": [
      "Cosmic Sorcerers",
      "Reality Manipulation",
      "Kryptonite / Magic"
    ],
    "imageUrl": "/characters/superman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg"
  },
  {
    "id": "darkseid",
    "name": "Darkseid",
    "alterEgo": "Uxas of Apokolips",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 98,
      "strength": 99,
      "speed": 78,
      "durability": 98,
      "combat": 92,
      "range": 97,
      "intelligence": 95
    },
    "specialAbilities": [
      "Omega Beams",
      "Anti-Life Equation",
      "Apokoliptian Crushing Grip",
      "Dimensional Disintegration"
    ],
    "description": "The tyrannical god-ruler of Apokolips whose zigzagging Omega Beams disintegrate or transmute matter at will. He seeks the Anti-Life Equation to subjugate all sentient will.",
    "visuals": {
      "primaryColor": "#36454F",
      "accentColor": "#FF4500",
      "badgeText": "👁️ LORD OF APOKOLIPS",
      "comicQuote": "I am the tiger-force at the core of all things. I am Darkseid."
    },
    "tacticalNotes": "Homing Omega Beams bypass traditional cover, while stone-like physiology shrugs off planetary impacts.",
    "matchupStrengths": [
      "Speedsters",
      "Brutes",
      "Tech Armor"
    ],
    "matchupWeaknesses": [
      "Reality Warpers",
      "Source Manipulation"
    ],
    "imageUrl": "/characters/darkseid.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/204-darkseid.jpg"
  },
  {
    "id": "doomsday",
    "name": "Doomsday",
    "alterEgo": "The Ultimate Destroyer",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 97,
      "strength": 99,
      "speed": 80,
      "durability": 99,
      "combat": 86,
      "range": 60,
      "intelligence": 55
    },
    "specialAbilities": [
      "Adaptive Regeneration",
      "Bone Spike Impalement",
      "Apocalyptic Rage",
      "Invulnerable Carapace"
    ],
    "description": "Genetically engineered on prehistoric Krypton to be the ultimate killing machine. Doomsday literally cannot be killed the same way twice, continually adapting to defeat any foe.",
    "visuals": {
      "primaryColor": "#4A5568",
      "accentColor": "#E2E8F0",
      "badgeText": "💀 THE MONSTER WHO KILLED SUPERMAN",
      "comicQuote": "DOOM."
    },
    "tacticalNotes": "Gains resistance to whatever damaged him last turn. Overwhelming frontline juggernaut.",
    "matchupStrengths": [
      "Melee Bruisers",
      "Physical Strikers",
      "Kinetic Attackers"
    ],
    "matchupWeaknesses": [
      "Mental Domination",
      "Banishment",
      "Dimensional Traps"
    ],
    "imageUrl": "/characters/doomsday.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/230-doomsday.jpg"
  },
  {
    "id": "bane",
    "name": "Bane",
    "alterEgo": "Antonio Diego",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 89,
      "speed": 68,
      "durability": 88,
      "combat": 91,
      "range": 45,
      "intelligence": 89
    },
    "specialAbilities": [
      "Venom Injection",
      "Backbreaker Slam",
      "Tactical Mastermind",
      "Unstoppable Momentum"
    ],
    "description": "The venom-fueled genius mastermind who broke the Batman's spine. Possesses photographic memory, grand strategy, and titanic physical power under chemical infusion.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#38A169",
      "badgeText": "💉 VENOM POWERHOUSE",
      "comicQuote": "I am Bane — and I could kill you... but death would only end your agony."
    },
    "tacticalNotes": "Venom provides burst strength and pain immunity. Exceptional blend of brawn and tactical deduction.",
    "matchupStrengths": [
      "Street-Level Strikers",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Flight Users",
      "Energy Blasters",
      "Venom Hose Severing"
    ],
    "imageUrl": "/characters/bane.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/60-bane.jpg"
  },
  {
    "id": "solomon-grundy",
    "name": "Solomon Grundy",
    "alterEgo": "Cyrus Gold",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 94,
      "speed": 52,
      "durability": 95,
      "combat": 65,
      "range": 40,
      "intelligence": 35
    },
    "specialAbilities": [
      "Undead Resilience",
      "Slaughter Swamp Surge",
      "Crushing Bearhug",
      "Resurrection Curse"
    ],
    "description": "Murdered in Slaughter Swamp in the 19th century, Cyrus Gold rose as an undead colossus with terrifying strength, immune to mortal wounds and pain.",
    "visuals": {
      "primaryColor": "#2D3748",
      "accentColor": "#718096",
      "badgeText": "🪦 UNDEAD MONSTER",
      "comicQuote": "Solomon Grundy, born on a Monday, christened on Tuesday..."
    },
    "tacticalNotes": "Extremely durable zombie tank. Shrugs off bullet fire and blunt force trauma effortlessly.",
    "matchupStrengths": [
      "Physical Strikers",
      "Poison / Toxins"
    ],
    "matchupWeaknesses": [
      "Fire",
      "Holy Magic",
      "High Range Blasters"
    ],
    "imageUrl": "/characters/solomon-grundy.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/609-solomon-grundy.jpg"
  },
  {
    "id": "lobo",
    "name": "Lobo",
    "alterEgo": "The Main Man of Czarnia",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 93,
      "strength": 96,
      "speed": 76,
      "durability": 98,
      "combat": 89,
      "range": 70,
      "intelligence": 82
    },
    "specialAbilities": [
      "Hook & Chain Carnage",
      "Immortal Czarnian Healing",
      "Spacehog Strafe",
      "Frag-Em Frag Grenades"
    ],
    "description": "The last Czarnian bounty hunter, having exterminated his own race for fun. Immortal, unkillable, and barred from both Heaven and Hell, Lobo rides his cosmic chopper across the stars.",
    "visuals": {
      "primaryColor": "#1A1A1A",
      "accentColor": "#E53E3E",
      "badgeText": "⛓️ THE MAIN MAN",
      "comicQuote": "The Main Man don't borrow nothin', an' he don't lose nothin'."
    },
    "tacticalNotes": "Regenerates from a single drop of blood. Unpredictable mercenary brawler with heavy cosmic ordnance.",
    "matchupStrengths": [
      "Brutes",
      "Demons",
      "Cosmic Enforcers"
    ],
    "matchupWeaknesses": [
      "Mental Control",
      "Dimensional Banishment"
    ],
    "imageUrl": "/characters/lobo.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/413-lobo.jpg"
  },
  {
    "id": "bizarro",
    "name": "Bizarro",
    "alterEgo": "El-Kal / Bizarro #1",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 90,
      "strength": 95,
      "speed": 82,
      "durability": 94,
      "combat": 70,
      "range": 85,
      "intelligence": 45
    },
    "specialAbilities": [
      "Flame Breath",
      "Freeze Vision",
      "Chalk-White Resilience",
      "Backwards Logic Bash"
    ],
    "description": "Imperfect clone of Superman created with reverse powers: freezing vision, incinerating flame breath, and twisted logic where goodbye means hello and pain means joy.",
    "visuals": {
      "primaryColor": "#553C9A",
      "accentColor": "#9F7AEA",
      "badgeText": "🔄 IMPERFECT CLONE",
      "comicQuote": "Me am Bizarro! Me am #1 hero! Me save you by smashing you!"
    },
    "tacticalNotes": "Inverted elemental powers catch opponents off guard. High physical durability.",
    "matchupStrengths": [
      "Ice Users",
      "Standard Energy Tanks"
    ],
    "matchupWeaknesses": [
      "Complex Tactics",
      "Psychic Trickery"
    ],
    "imageUrl": "/characters/bizarro.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/93-bizarro.jpg"
  },
  {
    "id": "swamp-thing",
    "name": "Swamp Thing",
    "alterEgo": "Dr. Alec Holland",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 95,
      "speed": 60,
      "durability": 98,
      "combat": 80,
      "range": 88,
      "intelligence": 88
    },
    "specialAbilities": [
      "Avatar of the Green",
      "Bio-Mass Regeneration",
      "Spore Hallucination",
      "Elemental Root Tendrils"
    ],
    "description": "Plant elemental and protector of all vegetative life on Earth connected to The Green. Can reconstitute his body anywhere plant matter exists in the universe.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#68D391",
      "badgeText": "🌿 AVATAR OF THE GREEN",
      "comicQuote": "I am the swamp. I am the rot and the bloom."
    },
    "tacticalNotes": "Virtually unkillable while in contact with organic life. Entangles and roots multiple opponents.",
    "matchupStrengths": [
      "Poison Users",
      "Physical Brawlers",
      "Earth Magic"
    ],
    "matchupWeaknesses": [
      "Intense Flame",
      "Defoliants / Chemical Rot"
    ],
    "imageUrl": "/characters/swamp-thing.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/645-swamp-thing.jpg"
  },
  {
    "id": "killer-croc",
    "name": "Killer Croc",
    "alterEgo": "Waylon Jones",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Rare",
    "stats": {
      "power": 78,
      "strength": 86,
      "speed": 64,
      "durability": 87,
      "combat": 76,
      "range": 35,
      "intelligence": 45
    },
    "specialAbilities": [
      "Armored Reptilian Scales",
      "Death Roll Thrash",
      "Sewer Ambush",
      "Apex Predator Bite"
    ],
    "description": "Born with a severe genetic condition that gave him thick scaly hide, razor claws, and monstrous reptilian strength, making him king of Gotham's sewers.",
    "visuals": {
      "primaryColor": "#276749",
      "accentColor": "#ECC94B",
      "badgeText": "🐊 GOTHAM SEWER KING",
      "comicQuote": "I threw a rock at him! ...It was a big rock."
    },
    "tacticalNotes": "High close-range resilience and aquatic dominance. Pierces light body armor.",
    "matchupStrengths": [
      "Street Fighters",
      "Unarmored Rogues"
    ],
    "matchupWeaknesses": [
      "High Altitude Attacks",
      "Heavy Artillery",
      "Cold Temperatures"
    ],
    "imageUrl": "/characters/killer-croc.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/386-killer-croc.jpg"
  },
  {
    "id": "steppenwolf",
    "name": "Steppenwolf",
    "alterEgo": "General of Apokolips",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 95,
      "speed": 75,
      "durability": 94,
      "combat": 93,
      "range": 75,
      "intelligence": 86
    },
    "specialAbilities": [
      "Electro-Axe Cleave",
      "Parademons Swarm Call",
      "Apokoliptian Armor",
      "Conqueror's Trample"
    ],
    "description": "Darkseid's uncle and lead military general commanding hordes of Parademons. Wields a blazing red electro-axe capable of cleaving armored titans in two.",
    "visuals": {
      "primaryColor": "#742A2A",
      "accentColor": "#CBD5E0",
      "badgeText": "🪓 APOKOLIPS GENERAL",
      "comicQuote": "For Darkseid! For the glory of Apokolips!"
    },
    "tacticalNotes": "Brutal anti-tank weapon reach. Cleaves shields and leads offensive pushes.",
    "matchupStrengths": [
      "Standard Soldiers",
      "Shielded Targets"
    ],
    "matchupWeaknesses": [
      "Kryptonian Speed",
      "Divine Magic"
    ],
    "imageUrl": "/characters/steppenwolf.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/637-steppenwolf.jpg"
  },
  {
    "id": "superboy-prime",
    "name": "Superboy-Prime",
    "alterEgo": "Kal-El of Earth-Prime",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Cosmic",
    "stats": {
      "power": 99,
      "strength": 100,
      "speed": 98,
      "durability": 99,
      "combat": 88,
      "range": 94,
      "intelligence": 85
    },
    "specialAbilities": [
      "Reality-Shattering Punch",
      "Yellow Sun Armor Boost",
      "Heat Vision Barrage",
      "Rage Tantrum"
    ],
    "description": "From a universe where superheroes were comic books, Superboy-Prime possesses Silver Age Kryptonian power levels so immense his fists can shatter the fabric of reality itself.",
    "visuals": {
      "primaryColor": "#1A365D",
      "accentColor": "#E53E3E",
      "badgeText": "💥 REALITY BREAKER",
      "comicQuote": "I'LL KILL YOU TO DEATH!"
    },
    "tacticalNotes": "Immune to magic and Kryptonite of alternate realities. Hits with universe-altering force.",
    "matchupStrengths": [
      "Almost all heroes",
      "Reality Anchors"
    ],
    "matchupWeaknesses": [
      "Red Sun Energy Drain",
      "Speed Force Entrapment"
    ],
    "imageUrl": "/characters/superboy-prime.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/642-superboy-prime.jpg"
  },
  {
    "id": "king-shark",
    "name": "King Shark",
    "alterEgo": "Nanaue",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 89,
      "speed": 65,
      "durability": 90,
      "combat": 74,
      "range": 30,
      "intelligence": 40
    },
    "specialAbilities": [
      "Shark God Demigod Toughness",
      "Chomp Frenzy",
      "Oceanic Depth Adaptation",
      "Blood Scent Rage"
    ],
    "description": "The humanoid son of the Shark God. Nanaue possesses ocean-trench crushing durability, razor teeth capable of biting through tank plating, and primal berserker ferocity.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#E2E8F0",
      "badgeText": "🦈 DEMIGOD OF THE OCEAN",
      "comicQuote": "King Shark is a shark!"
    },
    "tacticalNotes": "Extremely high physical armor and vicious bite attacks in melee scuffles.",
    "matchupStrengths": [
      "Naval Combat",
      "Melee Infiltrators"
    ],
    "matchupWeaknesses": [
      "Dehydration",
      "Heavy Electricity",
      "High Mobility Blasters"
    ],
    "imageUrl": "/characters/king-shark.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/390-king-shark.jpg"
  },
  {
    "id": "giganta",
    "name": "Giganta",
    "alterEgo": "Dr. Doris Zuel",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Rare",
    "stats": {
      "power": 82,
      "strength": 92,
      "speed": 56,
      "durability": 89,
      "combat": 72,
      "range": 50,
      "intelligence": 78
    },
    "specialAbilities": [
      "Colossal Growth",
      "Seismic Stomp",
      "Giant Haymaker",
      "Scientific Insight"
    ],
    "description": "Dr. Doris Zuel can grow to colossal heights of several hundred feet, gaining proportional strength, mass, and durability to wrestle with Wonder Woman.",
    "visuals": {
      "primaryColor": "#C05621",
      "accentColor": "#ECC94B",
      "badgeText": "🏔️ COLOSSAL TITAN",
      "comicQuote": "Let's see how you look squashed beneath my heel!"
    },
    "tacticalNotes": "Dominates arena space with massive reach and ground tremors.",
    "matchupStrengths": [
      "Small Strikers",
      "Light Vehicles"
    ],
    "matchupWeaknesses": [
      "Speedsters",
      "Precision Nerve Strikes"
    ],
    "imageUrl": "/characters/giganta.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/284-giganta.jpg"
  },
  {
    "id": "gorilla-grodd",
    "name": "Gorilla Grodd",
    "alterEgo": "Grodd of Gorilla City",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 91,
      "speed": 70,
      "durability": 89,
      "combat": 85,
      "range": 75,
      "intelligence": 94
    },
    "specialAbilities": [
      "Telepathic Mind Blast",
      "Simian Savage Beatdown",
      "Mind Control Override",
      "Forcefield Projection"
    ],
    "description": "Hyper-intelligent gorilla warlord from the secret civilization of Gorilla City. Pairs bone-shattering ape physiology with world-class telepathic brain-control powers.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#DD6B20",
      "badgeText": "🦍 TELEPATHIC APELORD",
      "comicQuote": "I am Grodd! Leader of apes! Destroyer of men!"
    },
    "tacticalNotes": "Unusual combination of heavy tank stats and psychic mind-control disrupts enemy backlines.",
    "matchupStrengths": [
      "Unshielded Minds",
      "Pure Brawlers"
    ],
    "matchupWeaknesses": [
      "Speed Force Acceleration",
      "Psychic Immunity Helmets"
    ],
    "imageUrl": "/characters/gorilla-grodd.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/294-gorilla-grodd.jpg"
  },
  {
    "id": "kilowog",
    "name": "Kilowog",
    "alterEgo": "Kilowog of Bolovax Vik",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Epic",
    "stats": {
      "power": 89,
      "strength": 93,
      "speed": 72,
      "durability": 92,
      "combat": 87,
      "range": 84,
      "intelligence": 82
    },
    "specialAbilities": [
      "Emerald Construct Anvil",
      "Drill Sergeant Roar",
      "Bolovaxian Brute Force",
      "Ring Battery Barrier"
    ],
    "description": "Beloved drill sergeant of the Green Lantern Corps and master mechanical geneticist who trains all new ring recruits with tough love and emerald constructs.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#ED8936",
      "badgeText": "💍 EMERALD DRILL SERGEANT",
      "comicQuote": "Listen up, you poozers! Class is now in session!"
    },
    "tacticalNotes": "Combines heavy alien brute strength with Green Lantern hard-light construct shielding.",
    "matchupStrengths": [
      "Recruits",
      "Energy Attackers"
    ],
    "matchupWeaknesses": [
      "Yellow Fear Energy",
      "Willpower Fatigue"
    ],
    "imageUrl": "/characters/kilowog.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/388-kilowog.jpg"
  },
  {
    "id": "citizen-steel",
    "name": "Citizen Steel",
    "alterEgo": "Nathan Heywood",
    "universe": "DC Universe",
    "role": "Tank",
    "rarity": "Rare",
    "stats": {
      "power": 83,
      "strength": 93,
      "speed": 55,
      "durability": 94,
      "combat": 75,
      "range": 35,
      "intelligence": 68
    },
    "specialAbilities": [
      "Organic Steel Skin",
      "Unstoppable Charging Bash",
      "Heavy Metal Absorption",
      "JSA Bulwark"
    ],
    "description": "Grandson of the original Commander Steel whose organic steel body makes him completely invulnerable to pain, possessing strength on par with the heaviest titans.",
    "visuals": {
      "primaryColor": "#718096",
      "accentColor": "#E53E3E",
      "badgeText": "🛡️ LIVING METAL JUGGERNAUT",
      "comicQuote": "I can't feel pain anymore. Which means you're in big trouble."
    },
    "tacticalNotes": "High physical damage reduction. Ideal vanguard anchor for team formations.",
    "matchupStrengths": [
      "Ballistic Fire",
      "Piercing Weapons"
    ],
    "matchupWeaknesses": [
      "Extreme Magnetism",
      "Acidic Dissolution"
    ],
    "imageUrl": "/characters/citizen-steel.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/177-citizen-steel.jpg"
  },
  {
    "id": "wonder-woman",
    "name": "Wonder Woman",
    "alterEgo": "Diana Prince",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 97,
      "speed": 90,
      "durability": 96,
      "combat": 99,
      "range": 82,
      "intelligence": 90
    },
    "specialAbilities": [
      "Lasso of Truth Bind",
      "Bracelets of Submission Deflect",
      "Godkiller Blade Slice",
      "Amazonian War Cry"
    ],
    "description": "Princess of Themyscira and daughter of Zeus, Diana is the greatest martial warrior on Earth, endowed with god-given strength, invulnerable bracelets, and the Lasso of Truth.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#ECC94B",
      "badgeText": "⚔️ AMAZON CHAMPION",
      "comicQuote": "I will fight for those who cannot fight for themselves."
    },
    "tacticalNotes": "Flawless 99 combat skill allows counter-parrying any physical or ranged striker. All-around powerhouse.",
    "matchupStrengths": [
      "Monsters",
      "Brawlers",
      "Warriors"
    ],
    "matchupWeaknesses": [
      "High-Tier Reality Warpers",
      "Piercing Piercers while undefended"
    ],
    "imageUrl": "/characters/wonder-woman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg"
  },
  {
    "id": "batman",
    "name": "Batman",
    "alterEgo": "Bruce Wayne",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 91,
      "strength": 78,
      "speed": 82,
      "durability": 80,
      "combat": 99,
      "range": 85,
      "intelligence": 100
    },
    "specialAbilities": [
      "Contingency Plan Execution",
      "Batarang Flurry",
      "Smoke Bomb Disappearance",
      "Martial Mastery Counter"
    ],
    "description": "The Dark Knight of Gotham City. Master of 127 martial arts disciplines, the world's greatest detective, and prepared with a contingency plan to defeat any being in the universe.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#D69E2E",
      "badgeText": "🦇 THE DARK KNIGHT",
      "comicQuote": "I am vengeance. I am the night. I am Batman."
    },
    "tacticalNotes": "Intelligence 100 grants bonus damage against enemy weaknesses and perfect tactical execution.",
    "matchupStrengths": [
      "Arrogant Titans",
      "Rogues",
      "Predictable Opponents"
    ],
    "matchupWeaknesses": [
      "Unprepared Ambush by Godlike Speedsters"
    ],
    "imageUrl": "/characters/batman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg"
  },
  {
    "id": "deathstroke",
    "name": "Deathstroke",
    "alterEgo": "Slade Wilson",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 90,
      "strength": 85,
      "speed": 84,
      "durability": 86,
      "combat": 98,
      "range": 88,
      "intelligence": 95
    },
    "specialAbilities": [
      "Promethium Broadsword",
      "Energy Lance Blast",
      "Enhanced 90% Brain Capacity",
      "Healing Factor Surge"
    ],
    "description": "Slade Wilson is the deadliest assassin in history, possessing enhanced brain capacity, superhuman agility, master swordsmanship, and military marksmanship.",
    "visuals": {
      "primaryColor": "#C05621",
      "accentColor": "#2B6CB0",
      "badgeText": "🎯 THE TERMINATOR",
      "comicQuote": "I don't miss. And I never leave a contract unfinished."
    },
    "tacticalNotes": "Deadly hybrid of lethal swordplay and precision ballistic weaponry. Punishes mistakes.",
    "matchupStrengths": [
      "Teen Titans",
      "Martial Artists",
      "Tacticians"
    ],
    "matchupWeaknesses": [
      "Speedsters at Full Acceleration",
      "Cosmic Energy Entities"
    ],
    "imageUrl": "/characters/deathstroke.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/216-deathstroke.jpg"
  },
  {
    "id": "nightwing",
    "name": "Nightwing",
    "alterEgo": "Dick Grayson",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 85,
      "strength": 75,
      "speed": 88,
      "durability": 78,
      "combat": 96,
      "range": 75,
      "intelligence": 90
    },
    "specialAbilities": [
      "Escrima Stick Electrocution",
      "Quadruple Somersault Takedown",
      "Wing-Ding Barrage",
      "Leader of the Titans"
    ],
    "description": "The first Robin who grew into Blüdhaven's greatest guardian. The finest acrobat in the world and an inspirational field leader with combat skill rivaling Batman.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#3182CE",
      "badgeText": "🦅 TITANS LEADER",
      "comicQuote": "You can't let fear control you. You just have to leap."
    },
    "tacticalNotes": "Extreme agility enables dodging heavy blows while chaining stun-electric combos.",
    "matchupStrengths": [
      "Heavy Bruisers",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Superhuman Speedster Speed",
      "Giant Area-of-Effect Blasts"
    ],
    "imageUrl": "/characters/nightwing.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/491-nightwing.jpg"
  },
  {
    "id": "red-hood",
    "name": "Red Hood",
    "alterEgo": "Jason Todd",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 80,
      "speed": 82,
      "durability": 82,
      "combat": 93,
      "range": 88,
      "intelligence": 86
    },
    "specialAbilities": [
      "Dual Pistol Rapid Fire",
      "All-Blade Summon",
      "Explosive Charge Grenades",
      "Lazarus Pit Fury"
    ],
    "description": "Resurrected via the Lazarus Pit after being murdered by the Joker, Jason Todd enforces lethal justice across the underworld with military firearms and mystical All-Blades.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#718096",
      "badgeText": "🔴 LETHAL VIGILANTE",
      "comicQuote": "You can't stop crime. That's what you never understood. You can only control it."
    },
    "tacticalNotes": "Aggressive dual-gun fire at mid-range transitioning into mystical blade strikes.",
    "matchupStrengths": [
      "Underworld Bosses",
      "Non-Lethal Heroes"
    ],
    "matchupWeaknesses": [
      "Armored Colossi",
      "Mental Illusions"
    ],
    "imageUrl": "/characters/red-hood.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/546-red-hood.jpg"
  },
  {
    "id": "black-adam",
    "name": "Black Adam",
    "alterEgo": "Teth-Adam",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Cosmic",
    "stats": {
      "power": 97,
      "strength": 98,
      "speed": 94,
      "durability": 97,
      "combat": 94,
      "range": 90,
      "intelligence": 89
    },
    "specialAbilities": [
      "SHAZAM Lightning Wrath",
      "Khandaq Ruthless Cleave",
      "Amon Stamina Shield",
      "Supersonic Bullrush"
    ],
    "description": "Ancient Khandaqi champion bestowed with the powers of the Egyptian gods (Shu, Hershef, Amon, Zehuti, Anpu, Menthu). He rules Khandaq with an iron fist.",
    "visuals": {
      "primaryColor": "#171923",
      "accentColor": "#ECC94B",
      "badgeText": "⚡ GOD OF KHANDAQ",
      "comicQuote": "Kneel at his feet or get crushed by his boot."
    },
    "tacticalNotes": "Unforgiving melee striker backed by divine lightning and zero moral restraints.",
    "matchupStrengths": [
      "Tech Armor",
      "Demons",
      "Earth Champions"
    ],
    "matchupWeaknesses": [
      "Divine Egyptian Counter-Spells",
      "Overwhelming Mystic Hordes"
    ],
    "imageUrl": "/characters/black-adam.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/95-black-adam.jpg"
  },
  {
    "id": "big-barda",
    "name": "Big Barda",
    "alterEgo": "Barda Free",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 96,
      "speed": 78,
      "durability": 95,
      "combat": 95,
      "range": 75,
      "intelligence": 80
    },
    "specialAbilities": [
      "Mega-Rod Concussion Blast",
      "Female Fury Combat Prowess",
      "Apokoliptian Armor",
      "Boom Tube Breach"
    ],
    "description": "Former leader of Darkseid's elite Female Furies who defected to New Genesis for love. Wields the devastating Mega-Rod capable of leveling mountains.",
    "visuals": {
      "primaryColor": "#2C5282",
      "accentColor": "#D69E2E",
      "badgeText": "🛡️ FORMER FEMALE FURY",
      "comicQuote": "I was raised in the fire-pits of Apokolips. You don't scare me."
    },
    "tacticalNotes": "Mega-Rod releases lethal kinetic shockwaves while her armor deflects planetary artillery.",
    "matchupStrengths": [
      "Brutes",
      "Alien Soldiers"
    ],
    "matchupWeaknesses": [
      "Psychic Domination",
      "Speedster Blitzes"
    ],
    "imageUrl": "/characters/big-barda.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/81-big-barda.jpg"
  },
  {
    "id": "shazam",
    "name": "Shazam",
    "alterEgo": "Billy Batson",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 97,
      "speed": 92,
      "durability": 96,
      "combat": 85,
      "range": 88,
      "intelligence": 84
    },
    "specialAbilities": [
      "Lightning Bolt Transformation",
      "Wisdom of Solomon",
      "Strength of Hercules",
      "Speed of Mercury"
    ],
    "description": "Young Billy Batson shouts the magic word \"SHAZAM!\" to transform into Earth's Mightiest Mortal, blessed with the powers of Solomon, Hercules, Atlas, Zeus, Achilles, and Mercury.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "⚡ EARTH'S MIGHTIEST MORTAL",
      "comicQuote": "SHAZAM!"
    },
    "tacticalNotes": "Magic lightning punches bypass pure physical defenses. Pure-hearted optimism boosts morale.",
    "matchupStrengths": [
      "Physical Tanks",
      "Science-Based Foes"
    ],
    "matchupWeaknesses": [
      "High Sorcery",
      "Forced Reversion to Child Form"
    ],
    "imageUrl": "/characters/shazam.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/156-captain-marvel.jpg"
  },
  {
    "id": "aquaman",
    "name": "Aquaman",
    "alterEgo": "Arthur Curry",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 93,
      "speed": 84,
      "durability": 92,
      "combat": 91,
      "range": 80,
      "intelligence": 82
    },
    "specialAbilities": [
      "Trident of Neptune Impalement",
      "Oceanic Tsunami Call",
      "Telepathic Leviathan Command",
      "Atlantean Durability"
    ],
    "description": "King of Atlantis and protector of 70% of the Earth's surface. Arthur Curry commands all oceanic creatures and wields Neptune's magical trident with royal authority.",
    "visuals": {
      "primaryColor": "#C05621",
      "accentColor": "#2C7A7B",
      "badgeText": "🔱 KING OF ATLANTIS",
      "comicQuote": "I am the King of the Seven Seas. And you are drowning in my domain."
    },
    "tacticalNotes": "Trident pierces impenetrable hides. Summons crushing water walls and sea behemoths.",
    "matchupStrengths": [
      "Fire Users",
      "Desert Environments",
      "Naval Armadas"
    ],
    "matchupWeaknesses": [
      "Extreme Evaporation",
      "Dessication Attacks"
    ],
    "imageUrl": "/characters/aquaman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/38-aquaman.jpg"
  },
  {
    "id": "ares-dc",
    "name": "Ares",
    "alterEgo": "Olympian God of War",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 96,
      "speed": 80,
      "durability": 95,
      "combat": 99,
      "range": 84,
      "intelligence": 92
    },
    "specialAbilities": [
      "War God Blade of Chaos",
      "Conflict Empowerment",
      "Undead Spartan Army",
      "Armor of Olympus"
    ],
    "description": "Olympian deity of violence and battle. Ares grows more powerful from every conflict, hatred, and blow struck in his vicinity.",
    "visuals": {
      "primaryColor": "#742A2A",
      "accentColor": "#A0AEC0",
      "badgeText": "⚔️ GOD OF WAR",
      "comicQuote": "War is eternal. And as long as men fight, I am invincible."
    },
    "tacticalNotes": "Gains attack buffs the longer the battle persists. Exceptional melee mastery.",
    "matchupStrengths": [
      "Prolonged Melee Clashes",
      "Bloodthirsty Enemies"
    ],
    "matchupWeaknesses": [
      "Peace / Pacifist Magic",
      "Love / Truth Deities"
    ],
    "imageUrl": "/characters/ares-dc.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/43-ares.jpg"
  },
  {
    "id": "batgirl",
    "name": "Batgirl",
    "alterEgo": "Barbara Gordon",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 70,
      "speed": 82,
      "durability": 72,
      "combat": 90,
      "range": 74,
      "intelligence": 95
    },
    "specialAbilities": [
      "Escrima Strike Sequence",
      "Batarang Rapid Volley",
      "Photographic Memory Analysis",
      "Hacker Override"
    ],
    "description": "Daughter of Commissioner Gordon, Barbara is a martial arts prodigy with an eidetic memory and genius cybernetic hacking skills.",
    "visuals": {
      "primaryColor": "#2D3748",
      "accentColor": "#ECC94B",
      "badgeText": "🦇 GOTHAM VIGILANTE",
      "comicQuote": "It's not about who I am underneath, but what I can do."
    },
    "tacticalNotes": "Pinpoints opponent armor weakpoints through instant photographic tactical scanning.",
    "matchupStrengths": [
      "Street Thugs",
      "Tech Security Systems"
    ],
    "matchupWeaknesses": [
      "Superhuman Brutes",
      "Titan-tier Durability"
    ],
    "imageUrl": "/characters/batgirl.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/63-batgirl.jpg"
  },
  {
    "id": "batwoman",
    "name": "Batwoman",
    "alterEgo": "Katherine Kane",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 82,
      "strength": 74,
      "speed": 80,
      "durability": 76,
      "combat": 92,
      "range": 78,
      "intelligence": 88
    },
    "specialAbilities": [
      "Military CQC Strike",
      "Red Batarang Burst",
      "Armored Cape Shield",
      "Tactical Smoke Retreat"
    ],
    "description": "West Point-trained military vigilante who defends Gotham with lethal tactical discipline and top-grade combat engineering.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#E53E3E",
      "badgeText": "🔴 MILITARY DARK KNIGHT",
      "comicQuote": "I serve a higher calling than you could ever understand."
    },
    "tacticalNotes": "Rigid military precision maximizes critical strike chance.",
    "matchupStrengths": [
      "Paramilitary Operatives",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Cosmic Beings",
      "Heavy Energy Artillery"
    ],
    "imageUrl": "/characters/batwoman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/73-batwoman-v.jpg"
  },
  {
    "id": "azrael",
    "name": "Azrael",
    "alterEgo": "Jean-Paul Valley",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 83,
      "strength": 82,
      "speed": 79,
      "durability": 80,
      "combat": 90,
      "range": 65,
      "intelligence": 76
    },
    "specialAbilities": [
      "Flambeau Flaming Blades",
      "Order of St. Dumas Conditioning",
      "Zealot Retribution",
      "Thermal Gauntlet Fire"
    ],
    "description": "Enforcer of the Sacred Order of St. Dumas, conditioned by \"The System\" into a religious warrior wielding twin flaming swords.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#ED8936",
      "badgeText": "🔥 BLADE OF ST. DUMAS",
      "comicQuote": "By the sword of Azrael, divine justice shall fall!"
    },
    "tacticalNotes": "Twin flaming blades inflict lingering burn damage on melee impact.",
    "matchupStrengths": [
      "Corrupt Cults",
      "Melee Fighters"
    ],
    "matchupWeaknesses": [
      "Mental Triggers",
      "Tactical Psychological Warfare"
    ],
    "imageUrl": "/characters/azrael.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/58-azrael.jpg"
  },
  {
    "id": "vixen",
    "name": "Vixen",
    "alterEgo": "Mari McCabe",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 84,
      "strength": 85,
      "speed": 86,
      "durability": 80,
      "combat": 88,
      "range": 60,
      "intelligence": 78
    },
    "specialAbilities": [
      "Tantu Totem Mimicry",
      "Cheetah Sprint Attack",
      "Elephant Charge Stampede",
      "Falcon Dive Strike"
    ],
    "description": "Possessor of the mystical Tantu Totem, Mari can channel the powers, speed, and senses of any animal on Earth or mythological creature.",
    "visuals": {
      "primaryColor": "#DD6B20",
      "accentColor": "#ECC94B",
      "badgeText": "🐾 TANTU TOTEM WARRIOR",
      "comicQuote": "The power of every predator and beast flows in my veins."
    },
    "tacticalNotes": "Dynamically shifts animal adaptations (cheetah speed, gorilla strength, falcon evasion).",
    "matchupStrengths": [
      "Single-Style Combatants"
    ],
    "matchupWeaknesses": [
      "Totem Disruption",
      "Sonic Overload"
    ],
    "imageUrl": "/characters/vixen.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/699-vixen.jpg"
  },
  {
    "id": "hawk",
    "name": "Hawk",
    "alterEgo": "Hank Hall",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 81,
      "strength": 87,
      "speed": 72,
      "durability": 85,
      "combat": 86,
      "range": 40,
      "intelligence": 60
    },
    "specialAbilities": [
      "Avatar of War Berserk",
      "Crushing Clothesline",
      "Chaos Infused Punch",
      "Pain Tolerance Surge"
    ],
    "description": "The Avatar of War and Chaos, Hank Hall gains superhuman strength, rage, and resilience whenever danger threatens.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#E2E8F0",
      "badgeText": "🦅 AVATAR OF WAR",
      "comicQuote": "I don't talk peace. I punch problems!"
    },
    "tacticalNotes": "High melee aggression and pain tolerance; hits harder as health drops.",
    "matchupStrengths": [
      "Lightweight Fighters",
      "Street Gangs"
    ],
    "matchupWeaknesses": [
      "Calm Tacticians",
      "Energy Snipers"
    ],
    "imageUrl": "/characters/hawk.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/312-hawk.jpg"
  },
  {
    "id": "hawkgirl",
    "name": "Hawkgirl",
    "alterEgo": "Kendra Saunders",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 89,
      "speed": 85,
      "durability": 88,
      "combat": 93,
      "range": 76,
      "intelligence": 82
    },
    "specialAbilities": [
      "Nth Metal Mace Smash",
      "Winged Aerial Dive",
      "Anti-Magic Disruption",
      "Centuries of Reincarnation"
    ],
    "description": "Wielding an Nth Metal mace that disrupts magic and gravity, Kendra is a fierce warrior with centuries of battle memories from past lives.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#2F855A",
      "badgeText": "🪽 NTH METAL CHAMPION",
      "comicQuote": "My mace doesn't just break bones — it shatters spells."
    },
    "tacticalNotes": "Nth metal mace deals massive bonus damage against mystic shields and sorcerers.",
    "matchupStrengths": [
      "Sorcerers",
      "Magical Entities",
      "Airborne Foes"
    ],
    "matchupWeaknesses": [
      "Colossal Brutes",
      "Snipers outside dive range"
    ],
    "imageUrl": "/characters/hawkgirl.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/315-hawkgirl.jpg"
  },
  {
    "id": "red-robin",
    "name": "Red Robin",
    "alterEgo": "Tim Drake",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 81,
      "strength": 72,
      "speed": 82,
      "durability": 74,
      "combat": 91,
      "range": 78,
      "intelligence": 97
    },
    "specialAbilities": [
      "Bo Staff Kinetic Spin",
      "Detective Deductive Flaw Find",
      "Grapple Glider Strike",
      "Flashbang Barrage"
    ],
    "description": "Recognized by Ra's al Ghul as the single Robin whose deductive genius rivals the Batman himself. Wields a collapsible bo staff and tactical glider wings.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#ECC94B",
      "badgeText": "🦯 DETECTIVE PRODIGY",
      "comicQuote": "I deduced Batman's identity at age nine. You think I can't figure you out?"
    },
    "tacticalNotes": "Staff range keeps foes at bay while 97 intelligence unlocks enemy weaknesses.",
    "matchupStrengths": [
      "Puzzle Bosses",
      "Ambushers"
    ],
    "matchupWeaknesses": [
      "Kryptonian-Tier Brutes"
    ],
    "imageUrl": "/characters/red-robin.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/549-red-robin.jpg"
  },
  {
    "id": "robin",
    "name": "Robin",
    "alterEgo": "Damian Wayne",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 70,
      "speed": 84,
      "durability": 72,
      "combat": 93,
      "range": 75,
      "intelligence": 88
    },
    "specialAbilities": [
      "Katana Assassin Sever",
      "League of Assassins Agility",
      "Birdarang Volley",
      "Arrogant Pressure Point Strike"
    ],
    "description": "Son of Bruce Wayne and Talia al Ghul, raised from birth by the League of Assassins to be the ultimate lethal heir before choosing the Bat.",
    "visuals": {
      "primaryColor": "#2F855A",
      "accentColor": "#E53E3E",
      "badgeText": "🗡️ HEIR TO THE DEMON",
      "comicQuote": "Tt. You think you're a match for the son of Batman?"
    },
    "tacticalNotes": "Aggressive katana strikes and rapid evasive flips. High critical strike multiplier.",
    "matchupStrengths": [
      "Standard Martial Artists",
      "Mercenaries"
    ],
    "matchupWeaknesses": [
      "Heavy Armor Tanks",
      "Overconfidence"
    ],
    "imageUrl": "/characters/robin.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/564-robin-v.jpg"
  },
  {
    "id": "huntress",
    "name": "Huntress",
    "alterEgo": "Helena Bertinelli",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 79,
      "strength": 70,
      "speed": 80,
      "durability": 74,
      "combat": 89,
      "range": 85,
      "intelligence": 80
    },
    "specialAbilities": [
      "Crossbow Precision Bolt",
      "Mafia Vendetta Strike",
      "Acrobatic Vault Flurry",
      "Smoke Pellets"
    ],
    "description": "Sole survivor of a Gotham mafia family massacre, Helena waged a one-woman war of vengeance using deadly crossbow marksmanship and Birds of Prey tactics.",
    "visuals": {
      "primaryColor": "#553C9A",
      "accentColor": "#CBD5E0",
      "badgeText": "🏹 BIRDS OF PREY VIGILANTE",
      "comicQuote": "My family lived by the gun. I live by the arrow."
    },
    "tacticalNotes": "Silent crossbow shots from mid-range pierce weak points in light armor.",
    "matchupStrengths": [
      "Mob Enforcers",
      "Assassins"
    ],
    "matchupWeaknesses": [
      "Heavy Armor Colossi",
      "Speedsters"
    ],
    "imageUrl": "/characters/huntress.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/334-huntress.jpg"
  },
  {
    "id": "catwoman",
    "name": "Catwoman",
    "alterEgo": "Selina Kyle",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Rare",
    "stats": {
      "power": 78,
      "strength": 65,
      "speed": 88,
      "durability": 70,
      "combat": 89,
      "range": 70,
      "intelligence": 84
    },
    "specialAbilities": [
      "Bullwhip Disarm",
      "Nine Lives Evasion",
      "Diamond Claw Slash",
      "Caltrop Trap Drop"
    ],
    "description": "Gotham's peerless cat burglar and anti-hero. Selina Kyle maneuvers rooftops with feline grace, wielding a 12-foot bullwhip and razor-sharp climbing claws.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#9F7AEA",
      "badgeText": "🐾 CAT BURGLAR SUPREME",
      "comicQuote": "I don't know about you, Miss Kitty, but I feel so much yummier."
    },
    "tacticalNotes": "Bullwhip disarms enemy weapons and pulls agile opponents off balance.",
    "matchupStrengths": [
      "Slow Bruisers",
      "Armed Human Guards"
    ],
    "matchupWeaknesses": [
      "Heavy Area Artillery",
      "Telepaths"
    ],
    "imageUrl": "/characters/catwoman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/165-catwoman.jpg"
  },
  {
    "id": "black-canary",
    "name": "Black Canary",
    "alterEgo": "Dinah Laurel Lance",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 76,
      "speed": 85,
      "durability": 80,
      "combat": 97,
      "range": 88,
      "intelligence": 85
    },
    "specialAbilities": [
      "Canary Cry Sonic Wave",
      "Judo Sweep & Disarm",
      "Sonic Propulsion Jump",
      "Birds of Prey Command"
    ],
    "description": "One of the top five martial artists on Earth equipped with a metahuman ultrasonic Canary Cry capable of pulverizing concrete and rupturing metal.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#ECC94B",
      "badgeText": "🔊 SONIC CANARY CRY",
      "comicQuote": "You boys want to see how loud a canary can sing?"
    },
    "tacticalNotes": "Sonic wave ruptures forcefields and stuns large groups while martial arts cleans up.",
    "matchupStrengths": [
      "Group Formations",
      "Energy Shield Users"
    ],
    "matchupWeaknesses": [
      "Sonic Dampening Tech",
      "Vocal Cord Suppressors"
    ],
    "imageUrl": "/characters/black-canary.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/97-black-canary.jpg"
  },
  {
    "id": "cheetah",
    "name": "Cheetah",
    "alterEgo": "Dr. Barbara Ann Minerva",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 89,
      "strength": 88,
      "speed": 95,
      "durability": 85,
      "combat": 91,
      "range": 45,
      "intelligence": 82
    },
    "specialAbilities": [
      "Goddess of the Hunt Fangs",
      "Hyperspeed Pounce",
      "Claw Tear Laceration",
      "Bloodlust Frenzy"
    ],
    "description": "Endowed with the primal spirit of the hunting goddess Urzkartaga, Cheetah possesses godly speed, razor-sharp claws, and predatory fangs capable of piercing Wonder Woman.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#744210",
      "badgeText": "🐆 URZKARTAGA GODDESS",
      "comicQuote": "The hunt is on, and you are my prey!"
    },
    "tacticalNotes": "Exceptional speed and armor-piercing claws shred durable targets.",
    "matchupStrengths": [
      "Gods",
      "Amazon Warriors"
    ],
    "matchupWeaknesses": [
      "Aura Disruption",
      "Heavy Electro-Traps"
    ],
    "imageUrl": "/characters/cheetah.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/172-cheetah.jpg"
  },
  {
    "id": "green-arrow",
    "name": "Green Arrow",
    "alterEgo": "Oliver Queen",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Epic",
    "stats": {
      "power": 85,
      "strength": 74,
      "speed": 82,
      "durability": 76,
      "combat": 93,
      "range": 96,
      "intelligence": 88
    },
    "specialAbilities": [
      "Boxing Glove Arrow Knockout",
      "Explosive Trick Arrow Volley",
      "Thermite Penetrator",
      "Robin Hood Marksmanship"
    ],
    "description": "Billionaire Oliver Queen defends Star City with world-class archery, firing up to 30 custom trick arrows per minute with unerring precision.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#ECC94B",
      "badgeText": "🏹 EMERALD ARCHER",
      "comicQuote": "You have failed this city!"
    },
    "tacticalNotes": "Trick arrow quiver provides versatile solutions: cryo, sonic, explosive, and net.",
    "matchupStrengths": [
      "Assassins",
      "Corrupt Executives"
    ],
    "matchupWeaknesses": [
      "Kryptonian-Scale Invulnerability",
      "Speedsters catching arrows"
    ],
    "imageUrl": "/characters/green-arrow.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/298-green-arrow.jpg"
  },
  {
    "id": "speedy",
    "name": "Speedy",
    "alterEgo": "Mia Dearden / Thea Queen",
    "universe": "DC Universe",
    "role": "Striker",
    "rarity": "Common",
    "stats": {
      "power": 72,
      "strength": 62,
      "speed": 78,
      "durability": 68,
      "combat": 84,
      "range": 88,
      "intelligence": 72
    },
    "specialAbilities": [
      "Rapid Arrow Triple Shot",
      "Taser Arrow Stun",
      "Acrobatic Flip Shot",
      "Street Savvy Evasion"
    ],
    "description": "Trained by Green Arrow, Speedy is a plucky and agile archer who fights alongside the Teen Titans to prove herself on the front line.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#ECC94B",
      "badgeText": "🎯 TEEN TITAN ARCHER",
      "comicQuote": "Don't let the name fool you — I never miss."
    },
    "tacticalNotes": "Cost-effective ranged striker with reliable trick arrow crowd control.",
    "matchupStrengths": [
      "Street Thugs"
    ],
    "matchupWeaknesses": [
      "Heavy Armor Tanks"
    ],
    "imageUrl": "/characters/speedy.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/615-speedy.jpg"
  },
  {
    "id": "cyborg",
    "name": "Cyborg",
    "alterEgo": "Victor Stone",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 91,
      "strength": 90,
      "speed": 78,
      "durability": 92,
      "combat": 82,
      "range": 94,
      "intelligence": 96
    },
    "specialAbilities": [
      "White Noise Cannon",
      "Boom Tube Portal",
      "Cybernetic Tech Override",
      "Promethium Rocket Salvo"
    ],
    "description": "Bonded with an alien Mother Box, Vic Stone is half-man, half-machine with infinite access to the world's data streams and an acoustic White Noise Cannon.",
    "visuals": {
      "primaryColor": "#718096",
      "accentColor": "#3182CE",
      "badgeText": "🤖 MOTHER BOX CYBORG",
      "comicQuote": "Booyah!"
    },
    "tacticalNotes": "White Noise Cannon disintegrates shields while tech override shuts down robot/tech enemies.",
    "matchupStrengths": [
      "Tech Armor",
      "Robotics",
      "Digital Defenses"
    ],
    "matchupWeaknesses": [
      "Electromagnetic EMP Disruption",
      "Ancient Magic"
    ],
    "imageUrl": "/characters/cyborg.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/194-cyborg.jpg"
  },
  {
    "id": "hal-jordan",
    "name": "Green Lantern (Hal)",
    "alterEgo": "Hal Jordan",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 92,
      "speed": 90,
      "durability": 93,
      "combat": 86,
      "range": 97,
      "intelligence": 85
    },
    "specialAbilities": [
      "Jet Fighter Construct Barrage",
      "Willpower Forcefield Bubble",
      "Giant Emerald Fist",
      "In Brightest Day Light Burst"
    ],
    "description": "Test pilot chosen by the ring of Abin Sur for his ability to overcome great fear. Hal Jordan is widely hailed as the greatest Green Lantern in the universe.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#48BB78",
      "badgeText": "💍 GREATEST GREEN LANTERN",
      "comicQuote": "In brightest day, in blackest night, no evil shall escape my sight!"
    },
    "tacticalNotes": "Limitless willpower constructs adapt to any distance or aerial battle situation.",
    "matchupStrengths": [
      "Fear Entities",
      "Space Fleets"
    ],
    "matchupWeaknesses": [
      "Yellow Impurity / Fear Resonance",
      "Ring Battery Depletion"
    ],
    "imageUrl": "/characters/hal-jordan.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/306-hal-jordan.jpg"
  },
  {
    "id": "guy-gardner",
    "name": "Green Lantern (Guy)",
    "alterEgo": "Guy Gardner",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 90,
      "strength": 89,
      "speed": 82,
      "durability": 90,
      "combat": 88,
      "range": 92,
      "intelligence": 76
    },
    "specialAbilities": [
      "Red/Green Ring Overcharge",
      "Construct Steamroller",
      "Barroom Brawl Haymaker",
      "Rage-Fueled Blast"
    ],
    "description": "Loudmouthed and fiercely loyal Earth Lantern whose explosive temper and indomitable will make him one of the Corps' fiercest front-line brawlers.",
    "visuals": {
      "primaryColor": "#2F855A",
      "accentColor": "#E53E3E",
      "badgeText": "🥊 HOTHEAD LANTERN",
      "comicQuote": "One punch? You think one punch is gonna keep Guy Gardner down?!"
    },
    "tacticalNotes": "Aggressive construct blasts combined with brawling instincts break through guarded lines.",
    "matchupStrengths": [
      "Conventional Armies",
      "Infiltrators"
    ],
    "matchupWeaknesses": [
      "Psychological Provocation",
      "Calculated Trap Setters"
    ],
    "imageUrl": "/characters/guy-gardner.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/305-guy-gardner.jpg"
  },
  {
    "id": "kyle-rayner",
    "name": "Green Lantern (Kyle)",
    "alterEgo": "Kyle Rayner",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 88,
      "speed": 88,
      "durability": 91,
      "combat": 82,
      "range": 96,
      "intelligence": 90
    },
    "specialAbilities": [
      "Artistic Anime Construct",
      "White Lantern Emotional Spectrum",
      "Emerald Mecha Armor",
      "Torchbearer Burst"
    ],
    "description": "A freelance graphic artist who wielded the last Green Lantern ring as the Torchbearer, later mastering all seven colors of the Emotional Spectrum as the White Lantern.",
    "visuals": {
      "primaryColor": "#276749",
      "accentColor": "#ED8936",
      "badgeText": "🎨 THE TORCHBEARER",
      "comicQuote": "My imagination is my greatest weapon. What I draw, you will feel."
    },
    "tacticalNotes": "Intricate, imaginative constructs create custom battlefield advantages.",
    "matchupStrengths": [
      "Single-Dimensional Opponents",
      "Cosmic Predators"
    ],
    "matchupWeaknesses": [
      "Willpower Emotional Turmoil"
    ],
    "imageUrl": "/characters/kyle-rayner.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/397-kyle-rayner.jpg"
  },
  {
    "id": "starfire",
    "name": "Starfire",
    "alterEgo": "Princess Koriand'r",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 91,
      "strength": 91,
      "speed": 88,
      "durability": 89,
      "combat": 84,
      "range": 93,
      "intelligence": 78
    },
    "specialAbilities": [
      "Starbolt Plasma Stream",
      "Ultraviolet Nova Flare",
      "Tamaranean Supersonic Flight",
      "Warrior Royal Rage"
    ],
    "description": "Exiled Princess of Tamaran who absorbs ultraviolet radiation to project thermonuclear plasma Starbolts and fly at faster-than-light velocities.",
    "visuals": {
      "primaryColor": "#DD6B20",
      "accentColor": "#9F7AEA",
      "badgeText": "🔥 TAMARANEAN PRINCESS",
      "comicQuote": "On my world, we fight with our whole hearts!"
    },
    "tacticalNotes": "High-heat plasma blasts incinerate physical shielding and melt armor.",
    "matchupStrengths": [
      "Ice Users",
      "Armored Infantry",
      "Flying Units"
    ],
    "matchupWeaknesses": [
      "Solar Energy Dampeners",
      "Cryo Super-Freezers"
    ],
    "imageUrl": "/characters/starfire.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/632-starfire.jpg"
  },
  {
    "id": "sinestro",
    "name": "Sinestro",
    "alterEgo": "Thaal Sinestro",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 94,
      "strength": 86,
      "speed": 88,
      "durability": 90,
      "combat": 89,
      "range": 96,
      "intelligence": 95
    },
    "specialAbilities": [
      "Yellow Fear Battery Beam",
      "Parallax Nightmare Beast",
      "Fear Spikes Construct",
      "Order Through Tyranny Barrier"
    ],
    "description": "Former greatest Green Lantern who forged the Yellow Ring of Qward to enforce order through terror. Mastermind founder of the Sinestro Corps.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#9B2C2C",
      "badgeText": "🟡 MASTER OF FEAR",
      "comicQuote": "In blackest day, in brightest night, beware your fears made into light!"
    },
    "tacticalNotes": "Weaponizes target fear to paralyze opponents before delivering lethal yellow plasma strikes.",
    "matchupStrengths": [
      "Hesitant Opponents",
      "Willpower-Weak Heroes"
    ],
    "matchupWeaknesses": [
      "Fearless Beings",
      "Hope Blue Lantern Energy"
    ],
    "imageUrl": "/characters/sinestro.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/601-sinestro.jpg"
  },
  {
    "id": "firestorm",
    "name": "Firestorm",
    "alterEgo": "Ronnie Raymond & Martin Stein",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 88,
      "speed": 85,
      "durability": 92,
      "combat": 78,
      "range": 97,
      "intelligence": 96
    },
    "specialAbilities": [
      "Atomic Transmutation",
      "Nuclear Concussion Blast",
      "Matter Density Phase",
      "Fusion Core Eruption"
    ],
    "description": "The Nuclear Man formed by the Firestorm Matrix merging athlete Ronnie Raymond with physicist Martin Stein. Can transmute any non-organic matter on the atomic level.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "⚛️ THE NUCLEAR MAN",
      "comicQuote": "Turn their weapons into ping-pong balls, Professor!"
    },
    "tacticalNotes": "Transmutes enemy weapons, missiles, and armor into harmless elements.",
    "matchupStrengths": [
      "Physical Weapons",
      "Machinery",
      "Ballistic Missiles"
    ],
    "matchupWeaknesses": [
      "Organic Matter Blindspot",
      "Matrix Internal Discord"
    ],
    "imageUrl": "/characters/firestorm.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/260-firestorm.jpg"
  },
  {
    "id": "black-manta",
    "name": "Black Manta",
    "alterEgo": "David Hyde",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 82,
      "speed": 78,
      "durability": 87,
      "combat": 89,
      "range": 92,
      "intelligence": 88
    },
    "specialAbilities": [
      "Optic Thermal Death Ray",
      "Armor-Piercing Torpedoes",
      "Electrified Harpoon Cable",
      "Atlantean Steel Armor"
    ],
    "description": "Aquaman's ultimate nemesis who pilots a state-of-the-art aquatic battle suit armed with red optic death lasers, jet propulsion, and explosive harpoons.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#E53E3E",
      "badgeText": "🔴 OPTIC DEATH RAY",
      "comicQuote": "Arthur Curry will die, and the oceans will turn red with his blood."
    },
    "tacticalNotes": "Optic lasers melt titanium in seconds and strike with pinpoint accuracy.",
    "matchupStrengths": [
      "Aquatic Opponents",
      "Flesh-and-Blood Heroes"
    ],
    "matchupWeaknesses": [
      "Godlike Durability",
      "EMP Blasts"
    ],
    "imageUrl": "/characters/black-manta.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/105-black-manta.jpg"
  },
  {
    "id": "captain-cold",
    "name": "Captain Cold",
    "alterEgo": "Leonard Snart",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Rare",
    "stats": {
      "power": 83,
      "strength": 68,
      "speed": 72,
      "durability": 78,
      "combat": 80,
      "range": 90,
      "intelligence": 89
    },
    "specialAbilities": [
      "Absolute Zero Cold Gun",
      "Cold Field Momentum Brake",
      "Ice Wall Rampart",
      "Rogues Leader Discipline"
    ],
    "description": "Leader of the Rogues who invented a cold gun firing absolute zero beams that halt all atomic motion, completely neutralizing speedsters and kinetic energy.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#E2E8F0",
      "badgeText": "❄️ ABSOLUTE ZERO GUN",
      "comicQuote": "I don't kill for kicks, Flash. It's strictly business."
    },
    "tacticalNotes": "Absolute zero cold field shuts down speedster momentum and freezes projectiles mid-air.",
    "matchupStrengths": [
      "Speedsters",
      "Flame Attackers"
    ],
    "matchupWeaknesses": [
      "Laser Heavy Blasters",
      "Extreme Long-Range Snipers"
    ],
    "imageUrl": "/characters/captain-cold.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/152-captain-cold.jpg"
  },
  {
    "id": "deadshot",
    "name": "Deadshot",
    "alterEgo": "Floyd Lawton",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 72,
      "speed": 80,
      "durability": 80,
      "combat": 88,
      "range": 98,
      "intelligence": 85
    },
    "specialAbilities": [
      "Wrist-Mounted Machine Gun Spray",
      "Trick Ricochet Sniper Shot",
      "Thermal Targeting HUD",
      "Suicide Squad Precision"
    ],
    "description": "The world's most lethal marksman who boasts he \"never misses.\" Equipped with wrist-mounted twin submachine guns, a cybernetic targeting eye, and high-caliber rifles.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#CBD5E0",
      "badgeText": "🎯 THE MAN WHO NEVER MISSES",
      "comicQuote": "Put a target on it, pay me my money, and it's done."
    },
    "tacticalNotes": "Ricochet shots bypass enemy cover and shields with 98 range precision.",
    "matchupStrengths": [
      "Unarmored Targets",
      "Cover Campers"
    ],
    "matchupWeaknesses": [
      "Invulnerable Metallic Tanks",
      "Hyperspeed Blitzers"
    ],
    "imageUrl": "/characters/deadshot.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/214-deadshot.jpg"
  },
  {
    "id": "blue-beetle",
    "name": "Blue Beetle",
    "alterEgo": "Jaime Reyes",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 91,
      "strength": 88,
      "speed": 88,
      "durability": 91,
      "combat": 80,
      "range": 94,
      "intelligence": 85
    },
    "specialAbilities": [
      "Khaji Da Sonic Cannon",
      "Plasma Blade Morph",
      "Winged Flight Shield",
      "Infiltrator AI Countermeasure"
    ],
    "description": "Bonded to the alien Reach scarab Khaji Da fused to his spine. The scarab generates infinite weapon configurations, energy shields, and plasma cannons.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#4FD1C5",
      "badgeText": "🪲 REACH SCARAB WEAPON",
      "comicQuote": "Whatever you throw at me, the Scarab can build a counter for it!"
    },
    "tacticalNotes": "Scarab AI automatically computes countermeasures against whatever attacks him.",
    "matchupStrengths": [
      "Alien War Fleets",
      "Energy Users"
    ],
    "matchupWeaknesses": [
      "Mystical Sorcery",
      "Scarab Overwrite"
    ],
    "imageUrl": "/characters/blue-beetle.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/126-blue-beetle-iii.jpg"
  },
  {
    "id": "heat-wave",
    "name": "Heat Wave",
    "alterEgo": "Mick Rory",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 72,
      "speed": 68,
      "durability": 80,
      "combat": 76,
      "range": 88,
      "intelligence": 70
    },
    "specialAbilities": [
      "Pyrotechnic Flamethrower Stream",
      "Napalm Ground Trap",
      "Asbestos Heat Armor",
      "Firebug Incineration"
    ],
    "description": "Pyromaniac Rogue partner to Captain Cold who modified an industrial flamethrower into a handheld stream of fire hot enough to melt Flash's friction boots.",
    "visuals": {
      "primaryColor": "#C05621",
      "accentColor": "#E53E3E",
      "badgeText": "🔥 PYROMANIAC ROGUE",
      "comicQuote": "There is nothing more beautiful than watching the world burn."
    },
    "tacticalNotes": "Inflicts continuous burning damage on ground zones and melts barriers.",
    "matchupStrengths": [
      "Cryo Attackers",
      "Plant Elementals"
    ],
    "matchupWeaknesses": [
      "Water Deluges",
      "Heavy Armor Tanks"
    ],
    "imageUrl": "/characters/heat-wave.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/320-heat-wave.jpg"
  },
  {
    "id": "red-tornado",
    "name": "Red Tornado",
    "alterEgo": "John Smith / Ulthoon",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 89,
      "strength": 86,
      "speed": 88,
      "durability": 88,
      "combat": 78,
      "range": 94,
      "intelligence": 88
    },
    "specialAbilities": [
      "F5 Tornado Vortex",
      "Air Pressure Cyclone",
      "Android Body Reconstruction",
      "Atmospheric Vacuum"
    ],
    "description": "Sentient android created by T.O. Morrow merged with the wind elemental Ulthoon. Can generate F5 tornadoes from his limbs to blow away armies.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "🌪️ ANDROID ELEMENTAL",
      "comicQuote": "I have human feelings, even if my body is made of gears."
    },
    "tacticalNotes": "Controls air currents to deflect projectiles and toss opponents across the arena.",
    "matchupStrengths": [
      "Ground Swarms",
      "Poison Gas / Clouds"
    ],
    "matchupWeaknesses": [
      "Heavy EMP Disruption",
      "Sub-Zero Freezing"
    ],
    "imageUrl": "/characters/red-tornado.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/551-red-tornado.jpg"
  },
  {
    "id": "captain-atom",
    "name": "Captain Atom",
    "alterEgo": "Nathaniel Adams",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 94,
      "speed": 90,
      "durability": 95,
      "combat": 82,
      "range": 97,
      "intelligence": 86
    },
    "specialAbilities": [
      "Quantum Field Blast",
      "Dilustel Metal Armor Invulnerability",
      "Energy Siphon Absorption",
      "Nuclear Detonation"
    ],
    "description": "Framed military pilot bonded to the alien metal Dilustel during a nuclear test. Taps directly into the Quantum Field with power rivaling Superman.",
    "visuals": {
      "primaryColor": "#718096",
      "accentColor": "#C53030",
      "badgeText": "⚛️ QUANTUM FIELD MASTER",
      "comicQuote": "I don't just channel energy. I am energy."
    },
    "tacticalNotes": "Absorbs enemy energy blasts to recharge his own quantum strike cannons.",
    "matchupStrengths": [
      "Energy Blasters",
      "Radiation Attackers"
    ],
    "matchupWeaknesses": [
      "Dilustel Armor Breaches causing quantum containment leaks"
    ],
    "imageUrl": "/characters/captain-atom.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/150-captain-atom.jpg"
  },
  {
    "id": "black-lightning",
    "name": "Black Lightning",
    "alterEgo": "Jefferson Pierce",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 87,
      "strength": 78,
      "speed": 82,
      "durability": 82,
      "combat": 86,
      "range": 92,
      "intelligence": 88
    },
    "specialAbilities": [
      "Bio-Electric Lightning Arc",
      "Forcefield Ion Barrier",
      "Supercharged Jump Kick",
      "Electromagnetic Levitation"
    ],
    "description": "Olympic decathlete and heroic educator Jefferson Pierce generates and manipulates powerful bio-electric lightning to defend his community.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#3182CE",
      "badgeText": "⚡ BIO-ELECTRIC GUARDIAN",
      "comicQuote": "Justice like lightning — strikes fast and leaves a mark."
    },
    "tacticalNotes": "Electric stun shocks bypass mechanical systems and paralyze nervous systems.",
    "matchupStrengths": [
      "Robotics",
      "Cyborgs",
      "Gang Enforcers"
    ],
    "matchupWeaknesses": [
      "Rubber / Grounded Insulators",
      "Heavy Rock Tanks"
    ],
    "imageUrl": "/characters/black-lightning.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/103-black-lightning.jpg"
  },
  {
    "id": "static",
    "name": "Static Shock",
    "alterEgo": "Virgil Hawkins",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 75,
      "speed": 85,
      "durability": 80,
      "combat": 82,
      "range": 93,
      "intelligence": 92
    },
    "specialAbilities": [
      "Electromagnetic Manhole Disc Flight",
      "Static Cling Taser",
      "EMP Pulse Burst",
      "Magnetic Metal Attraction"
    ],
    "description": "Gifted Dakota City teenager Virgil Hawkins wields complete electromagnetic control, surfing on metal manhole covers and magnetizing all surrounding debris.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#ECC94B",
      "badgeText": "⚡ DAKOTA CITY HERO",
      "comicQuote": "I put a shock to your system!"
    },
    "tacticalNotes": "Manipulates battlefield metal debris into shields and airborne projectiles.",
    "matchupStrengths": [
      "Gunmen",
      "Metal Armored Tanks",
      "Electronic Tech"
    ],
    "matchupWeaknesses": [
      "Insulated Non-Conductive Materials",
      "Submersion in Water"
    ],
    "imageUrl": "/characters/static.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/634-static.jpg"
  },
  {
    "id": "steel",
    "name": "Steel",
    "alterEgo": "Dr. John Henry Irons",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 90,
      "speed": 76,
      "durability": 91,
      "combat": 83,
      "range": 90,
      "intelligence": 95
    },
    "specialAbilities": [
      "Kinetic Hammer Throw",
      "Pneumatic Rocket Boost",
      "Chest Laser Rivet",
      "Magnetic Field Deflector"
    ],
    "description": "Inspired by Superman's sacrifice, weapons genius Dr. John Henry Irons forged an advanced mechanized suit and kinetic sledgehammer to fight injustice.",
    "visuals": {
      "primaryColor": "#718096",
      "accentColor": "#E53E3E",
      "badgeText": "🔨 MAN OF IRON",
      "comicQuote": "You don't need powers to be a hero. You just need the will to stand up."
    },
    "tacticalNotes": "Kinetic hammer gains damage the further it travels. Heavy armor deflects small arms.",
    "matchupStrengths": [
      "Street Crime",
      "Brutes"
    ],
    "matchupWeaknesses": [
      "EMP Disruption",
      "High-Tier Sorcery"
    ],
    "imageUrl": "/characters/steel.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/635-steel.jpg"
  },
  {
    "id": "stargirl",
    "name": "Stargirl",
    "alterEgo": "Courtney Whitmore",
    "universe": "DC Universe",
    "role": "Blaster",
    "rarity": "Rare",
    "stats": {
      "power": 84,
      "strength": 78,
      "speed": 82,
      "durability": 82,
      "combat": 80,
      "range": 91,
      "intelligence": 76
    },
    "specialAbilities": [
      "Cosmic Staff Stellar Beam",
      "Stellar Energy Forcefield",
      "High-Speed Aerial Loops",
      "Cosmic Converter Belt Punch"
    ],
    "description": "Inheritor of the Cosmic Staff and Starman's legacy, Courtney Whitmore commands stellar photon beams, flight, and protective forcefields with the JSA.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#ECC94B",
      "badgeText": "⭐ COSMIC STAFF CHAMPION",
      "comicQuote": "The stars shine brightest when the dark is deepest."
    },
    "tacticalNotes": "Cosmic staff shoots dazzling photon bursts that blind and knock back attackers.",
    "matchupStrengths": [
      "Shadow / Darkness Beings",
      "Infiltrators"
    ],
    "matchupWeaknesses": [
      "Disarming Cosmic Staff",
      "Brutal CQC Grapplers"
    ],
    "imageUrl": "/characters/stargirl.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/633-stargirl.jpg"
  },
  {
    "id": "lex-luthor",
    "name": "Lex Luthor",
    "alterEgo": "Alexander Joseph Luthor",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 93,
      "strength": 88,
      "speed": 78,
      "durability": 92,
      "combat": 84,
      "range": 93,
      "intelligence": 100
    },
    "specialAbilities": [
      "Warsuit Kryptonite Blaster",
      "Corporate Masterstroke",
      "Forcefield Grid Overload",
      "LuthorCorp War Drone"
    ],
    "description": "Apex human intellect and billionaire industrialist who views Superman as a threat to human potential. Battles demigods in his green-and-purple Warsuit.",
    "visuals": {
      "primaryColor": "#276749",
      "accentColor": "#6B46C1",
      "badgeText": "🧠 APEX HUMAN INTELLECT",
      "comicQuote": "I am a man. An ordinary man. And I will show the world a god can bleed."
    },
    "tacticalNotes": "100 Intelligence counters opposing formations. Warsuit delivers heavy tactical firepower.",
    "matchupStrengths": [
      "Kryptonians",
      "Predictable Superheroes",
      "Brutes"
    ],
    "matchupWeaknesses": [
      "Uncontrolled Berserkers",
      "Reality Manipulation"
    ],
    "imageUrl": "/characters/lex-luthor.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/405-lex-luthor.jpg"
  },
  {
    "id": "brainiac",
    "name": "Brainiac",
    "alterEgo": "Vril Dox of Colu",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Cosmic",
    "stats": {
      "power": 96,
      "strength": 89,
      "speed": 82,
      "durability": 94,
      "combat": 85,
      "range": 95,
      "intelligence": 100
    },
    "specialAbilities": [
      "12th-Level Intellect",
      "City Bottle Ray",
      "Skull Ship Cybernetic Blast",
      "Nanite Hive Assimilation"
    ],
    "description": "The Collector of Worlds from Colu. Possesses a 12th-level cybernetic intellect that shrinks and bottles civilizations before destroying their planets.",
    "visuals": {
      "primaryColor": "#2F855A",
      "accentColor": "#9B2C2C",
      "badgeText": "🌐 COLLECTOR OF WORLDS",
      "comicQuote": "I collect knowledge. And knowledge must be preserved through isolation."
    },
    "tacticalNotes": "Predicts every enemy turn with mathematical perfection. Traps heroes in shrink fields.",
    "matchupStrengths": [
      "Planetary Civilizations",
      "Conventional Technology"
    ],
    "matchupWeaknesses": [
      "Chaos Magic",
      "Illogical Wildcards"
    ],
    "imageUrl": "/characters/brainiac.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/136-brainiac.jpg"
  },
  {
    "id": "the-riddler",
    "name": "The Riddler",
    "alterEgo": "Edward Nygma",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Rare",
    "stats": {
      "power": 76,
      "strength": 60,
      "speed": 65,
      "durability": 68,
      "combat": 70,
      "range": 68,
      "intelligence": 98
    },
    "specialAbilities": [
      "Question Mark Cane Shock",
      "Death Trap Mechanism",
      "Riddle Me This Puzzle Debuff",
      "Laser Grid Maze"
    ],
    "description": "Obsessive genius who challenges Gotham's detective with elaborate puzzle death traps and cryptic riddles he narcissistically cannot resist leaving.",
    "visuals": {
      "primaryColor": "#276749",
      "accentColor": "#ECC94B",
      "badgeText": "❓ MASTER OF PUZZLES",
      "comicQuote": "Riddle me this, riddle me that... who's afraid of the big black bat?"
    },
    "tacticalNotes": "Places puzzle debuffs on enemies that delay or punish their ability activations.",
    "matchupStrengths": [
      "Slow Thinkers",
      "Predictable Detectives"
    ],
    "matchupWeaknesses": [
      "Direct Berserkers",
      "Instant Destruction"
    ],
    "imageUrl": "/characters/the-riddler.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/558-riddler.jpg"
  },
  {
    "id": "ras-al-ghul",
    "name": "Ra's al Ghul",
    "alterEgo": "Head of the Demon",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 90,
      "strength": 80,
      "speed": 82,
      "durability": 86,
      "combat": 96,
      "range": 75,
      "intelligence": 98
    },
    "specialAbilities": [
      "Lazarus Pit Immortality",
      "Scimitar Duelist Master",
      "League of Assassins Swarm",
      "Eco-Terrorist Bioweapon"
    ],
    "description": "The centuries-old Head of the Demon who has cleansed civilizations for over 600 years using the life-restoring Lazarus Pits and his global shadow army.",
    "visuals": {
      "primaryColor": "#234E52",
      "accentColor": "#ECC94B",
      "badgeText": "⚔️ HEAD OF THE DEMON",
      "comicQuote": "The Earth must be purged of its parasites so that nature may bloom anew."
    },
    "tacticalNotes": "Commands assassin swarms while parrying with 600 years of swordsmanship experience.",
    "matchupStrengths": [
      "Corrupt Governments",
      "Conventional Armies"
    ],
    "matchupWeaknesses": [
      "Lazarus Madness",
      "Batman's Code"
    ],
    "imageUrl": "/characters/ras-al-ghul.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/538-ras-al-ghul.jpg"
  },
  {
    "id": "the-question",
    "name": "The Question",
    "alterEgo": "Vic Sage / Charles Szasz",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Rare",
    "stats": {
      "power": 78,
      "strength": 70,
      "speed": 75,
      "durability": 74,
      "combat": 88,
      "range": 60,
      "intelligence": 94
    },
    "specialAbilities": [
      "Pseudoderm Faceless Mask",
      "Conspiracy Deduction",
      "Kung Fu Pressure Strike",
      "Smoke Gas Escape"
    ],
    "description": "Faceless investigative vigilante of Hub City who uncovers global conspiracies through relentless philosophical inquiry and martial combat.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#ECC94B",
      "badgeText": "❓ FACELESS INVESTIGATOR",
      "comicQuote": "Everything is connected. Even the aglets on shoelaces."
    },
    "tacticalNotes": "Disrupts enemy battle plans by exposing tactical conspiracies and weak links.",
    "matchupStrengths": [
      "Corrupt Conspiracies",
      "Infiltrators"
    ],
    "matchupWeaknesses": [
      "Overwhelming Superhuman Force"
    ],
    "imageUrl": "/characters/the-question.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/535-question.jpg"
  },
  {
    "id": "the-penguin",
    "name": "The Penguin",
    "alterEgo": "Oswald Chesterfield Cobblepot",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Common",
    "stats": {
      "power": 73,
      "strength": 62,
      "speed": 58,
      "durability": 70,
      "combat": 72,
      "range": 75,
      "intelligence": 90
    },
    "specialAbilities": [
      "Umbrella Machine Gun",
      "Helicopter Umbrella Escape",
      "Iceberg Lounge Underworld Network",
      "Poison Gas Umbrella Tip"
    ],
    "description": "Aristocratic mob lord of the Iceberg Lounge who commands Gotham's underworld black market with a lethal assortment of weaponized trick umbrellas.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#CBD5E0",
      "badgeText": "🐧 MOB KING OF GOTHAM",
      "comicQuote": "A gentleman never gets his hands dirty when he can pay someone to do it for him."
    },
    "tacticalNotes": "Supplies allies with black-market buffs and surprises enemies with trick umbrellas.",
    "matchupStrengths": [
      "Street Thugs",
      "Bribeable Rogues"
    ],
    "matchupWeaknesses": [
      "Superhuman Heavyweights"
    ],
    "imageUrl": "/characters/the-penguin.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/514-penguin.jpg"
  },
  {
    "id": "two-face",
    "name": "Two-Face",
    "alterEgo": "Harvey Dent",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Rare",
    "stats": {
      "power": 76,
      "strength": 68,
      "speed": 68,
      "durability": 72,
      "combat": 78,
      "range": 78,
      "intelligence": 88
    },
    "specialAbilities": [
      "Double-Headed Coin Toss",
      "Dual Tommy Gun Fire",
      "Duality Ambush",
      "Acid Burn Traumatic Surge"
    ],
    "description": "Former District Attorney whose scarred face fractured his psyche into a dual persona that leaves all life-or-death decisions to the flip of a scarred silver dollar.",
    "visuals": {
      "primaryColor": "#4A5568",
      "accentColor": "#E53E3E",
      "badgeText": "🪙 AGENT OF DUALITY",
      "comicQuote": "You either die a hero, or you live long enough to see yourself become the villain."
    },
    "tacticalNotes": "Coin flip mechanic triggers 50/50 chance of double critical damage or defensive gambits.",
    "matchupStrengths": [
      "Predictable Legal Systems",
      "Law Enforcement"
    ],
    "matchupWeaknesses": [
      "Coin Interception",
      "Superhumans"
    ],
    "imageUrl": "/characters/two-face.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/678-two-face.jpg"
  },
  {
    "id": "general-zod",
    "name": "General Zod",
    "alterEgo": "Dru-Zod of Krypton",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 97,
      "strength": 98,
      "speed": 94,
      "durability": 97,
      "combat": 96,
      "range": 92,
      "intelligence": 95
    },
    "specialAbilities": [
      "Kryptonian Military Command",
      "Heat Vision Barrage",
      "Phantom Zone Rift",
      "Kneel Before Zod Aura"
    ],
    "description": "Supreme military commander of Krypton. Combines full yellow-sun Superman-level superpowers with a lifetime of merciless military combat leadership.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#9B2C2C",
      "badgeText": "👑 KRYPTONIAN GENERAL",
      "comicQuote": "KNEEL BEFORE ZOD!"
    },
    "tacticalNotes": "Boosts all ally attack stats with military command aura while hitting like Superman.",
    "matchupStrengths": [
      "Militaries",
      "Inexperienced Superheroes",
      "Brutes"
    ],
    "matchupWeaknesses": [
      "Red Sun Radiation",
      "Phantom Zone Banishment"
    ],
    "imageUrl": "/characters/general-zod.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/278-general-zod.jpg"
  },
  {
    "id": "joker",
    "name": "The Joker",
    "alterEgo": "Unknown / Jack Oswald White",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 88,
      "strength": 70,
      "speed": 78,
      "durability": 85,
      "combat": 86,
      "range": 82,
      "intelligence": 98
    },
    "specialAbilities": [
      "Joker Venom Asphyxiation",
      "Acid Lapel Flower Spritz",
      "Joy Buzzer Lethal Shock",
      "Agent of Pure Chaos"
    ],
    "description": "The Clown Prince of Crime and Batman's ultimate antithesis. An unpredictable psychopathic genius whose lethal Joker Venom leaves victims dying with a grotesque rictus grin.",
    "visuals": {
      "primaryColor": "#553C9A",
      "accentColor": "#38A169",
      "badgeText": "🃏 CLOWN PRINCE OF CRIME",
      "comicQuote": "Why so serious? Let's put a smile on that face!"
    },
    "tacticalNotes": "Unpredictable chaos mechanics scramble opponent turn orders and plans.",
    "matchupStrengths": [
      "Orderly Strategists",
      "Moral Heroes"
    ],
    "matchupWeaknesses": [
      "Ruthless Non-Hesitant Lethal Assassins"
    ],
    "imageUrl": "/characters/joker.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/370-joker.jpg"
  },
  {
    "id": "harley-quinn",
    "name": "Harley Quinn",
    "alterEgo": "Dr. Harleen Quinzel",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 84,
      "strength": 75,
      "speed": 86,
      "durability": 78,
      "combat": 88,
      "range": 80,
      "intelligence": 91
    },
    "specialAbilities": [
      "Oversized Mallet Whack",
      "Pop-Gun Cork Blast",
      "Acrobatic Gymnastics Evasion",
      "Toxin Immunity Boost"
    ],
    "description": "Former Arkham psychiatrist turned chaotic anti-hero and Suicide Squad MVP. Armed with an oversized wooden mallet, toxin immunity, and wild unpredictable acrobatics.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#1A202C",
      "badgeText": "🔨 MAID OF MISCHIEF",
      "comicQuote": "You think I'm just a doll you can arrange any way you like? You're wrong."
    },
    "tacticalNotes": "Psychological analysis throws enemies off guard while mallet smashes physical defenses.",
    "matchupStrengths": [
      "Predictable Lawmen",
      "Serious Fighters"
    ],
    "matchupWeaknesses": [
      "Godlike Speedsters",
      "Cosmic Beings"
    ],
    "imageUrl": "/characters/harley-quinn.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/309-harley-quinn.jpg"
  },
  {
    "id": "scarecrow",
    "name": "Scarecrow",
    "alterEgo": "Dr. Jonathan Crane",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 65,
      "speed": 70,
      "durability": 72,
      "combat": 76,
      "range": 85,
      "intelligence": 95
    },
    "specialAbilities": [
      "Fear Toxin Hallucination",
      "Scythe Reaping Slash",
      "Phobia Induction Neuro-Gas",
      "Nightmare Panic Aura"
    ],
    "description": "Former psychology professor who weaponized terror through his aerosol Fear Toxin, forcing victims to relive their deepest, most paralyzing phobias.",
    "visuals": {
      "primaryColor": "#744210",
      "accentColor": "#ECC94B",
      "badgeText": "🎃 MASTER OF FEAR",
      "comicQuote": "Fear is the only true god of this world!"
    },
    "tacticalNotes": "Fear Toxin causes enemies to hallucinate and attack their own teammates.",
    "matchupStrengths": [
      "Heroes with Hidden Traumas",
      "Organic Beings"
    ],
    "matchupWeaknesses": [
      "Gas Masked Opponents",
      "Robots / Synths",
      "Fearless Beings"
    ],
    "imageUrl": "/characters/scarecrow.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/576-scarecrow.jpg"
  },
  {
    "id": "mister-freeze",
    "name": "Mister Freeze",
    "alterEgo": "Dr. Victor Fries",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 86,
      "strength": 84,
      "speed": 65,
      "durability": 90,
      "combat": 78,
      "range": 91,
      "intelligence": 96
    },
    "specialAbilities": [
      "Cryo-Suit Sub-Zero Armor",
      "Freeze Ray Glacier Blast",
      "Permafrost Area Snare",
      "Nora's Ice Heart Drive"
    ],
    "description": "Cryogenics genius whose body temperature was forced down to sub-zero after an industrial accident while trying to save his terminally ill wife Nora in cryostasis.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#E2E8F0",
      "badgeText": "🧊 CRYOGENIC MASTERMIND",
      "comicQuote": "Think of it, Batman: to never again walk on a summer's day..."
    },
    "tacticalNotes": "Freeze ray immobilizes front-line brawlers in solid blocks of ice.",
    "matchupStrengths": [
      "Organic Brawlers",
      "Speedsters on slippery surfaces"
    ],
    "matchupWeaknesses": [
      "Extreme Thermal Heat",
      "Cryo-Suit Helmet Breach"
    ],
    "imageUrl": "/characters/mister-freeze.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/457-mister-freeze.jpg"
  },
  {
    "id": "poison-ivy",
    "name": "Poison Ivy",
    "alterEgo": "Dr. Pamela Lillian Isley",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 89,
      "strength": 75,
      "speed": 74,
      "durability": 80,
      "combat": 78,
      "range": 92,
      "intelligence": 95
    },
    "specialAbilities": [
      "Pheromone Mind Seduction",
      "Carnivorous Plant Vine Entangle",
      "Toxic Spore Cloud",
      "Chlorokinesis Wave"
    ],
    "description": "Botanist turned eco-terrorist who controls all plant life and secretes mind-controlling pheromones capable of enslaving even Superman.",
    "visuals": {
      "primaryColor": "#2F855A",
      "accentColor": "#E53E3E",
      "badgeText": "🌺 FLORA HYBRID GODDESS",
      "comicQuote": "Nature always wins."
    },
    "tacticalNotes": "Pheromone kiss turns highest-stat enemy fighter into her loyal protector.",
    "matchupStrengths": [
      "Male Superhumans",
      "Organic Fighters"
    ],
    "matchupWeaknesses": [
      "Fire / Defoliants",
      "Robots / Non-Biological Constructs"
    ],
    "imageUrl": "/characters/poison-ivy.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/522-poison-ivy.jpg"
  },
  {
    "id": "ozymandias",
    "name": "Ozymandias",
    "alterEgo": "Adrian Veidt",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Legendary",
    "stats": {
      "power": 92,
      "strength": 82,
      "speed": 90,
      "durability": 82,
      "combat": 98,
      "range": 82,
      "intelligence": 100
    },
    "specialAbilities": [
      "35 Minutes Ago Execution",
      "Bullet Catch Reflexes",
      "Global Geopolitical Trap",
      "Genius Martial Perfection"
    ],
    "description": "The smartest man in the world from Watchmen. Can catch speeding bullets with his bare hands and executes plans \"thirty-five minutes ago\" before foes even realize.",
    "visuals": {
      "primaryColor": "#744210",
      "accentColor": "#9F7AEA",
      "badgeText": "👑 SMARTEST MAN ON EARTH",
      "comicQuote": "I did it thirty-five minutes ago."
    },
    "tacticalNotes": "Predicts opposing actions and executes counter-moves ahead of enemy turns.",
    "matchupStrengths": [
      "Conventional Superheroes",
      "Political Leaders"
    ],
    "matchupWeaknesses": [
      "Cosmic Omnipresent Deities like Dr. Manhattan"
    ],
    "imageUrl": "/characters/ozymandias.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/508-ozymandias.jpg"
  },
  {
    "id": "rorschach",
    "name": "Rorschach",
    "alterEgo": "Walter Joseph Kovacs",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Epic",
    "stats": {
      "power": 82,
      "strength": 74,
      "speed": 76,
      "durability": 82,
      "combat": 92,
      "range": 65,
      "intelligence": 88
    },
    "specialAbilities": [
      "Improvised Weapon Lethality",
      "Shifting Inkblot Mask Intimidation",
      "Grappling Gun Stun",
      "Never Compromise Unbreakable Will"
    ],
    "description": "Uncompromising masked vigilante whose shifting inkblot mask reflects his black-and-white moral universe. Fights with savage street-brawling ingenuity and zero fear.",
    "visuals": {
      "primaryColor": "#744210",
      "accentColor": "#CBD5E0",
      "badgeText": "🎭 UNCOMPROMISING VIGILANTE",
      "comicQuote": "None of you seem to understand. I'm not locked in here with you. You're locked in here with me!"
    },
    "tacticalNotes": "Refuses to break under mental torture or debuffs. Turns surrounding items into lethal weapons.",
    "matchupStrengths": [
      "Criminal Underworld",
      "Deceptive Rogues"
    ],
    "matchupWeaknesses": [
      "Superhuman Planetary Forces"
    ],
    "imageUrl": "/characters/rorschach.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/569-rorschach.jpg"
  },
  {
    "id": "the-comedian",
    "name": "The Comedian",
    "alterEgo": "Edward Blake",
    "universe": "DC Universe",
    "role": "Tactician",
    "rarity": "Rare",
    "stats": {
      "power": 80,
      "strength": 78,
      "speed": 72,
      "durability": 78,
      "combat": 89,
      "range": 88,
      "intelligence": 84
    },
    "specialAbilities": [
      "Flamethrower & Riot Shotgun",
      "Cynical Dirty Fighting",
      "Smiley Face Badge Morale Strike",
      "Military Spec-Ops Ambush"
    ],
    "description": "Government operative from the Minutemen and Watchmen. Cynical, ruthless, and armed with military combat shotguns, knives, and an iconic blood-splattered smiley badge.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#ECC94B",
      "badgeText": "🙂 SMILEY FACE OPERATIVE",
      "comicQuote": "Once you figure out what a joke everything is, being the Comedian is the only thing that makes sense."
    },
    "tacticalNotes": "Dirty fighting tactics blind enemies and disregard normal combat etiquette.",
    "matchupStrengths": [
      "Idealistic Heroes",
      "Guerrilla Armies"
    ],
    "matchupWeaknesses": [
      "Superhuman Tanks",
      "Bulletproof Meta-beings"
    ],
    "imageUrl": "/characters/the-comedian.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/657-the-comedian.jpg"
  },
  {
    "id": "the-flash",
    "name": "The Flash (Barry)",
    "alterEgo": "Bartholomew Henry Allen",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 80,
      "speed": 100,
      "durability": 85,
      "combat": 88,
      "range": 85,
      "intelligence": 94
    },
    "specialAbilities": [
      "Infinite Mass Punch",
      "Speed Force Phasing",
      "Time Remnant Blitz",
      "Supersonic Tornado Spin"
    ],
    "description": "Struck by lightning and chemicals, forensic scientist Barry Allen tapped into the Speed Force, becoming the Fastest Man Alive capable of outrunning time and death.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "⚡ THE FASTEST MAN ALIVE",
      "comicQuote": "Life is locomotion. If you're not moving, you're not living."
    },
    "tacticalNotes": "Speed 100 ensures acting first every round. Infinite Mass Punch bypasses invulnerability.",
    "matchupStrengths": [
      "Slow Tanks",
      "Projectiles",
      "Physical Bruisers"
    ],
    "matchupWeaknesses": [
      "Absolute Zero Cold Fields",
      "Temporal Paradoxes"
    ],
    "imageUrl": "/characters/the-flash.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/265-flash-ii.jpg"
  },
  {
    "id": "reverse-flash",
    "name": "Reverse-Flash",
    "alterEgo": "Professor Eobard Thawne",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 82,
      "speed": 100,
      "durability": 86,
      "combat": 90,
      "range": 86,
      "intelligence": 98
    },
    "specialAbilities": [
      "Negative Speed Force Lightning",
      "Time Paradox Immortality",
      "Vibrational Heart Stop",
      "Timeline Erasure"
    ],
    "description": "25th-century scientist obsessed with Barry Allen who generated the Negative Speed Force. Exists as a living paradox who cannot be erased from reality.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#E53E3E",
      "badgeText": "⚡ LIVING TIMELINE PARADOX",
      "comicQuote": "It was me, Barry! I was the one who made your life a living hell!"
    },
    "tacticalNotes": "Cannot be permanently defeated in standard turns due to paradox temporal clones.",
    "matchupStrengths": [
      "Heroes with Fixed Timelines",
      "Standard Speedsters"
    ],
    "matchupWeaknesses": [
      "Speed Force Singularity Dissolution"
    ],
    "imageUrl": "/characters/reverse-flash.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/528-professor-zoom.jpg"
  },
  {
    "id": "wally-west",
    "name": "The Flash (Wally)",
    "alterEgo": "Wallace Rudolph West",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Legendary",
    "stats": {
      "power": 97,
      "strength": 82,
      "speed": 100,
      "durability": 86,
      "combat": 90,
      "range": 88,
      "intelligence": 90
    },
    "specialAbilities": [
      "Speed Steal",
      "Speed Force Construct Armor",
      "Multiversal Sprint",
      "Chain Lightning Flurry"
    ],
    "description": "Former Kid Flash who surpassed Barry Allen to become the fastest being in the entire DC Multiverse, capable of running faster than instantaneous teleportation.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#CBD5E0",
      "badgeText": "⚡ SPEED FORCE MAIN ENGINE",
      "comicQuote": "I don't just run through the Speed Force. The Speed Force runs through me."
    },
    "tacticalNotes": "Speed Steal siphons enemy speed, rendering fast opponents completely paralyzed.",
    "matchupStrengths": [
      "Speedsters",
      "High Mobility Infiltrators"
    ],
    "matchupWeaknesses": [
      "Emotional Anchors Disruption"
    ],
    "imageUrl": "/characters/wally-west.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/266-flash-iii.jpg"
  },
  {
    "id": "kid-flash",
    "name": "Kid Flash",
    "alterEgo": "Wallace West II",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Epic",
    "stats": {
      "power": 88,
      "strength": 74,
      "speed": 96,
      "durability": 80,
      "combat": 82,
      "range": 80,
      "intelligence": 85
    },
    "specialAbilities": [
      "Silver Lightning Burst",
      "Sonic Boom Kick",
      "Youthful Speed Force Dash",
      "Whirlwind Deflection"
    ],
    "description": "Member of the Teen Titans connected to the Speed Force through Daniel West. A loyal sidekick who zips through battlefields disarming bombs and rescuing civilians.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#E53E3E",
      "badgeText": "⚡ TEEN SPEEDSTER",
      "comicQuote": "Wait up! ...Just kidding, I'm already five laps ahead of you."
    },
    "tacticalNotes": "High mobility speedster capable of disarming traps and picking off support units.",
    "matchupStrengths": [
      "Slow Snipers",
      "Heavy Bruisers"
    ],
    "matchupWeaknesses": [
      "Inexperience against Master Sorcerers"
    ],
    "imageUrl": "/characters/kid-flash.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/384-kid-flash.jpg"
  },
  {
    "id": "impulse",
    "name": "Impulse",
    "alterEgo": "Bartholomew Allen II",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Rare",
    "stats": {
      "power": 86,
      "strength": 70,
      "speed": 98,
      "durability": 78,
      "combat": 78,
      "range": 80,
      "intelligence": 82
    },
    "specialAbilities": [
      "Vibrational Speed Scout Clone",
      "Hyperactive Punch Flurry",
      "Speed Force Tornado Catch",
      "ADHD Reflex Surge"
    ],
    "description": "Barry Allen's grandson from the 30th century, born with hyper-accelerated metabolism. Impulsive, chaotic, and lightning fast, Bart acts before thinking.",
    "visuals": {
      "primaryColor": "#E2E8F0",
      "accentColor": "#E53E3E",
      "badgeText": "⚡ 30TH CENTURY SPEED PRODIGY",
      "comicQuote": "Think later, run NOW!"
    },
    "tacticalNotes": "Can create speed clones to scout and distract enemy frontline tanks.",
    "matchupStrengths": [
      "Trapped Arenas",
      "Predictable Strategy"
    ],
    "matchupWeaknesses": [
      "Calm Psychological Trickery"
    ],
    "imageUrl": "/characters/impulse.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/340-impulse.jpg"
  },
  {
    "id": "zoom",
    "name": "Zoom",
    "alterEgo": "Hunter Zolomon",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 86,
      "speed": 100,
      "durability": 90,
      "combat": 91,
      "range": 82,
      "intelligence": 92
    },
    "specialAbilities": [
      "Relative Time Manipulation",
      "Sonic Boom Finger Snap",
      "Tragedy Induction Beating",
      "Timeline Acceleration"
    ],
    "description": "Unlike standard Speedsters, Hunter Zolomon does not use the Speed Force; he manipulates his own timeline, moving relative to the universe at speeds that baffle even the Flash.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#C53030",
      "badgeText": "⏳ MASTER OF PERSONAL TIME",
      "comicQuote": "I can make you a better hero... through tragedy."
    },
    "tacticalNotes": "Cannot have his speed stolen because he manipulates time itself rather than running.",
    "matchupStrengths": [
      "Speedsters",
      "Kinetic Absorbers"
    ],
    "matchupWeaknesses": [
      "Total Temporal Freezes",
      "Reality Warping"
    ],
    "imageUrl": "/characters/zoom.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/731-zoom.jpg"
  },
  {
    "id": "black-flash",
    "name": "Black Flash",
    "alterEgo": "Avatar of Speed Force Death",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Cosmic",
    "stats": {
      "power": 98,
      "strength": 90,
      "speed": 100,
      "durability": 98,
      "combat": 92,
      "range": 85,
      "intelligence": 80
    },
    "specialAbilities": [
      "Touch of Death",
      "Speed Force Reaping",
      "Dimensional Phase Shift",
      "Inevitable Pursuit"
    ],
    "description": "The Grim Reaper of the Speed Force, sent to claim speedsters when their time has expired. Inescapable, relentless, and possessing an instant fatal death touch.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#E53E3E",
      "badgeText": "💀 GRIM REAPER OF SPEED",
      "comicQuote": "Death comes for all. For speedsters, it comes running."
    },
    "tacticalNotes": "Touch of death inflicts fatal true damage bypassing physical armor.",
    "matchupStrengths": [
      "Mortal Speedsters",
      "Biological Targets"
    ],
    "matchupWeaknesses": [
      "Running past the End of Time / Heat Death of the Universe"
    ],
    "imageUrl": "/characters/black-flash.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/100-black-flash.jpg"
  },
  {
    "id": "jay-garrick",
    "name": "The Flash (Jay)",
    "alterEgo": "Jason Peter Garrick",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Epic",
    "stats": {
      "power": 90,
      "strength": 78,
      "speed": 95,
      "durability": 84,
      "combat": 89,
      "range": 82,
      "intelligence": 92
    },
    "specialAbilities": [
      "Mercury Helmet Ricochet",
      "Hard Water Vapors Speed",
      "Decades of JSA Experience",
      "Slipstream Vacuum"
    ],
    "description": "The Golden Age original Flash who inhaled hard water vapors to gain superspeed in 1940. Founding pillar of the Justice Society of America with veteran battle wisdom.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#3182CE",
      "badgeText": "⚡ GOLDEN AGE ORIGINAL FLASH",
      "comicQuote": "Keep your chin up, son. The fight isn't over until we say it is."
    },
    "tacticalNotes": "Mercury helmet ricochet acts as an unexpected physical projectile mid-dash.",
    "matchupStrengths": [
      "Reckless Young Fighters",
      "Axis Threats"
    ],
    "matchupWeaknesses": [
      "Exotic Alien Energy Weapons"
    ],
    "imageUrl": "/characters/jay-garrick.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg"
  },
  {
    "id": "superboy",
    "name": "Superboy",
    "alterEgo": "Kon-El / Conner Kent",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Epic",
    "stats": {
      "power": 91,
      "strength": 92,
      "speed": 92,
      "durability": 90,
      "combat": 85,
      "range": 86,
      "intelligence": 82
    },
    "specialAbilities": [
      "Tactile Telekinesis Shield",
      "TTK Disassembly Field",
      "Supersonic Flyby Slam",
      "Half-Kryptonian Heat Vision"
    ],
    "description": "Clone created from the DNA of Superman and Lex Luthor. Wields unique Tactile Telekinesis that allows him to fly at hypersonic speeds and dismantle objects by touch.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#E53E3E",
      "badgeText": "⚡ TACTILE TELEKINETIC HERO",
      "comicQuote": "Don't touch the leather jacket!"
    },
    "tacticalNotes": "Tactile telekinesis breaks down opposing weapons and armor while flying at mach speeds.",
    "matchupStrengths": [
      "Machinery",
      "Melee Tanks"
    ],
    "matchupWeaknesses": [
      "Telepathic Assault",
      "Kryptonite / Magic"
    ],
    "imageUrl": "/characters/superboy.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/641-superboy.jpg"
  },
  {
    "id": "supergirl",
    "name": "Supergirl",
    "alterEgo": "Kara Zor-El",
    "universe": "DC Universe",
    "role": "Speedster",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 98,
      "speed": 96,
      "durability": 96,
      "combat": 88,
      "range": 90,
      "intelligence": 86
    },
    "specialAbilities": [
      "Hyperspeed Bullrush",
      "Supergirl Sunburst Flare",
      "Freeze Breath Gale",
      "Kryptonian Flight Blitz"
    ],
    "description": "Superman's cousin from Argo City. Having spent years trapped in suspended animation, Kara has raw Kryptonian solar power that often burns even brighter than Kal-El's.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#E53E3E",
      "badgeText": "💫 WOMAN OF TOMORROW",
      "comicQuote": "I remember Krypton. I lost everything once. I won't lose this world too."
    },
    "tacticalNotes": "Unrivaled combination of Kryptonian physical strike power and hypersonic flight.",
    "matchupStrengths": [
      "Bruisers",
      "Invasion Armadas",
      "Tech Titans"
    ],
    "matchupWeaknesses": [
      "Magic / Mystical Curses",
      "Red Solar Radiation"
    ],
    "imageUrl": "/characters/supergirl.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/643-supergirl.jpg"
  },
  {
    "id": "doctor-fate",
    "name": "Doctor Fate",
    "alterEgo": "Kent Nelson",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 98,
      "strength": 80,
      "speed": 84,
      "durability": 95,
      "combat": 85,
      "range": 98,
      "intelligence": 99
    },
    "specialAbilities": [
      "Helmet of Nabu Egyptian Spell",
      "Ankh Symbol Dimensional Ward",
      "Order Magic Disintegration",
      "Tower of Fate Banishment"
    ],
    "description": "Agent of the Lords of Order empowered by the golden Helmet of Nabu, Cloak of Destiny, and Amulet of Anubis. Master of ancient Egyptian cosmic sorcery.",
    "visuals": {
      "primaryColor": "#2B6CB0",
      "accentColor": "#D69E2E",
      "badgeText": "✨ LORD OF ORDER",
      "comicQuote": "Fate is inevitable. Nabu has decreed it."
    },
    "tacticalNotes": "Ankh wards block cosmic reality warping and banish chaos sorcerers.",
    "matchupStrengths": [
      "Chaos Sorcerers",
      "Demons",
      "Undead"
    ],
    "matchupWeaknesses": [
      "Separation from the Helmet of Nabu"
    ],
    "imageUrl": "/characters/doctor-fate.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/224-doctor-fate.jpg"
  },
  {
    "id": "zatanna",
    "name": "Zatanna",
    "alterEgo": "Zatanna Zatara",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Legendary",
    "stats": {
      "power": 95,
      "strength": 65,
      "speed": 80,
      "durability": 80,
      "combat": 82,
      "range": 97,
      "intelligence": 96
    },
    "specialAbilities": [
      "Backward Speech Reality Warp",
      "Stage Magic Transmutation",
      "Mystic Healing Light",
      "Extinguish the Void"
    ],
    "description": "Homo Magi illusionist who casts universe-altering spells by speaking words backward (\"pots emit\", \"llik mih\"). The premier mystic of Justice League Dark.",
    "visuals": {
      "primaryColor": "#1A202C",
      "accentColor": "#E2E8F0",
      "badgeText": "🎩 MISTRESS OF MAGIC",
      "comicQuote": "!pots emit !enob ym ot yaw eht lla nrub"
    },
    "tacticalNotes": "Backward speech allows bending physical rules: turning swords into doves, reversing damage.",
    "matchupStrengths": [
      "Physical Brawlers",
      "Tech Giants",
      "Curse Users"
    ],
    "matchupWeaknesses": [
      "Gagging / Vocal Prevention",
      "Rapid Silence Charms"
    ],
    "imageUrl": "/characters/zatanna.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/730-zatanna.jpg"
  },
  {
    "id": "john-constantine",
    "name": "John Constantine",
    "alterEgo": "Hellblazer",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Epic",
    "stats": {
      "power": 92,
      "strength": 68,
      "speed": 75,
      "durability": 84,
      "combat": 80,
      "range": 92,
      "intelligence": 99
    },
    "specialAbilities": [
      "Demon Blood Synchronicities",
      "Hellfire Banishment Seal",
      "Exorcism Sigil Rite",
      "Trenchcoat Con-Artist Gambits"
    ],
    "description": "Working-class occult detective and cynical con-artist whose demonic blood and synchronous luck allow him to outwit the devil himself.",
    "visuals": {
      "primaryColor": "#D69E2E",
      "accentColor": "#9B2C2C",
      "badgeText": "🚬 HELLBLAZER OCCULTIST",
      "comicQuote": "I'm the one who steps from the shadows, all trenchcoat and arrogance."
    },
    "tacticalNotes": "Sacrifices lesser tokens or trick sigils to banish elite demons and cosmic threats.",
    "matchupStrengths": [
      "Demons",
      "Arrogant Sorcerers",
      "Deals with the Devil"
    ],
    "matchupWeaknesses": [
      "Unthinking Brutes who don't listen to talk"
    ],
    "imageUrl": "/characters/john-constantine.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/367-john-constantine.jpg"
  },
  {
    "id": "raven",
    "name": "Raven",
    "alterEgo": "Rachel Roth",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 72,
      "speed": 82,
      "durability": 88,
      "combat": 84,
      "range": 96,
      "intelligence": 92
    },
    "specialAbilities": [
      "Soul-Self Giant Shadow Raven",
      "Empathic Pain Absorption",
      "Dark Energy Banishment",
      "Azarath Metrion Zinthos"
    ],
    "description": "Daughter of the demonic conqueror Trigon. Raven suppresses her terrifying infernal inheritance to channel her astral Soul-Self as the mystic anchor of the Teen Titans.",
    "visuals": {
      "primaryColor": "#44337A",
      "accentColor": "#3182CE",
      "badgeText": "🔮 DAUGHTER OF TRIGON",
      "comicQuote": "Azarath. Metrion. Zinthos!"
    },
    "tacticalNotes": "Her astral Soul-Self envelops and incapacitates multiple opponents simultaneously.",
    "matchupStrengths": [
      "Psionic Foes",
      "Demonic Minions",
      "Emotional Attackers"
    ],
    "matchupWeaknesses": [
      "Surrendering to Inner Trigon Demonic Rage"
    ],
    "imageUrl": "/characters/raven.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/542-raven.jpg"
  },
  {
    "id": "etrigan",
    "name": "Etrigan the Demon",
    "alterEgo": "Jason Blood",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Epic",
    "stats": {
      "power": 93,
      "strength": 95,
      "speed": 78,
      "durability": 95,
      "combat": 89,
      "range": 88,
      "intelligence": 86
    },
    "specialAbilities": [
      "Hellfire Exhalation",
      "Rhyming Incantation Curse",
      "Demon Claws of Belial",
      "Immortal Arthurian Armor"
    ],
    "description": "Demon of the Rhyming Caste summoned from Hell by Merlin and bonded to the immortal knight Jason Blood. Speaks in verse and breathes searing hellfire.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "🔥 HELLFIRE RHYMING DEMON",
      "comicQuote": "Gone, gone the form of man, rise the demon Etrigan!"
    },
    "tacticalNotes": "Rare hybrid of a durable physical tank and high-tier hellfire sorcerer.",
    "matchupStrengths": [
      "Holy Warriors who lack holy relics",
      "Mortal Men"
    ],
    "matchupWeaknesses": [
      "Holy Water",
      "Merlin's Binding Spells"
    ],
    "imageUrl": "/characters/etrigan.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/246-etrigan.jpg"
  },
  {
    "id": "the-spectre",
    "name": "The Spectre",
    "alterEgo": "Jim Corrigan / Wrath of God",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 99,
      "strength": 99,
      "speed": 92,
      "durability": 99,
      "combat": 88,
      "range": 100,
      "intelligence": 98
    },
    "specialAbilities": [
      "Divine Judgment Smite",
      "Cosmic Transmutation of Evildoers",
      "Reality Reshaping Wrath",
      "Omnipresent Spirit Phase"
    ],
    "description": "The cosmic embodiment of the Wrath of God bonded to murdered police detective Jim Corrigan. Wields near-omnipotent reality-altering divine retribution.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#E2E8F0",
      "badgeText": "⚖️ AVATAR OF DIVINE WRATH",
      "comicQuote": "The judgment of the Spectre has fallen upon thee!"
    },
    "tacticalNotes": "Near-limitless reality manipulation inflicts fatal divine retribution on evil combatants.",
    "matchupStrengths": [
      "Villains",
      "Killers",
      "Unholy Fiends"
    ],
    "matchupWeaknesses": [
      "Divine Limits mandated by the Source / The Presence"
    ],
    "imageUrl": "/characters/the-spectre.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/613-spectre.jpg"
  },
  {
    "id": "enchantress-dc",
    "name": "Enchantress",
    "alterEgo": "June Moone",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Epic",
    "stats": {
      "power": 92,
      "strength": 70,
      "speed": 78,
      "durability": 82,
      "combat": 78,
      "range": 95,
      "intelligence": 89
    },
    "specialAbilities": [
      "Chaos Hex Bolt",
      "Polymorphic Curse Transmutation",
      "Shadow Teleportation",
      "Mystic Inversion Barrier"
    ],
    "description": "Freelance artist June Moone possessed by an ancient succubus entity. Shouting \"Enchantress\" transforms her into a chaotic, green-glowing sorceress.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#48BB78",
      "badgeText": "🪄 PRIMAL ENCHANTRESS",
      "comicQuote": "I have waited thousands of years for this dance."
    },
    "tacticalNotes": "Chaotic hex bolts scramble enemy targeting and transmute objects into barriers.",
    "matchupStrengths": [
      "Non-Magical Brawlers",
      "Soldiers"
    ],
    "matchupWeaknesses": [
      "Separation from June Moone host"
    ],
    "imageUrl": "/characters/enchantress-dc.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/242-enchantress.jpg"
  },
  {
    "id": "deadman",
    "name": "Deadman",
    "alterEgo": "Boston Brand",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Rare",
    "stats": {
      "power": 85,
      "strength": 65,
      "speed": 85,
      "durability": 95,
      "combat": 85,
      "range": 75,
      "intelligence": 82
    },
    "specialAbilities": [
      "Ghostly Body Possession",
      "Intangible Spirit Phase",
      "Acrobatic Trapeze Instinct",
      "Rama Kushna Karma Shield"
    ],
    "description": "Murdered circus trapeze artist granted by the goddess Rama Kushna the power to roam as a ghost and possess the bodies of the living to fight injustice.",
    "visuals": {
      "primaryColor": "#9B2C2C",
      "accentColor": "#E2E8F0",
      "badgeText": "👻 POSSESSING SPIRIT",
      "comicQuote": "Boo! Did I scare ya? Good thing you can't hit what ain't there."
    },
    "tacticalNotes": "Possesses enemy units to force friendly fire while remaining immune to physical strikes.",
    "matchupStrengths": [
      "Physical Strikers without mystical wards"
    ],
    "matchupWeaknesses": [
      "Anti-Astral Containment Wards",
      "Demon Exorcisms"
    ],
    "imageUrl": "/characters/deadman.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/212-deadman.jpg"
  },
  {
    "id": "dr-manhattan",
    "name": "Dr. Manhattan",
    "alterEgo": "Dr. Jonathan Osterman",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Cosmic",
    "stats": {
      "power": 100,
      "strength": 99,
      "speed": 96,
      "durability": 100,
      "combat": 85,
      "range": 100,
      "intelligence": 100
    },
    "specialAbilities": [
      "Sub-Atomic Disassembly",
      "Simultaneous Omnipresence",
      "Timeline Rewriting",
      "Cosmic Quantum Intrinsic Field"
    ],
    "description": "Disintegrated in an Intrinsic Field Subtractor, physicist Jon Osterman reconstituted as a godlike blue being existing simultaneously across all moments in time.",
    "visuals": {
      "primaryColor": "#3182CE",
      "accentColor": "#63B3ED",
      "badgeText": "⚛️ BLUE QUANTUM DEITY",
      "comicQuote": "I have walked across the surface of the sun. I have witnessed events so tiny and so fast..."
    },
    "tacticalNotes": "Can instantaneously disassemble any opponent at the atomic level. Omnipresent.",
    "matchupStrengths": [
      "Virtually all existence"
    ],
    "matchupWeaknesses": [
      "Tachyons obscuring precognition",
      "Apathetic Detachment"
    ],
    "imageUrl": "/characters/dr-manhattan.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/233-dr-manhattan.jpg"
  },
  {
    "id": "martian-manhunter",
    "name": "Martian Manhunter",
    "alterEgo": "J'onn J'onzz",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 97,
      "speed": 92,
      "durability": 95,
      "combat": 90,
      "range": 95,
      "intelligence": 98
    },
    "specialAbilities": [
      "Planetary Telepathy Mind Wipe",
      "Molecular Intangibility Phase",
      "Martian Vision Heat Beams",
      "Shape-Shifting Bio-Morph"
    ],
    "description": "The sole survivor of Mars. A founding Justice Leaguer who possesses physical strength rivaling Superman, absolute shapeshifting, invisibility, and the greatest telepathic mind on Earth.",
    "visuals": {
      "primaryColor": "#22543D",
      "accentColor": "#C53030",
      "badgeText": "👽 LAST SON OF MARS",
      "comicQuote": "I am the heart and soul of the Justice League."
    },
    "tacticalNotes": "Phasing avoids incoming lethal damage while telepathic mind blast shuts down enemy tactical plans.",
    "matchupStrengths": [
      "Tech Armies",
      "Brawlers",
      "Psychics"
    ],
    "matchupWeaknesses": [
      "Fire / Pyrophobia"
    ],
    "imageUrl": "/characters/martian-manhunter.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/432-martian-manhunter.jpg"
  },
  {
    "id": "beast-boy",
    "name": "Beast Boy",
    "alterEgo": "Garfield Mark Logan",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Rare",
    "stats": {
      "power": 83,
      "strength": 85,
      "speed": 86,
      "durability": 82,
      "combat": 84,
      "range": 70,
      "intelligence": 76
    },
    "specialAbilities": [
      "T-Rex Apex Smash",
      "Pterodactyl Supersonic Dive",
      "Green Swarm Metamorphosis",
      "Gorilla Slam Rampage"
    ],
    "description": "Cured of a lethal tropical disease by Sakutia, Garfield Logan turned green and gained the bio-morphing ability to transform into any animal — present, extinct, or alien.",
    "visuals": {
      "primaryColor": "#276749",
      "accentColor": "#9F7AEA",
      "badgeText": "🦖 GREEN SHAPE-SHIFTER",
      "comicQuote": "Dude, wait till you see what I can turn into!"
    },
    "tacticalNotes": "Shapeshifts into T-Rex for brute power or falcon for evading ranged artillery.",
    "matchupStrengths": [
      "Inflexible Fighters",
      "Traps"
    ],
    "matchupWeaknesses": [
      "Cellular Toxin Dampeners"
    ],
    "imageUrl": "/characters/beast-boy.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/76-beast-boy.jpg"
  },
  {
    "id": "plastic-man",
    "name": "Plastic Man",
    "alterEgo": "Patrick \"Eel\" O'Brian",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Epic",
    "stats": {
      "power": 90,
      "strength": 88,
      "speed": 85,
      "durability": 98,
      "combat": 86,
      "range": 90,
      "intelligence": 82
    },
    "specialAbilities": [
      "Infinite Elasticity Morph",
      "Ballistic Rubber Bouncing",
      "Immune to Blunt Trauma",
      "Slapstick Anvil Crushing"
    ],
    "description": "Ex-safecracker doused in experimental chemical acid that gave him infinite molecular elasticity. Completely invulnerable to blunt strikes, bullets, and psychic control.",
    "visuals": {
      "primaryColor": "#C53030",
      "accentColor": "#ECC94B",
      "badgeText": "🤸 LIVING ELASTICITY",
      "comicQuote": "You can't break what bends in every direction!"
    },
    "tacticalNotes": "Immune to blunt force trauma, bullets, and psychic mind probes. Stretches across entire arena.",
    "matchupStrengths": [
      "Heavy Physical Bruisers",
      "Telepaths"
    ],
    "matchupWeaknesses": [
      "Liquid Nitrogen Freezing",
      "Extreme Chemical Acetone"
    ],
    "imageUrl": "/characters/plastic-man.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/520-plastic-man.jpg"
  },
  {
    "id": "mera",
    "name": "Mera",
    "alterEgo": "Queen Mera of Xebel",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Epic",
    "stats": {
      "power": 92,
      "strength": 89,
      "speed": 85,
      "durability": 90,
      "combat": 90,
      "range": 94,
      "intelligence": 88
    },
    "specialAbilities": [
      "Hard-Water Construct Spears",
      "Internal Dehydration Blood Drain",
      "Tsunami Hydrokinesis",
      "Xebelian Battle Trance"
    ],
    "description": "Queen of Atlantis and Xebelian warrior royalty who commands hydrokinesis so potent she can pull the water directly out of a human body or mold hard-water weapons.",
    "visuals": {
      "primaryColor": "#2C7A7B",
      "accentColor": "#319795",
      "badgeText": "🌊 HYDROKINETIC QUEEN",
      "comicQuote": "I am not Aquaman's wife. I am Mera, Queen of Atlantis!"
    },
    "tacticalNotes": "Hard-water spikes pierce armor; can dehydrate biological opponents directly.",
    "matchupStrengths": [
      "Aquatic Combatants",
      "Fire Users"
    ],
    "matchupWeaknesses": [
      "Arid Desert Evaporation",
      "Electricity"
    ],
    "imageUrl": "/characters/mera.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/444-mera.jpg"
  },
  {
    "id": "power-girl",
    "name": "Power Girl",
    "alterEgo": "Kara Zor-L / Karen Starr",
    "universe": "DC Universe",
    "role": "Sorcerer",
    "rarity": "Legendary",
    "stats": {
      "power": 96,
      "strength": 98,
      "speed": 94,
      "durability": 96,
      "combat": 89,
      "range": 88,
      "intelligence": 90
    },
    "specialAbilities": [
      "Earth-Two Kryptonian Punch",
      "Heat Vision Sweep",
      "Microscopic Sensor Scan",
      "Indomitable Will Slam"
    ],
    "description": "The Earth-Two counterpart of Supergirl and former chairwoman of the Justice Society of America. Possesses immense Kryptonian power paired with seasoned leadership.",
    "visuals": {
      "primaryColor": "#E2E8F0",
      "accentColor": "#3182CE",
      "badgeText": "💪 EARTH-TWO KRYPTONIAN",
      "comicQuote": "I'm Power Girl. And nobody tells me where I can or can't fly."
    },
    "tacticalNotes": "Heavy offensive brawler with Kryptonian durability and JSA leadership synergy.",
    "matchupStrengths": [
      "Bruisers",
      "Demons",
      "Armored Foes"
    ],
    "matchupWeaknesses": [
      "Earth-Two Kryptonite",
      "High-Tier Magic"
    ],
    "imageUrl": "/characters/power-girl.jpg",
    "artwork": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/524-power-girl.jpg"
  }
];

export const ALL_CHARACTERS: Character[] = [...MARVEL_CHARACTERS, ...DC_CHARACTERS];

export function getCharacterById(id: string): Character | undefined {
  return ALL_CHARACTERS.find(c => c.id === id);
}

export function getRandomCharacters(count: number, allowDuplicates = false): Character[] {
  const pool = [...ALL_CHARACTERS];
  if (allowDuplicates) {
    const selected: Character[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      selected.push({ ...pool[idx] });
    }
    return selected;
  }

  // Shuffle pool (Fisher-Yates)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}
