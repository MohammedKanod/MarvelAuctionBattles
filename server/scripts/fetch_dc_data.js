const fs = require('fs');
const https = require('https');

async function main() {
  const res = await fetch('https://akabab.github.io/superhero-api/api/all.json');
  const all = await res.json();
  const dc = all.filter(c => c.biography && c.biography.publisher && c.biography.publisher.includes('DC'));
  
  console.log(`Found ${dc.length} DC characters in API`);

  // Write a simple JSON of id, name, fullName, slug, images.lg for easy inspection
  const simplified = dc.map(c => ({
    akababId: c.id,
    name: c.name,
    fullName: c.biography.fullName,
    alignment: c.biography.alignment,
    powerstats: c.powerstats,
    slug: c.slug,
    img: c.images.lg
  }));

  fs.writeFileSync('server/scripts/akabab_dc.json', JSON.stringify(simplified, null, 2));
  console.log('Saved server/scripts/akabab_dc.json');
}

main().catch(console.error);
