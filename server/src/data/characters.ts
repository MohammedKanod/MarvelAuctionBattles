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
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/321-hela.jpg'
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
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/697-vision.jpg'
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
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/579-scarlet-witch.jpg'
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
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/655-thanos.jpg'
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
    artwork: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg'
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
];

export function getCharacterById(id: string): Character | undefined {
  return MARVEL_CHARACTERS.find(c => c.id === id);
}

export function getRandomCharacters(count: number, allowDuplicates = false): Character[] {
  const pool = [...MARVEL_CHARACTERS];
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
