const fs = require('fs');
const path = require('path');

const dcCharacters = JSON.parse(fs.readFileSync('server/scripts/dc_characters.json', 'utf8'));

function updateCharacterFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if DC_CHARACTERS already added
  if (content.includes('export const DC_CHARACTERS')) {
    console.log(`${filePath} already has DC_CHARACTERS`);
    return;
  }

  // Find the end of MARVEL_CHARACTERS array: "];\n\nexport function getCharacterById"
  const splitMarker = '];\n\nexport function getCharacterById';
  if (!content.includes(splitMarker)) {
    throw new Error(`Could not find splitMarker in ${filePath}`);
  }

  const [marvelPart, functionsPart] = content.split(splitMarker);

  const dcPart = `];\n\nexport const DC_CHARACTERS: Character[] = ` + JSON.stringify(dcCharacters, null, 2) + `;\n\nexport const ALL_CHARACTERS: Character[] = [...MARVEL_CHARACTERS, ...DC_CHARACTERS];\n\n`;

  let updatedFunctions = `export function getCharacterById(id: string): Character | undefined {\n  return ALL_CHARACTERS.find(c => c.id === id);\n}\n\nexport function getRandomCharacters(count: number, allowDuplicates = false): Character[] {\n  const pool = [...ALL_CHARACTERS];\n  if (allowDuplicates) {\n    const selected: Character[] = [];\n    for (let i = 0; i < count; i++) {\n      const idx = Math.floor(Math.random() * pool.length);\n      selected.push({ ...pool[idx] });\n    }\n    return selected;\n  }\n\n  // Shuffle pool (Fisher-Yates)\n  for (let i = pool.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [pool[i], pool[j]] = [pool[j], pool[i]];\n  }\n\n  return pool.slice(0, Math.min(count, pool.length));\n}\n`;

  const newContent = marvelPart + dcPart + updatedFunctions;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Successfully updated ${filePath}`);
}

updateCharacterFile('server/src/data/characters.ts');
updateCharacterFile('client/src/data/characters.ts');
