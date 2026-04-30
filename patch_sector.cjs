const fs = require('fs');
const content = fs.readFileSync('src/pages/sectors/[slug].astro', 'utf8');

if (!content.includes('export const prerender = true;')) {
  const newContent = content.replace(
    'export async function getStaticPaths',
    'export const prerender = true;\n\nexport async function getStaticPaths'
  );
  fs.writeFileSync('src/pages/sectors/[slug].astro', newContent);
  console.log('Patched sectors');
}
