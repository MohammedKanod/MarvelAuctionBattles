const fs = require('fs');

async function main() {
  const res = await fetch('https://akabab.github.io/superhero-api/api/all.json');
  const all = await res.json();

  console.log(`Total heroes in API: ${all.length}`);

  // Helper to find best match
  function findHero(keywords) {
    for (const kw of keywords) {
      const match = all.find(c => {
        const name = c.name.toLowerCase();
        const slug = c.slug.toLowerCase();
        const full = (c.biography.fullName || '').toLowerCase();
        return name === kw.toLowerCase() || slug.includes(kw.toLowerCase()) || full.includes(kw.toLowerCase());
      });
      if (match) return match;
    }
    return null;
  }

  // Let's test a couple
  const testIds = ['superman', 'batman', 'darkseid', 'bane', 'zatanna', 'flash', 'reverse-flash', 'doctor-fate'];
  for (const id of testIds) {
    const found = findHero([id]);
    console.log(`${id} =>`, found ? `${found.id}: ${found.name} (${found.slug})` : 'NOT FOUND');
  }
}

main().catch(console.error);
