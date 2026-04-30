const fs = require('fs');
const path = 'src/pages/projects/[slug].astro';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  if (!content.includes('export const prerender = true;') && content.includes('getStaticPaths')) {
    const newContent = content.replace(
      'export async function getStaticPaths',
      'export const prerender = true;\n\nexport async function getStaticPaths'
    );
    fs.writeFileSync(path, newContent);
    console.log('Patched projects');
  }
}
