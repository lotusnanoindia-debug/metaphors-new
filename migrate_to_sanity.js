import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-01',
});

async function uploadImage(imagePathOrUrl) {
  try {
    if (imagePathOrUrl.startsWith('http')) {
      const response = await fetch(imagePathOrUrl);
      const buffer = await response.arrayBuffer();
      const asset = await client.assets.upload('image', Buffer.from(buffer), {
        filename: path.basename(imagePathOrUrl),
      });
      return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    } else {
      const isPublicPath = imagePathOrUrl.startsWith('/');
      const absolutePath = isPublicPath
        ? path.join(process.cwd(), 'public', imagePathOrUrl.slice(1))
        : path.join(process.cwd(), 'public', imagePathOrUrl);
      
      const asset = await client.assets.upload('image', fs.createReadStream(absolutePath), {
        filename: path.basename(absolutePath),
      });
      return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    }
  } catch (err) {
    console.error(`Failed to upload image ${imagePathOrUrl}:`, err.message);
    return null;
  }
}

const rawSectors = [
  {
    title: "Commerce & Retail",
    slug: "commerce-retail",
    focus: "Circulation and commercial yield.",
    approach: "Engineering high-traffic environments that balance operational efficiency with clear spatial flow.",
    proof: "Flagship work: Phoenix Mall & Shizusan.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Hospitality & Leisure",
    slug: "hospitality-leisure",
    focus: "Operational longevity and guest experience.",
    approach: "Planning hospitality estates that maintain their material and functional integrity over decades.",
    proof: "Flagship work: The Corinthians Resort.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Private & Collective Living",
    slug: "private-collective-living",
    focus: "Bespoke value and spatial refinement.",
    approach: "Designing residential landmarks that respond to unique terrain and programmatic complexity.",
    proof: "Featured: Premium Villas & Residence Landmarks.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  },
  {
    title: "Institutional & Corporate",
    slug: "institutional-corporate",
    focus: "Precision and technical resilience.",
    approach: "High-precision environments engineered for structural complexity and organizational flow.",
    proof: "Trusted by Wipro, Pune & Healthcare Providers.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
];

const rawProjects = [
  {
    title: "Phoenix Citadel.",
    slug: "phoenix-citadel",
    location: "Indore / Lucknow / Pune",
    category: "Commerce & Retail",
    intent: "Large-scale retail destinations planned for regional impact and high-volume circulation.",
    image: "/phoenix-atrium.png",
    stats: [
      { label: "Marker", value: "High-efficiency floorplates" },
      { label: "Scale", value: "Regional landmark" },
    ],
  },
  {
    title: "The Corinthians.",
    slug: "the-corinthians",
    location: "Pune, India",
    category: "Hospitality & Leisure",
    intent: "A lifestyle estate defined by material permanence and neo-classical architectural discipline.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2000",
    stats: [
      { label: "Craft", value: "Hand-cut stone masonry" },
      { label: "Planning", value: "Masterplanned estate" },
    ],
  },
  {
    title: "Wipro Global Headquarters.",
    slug: "wipro-global-headquarters",
    location: "Pune, India",
    category: "Institutional & Corporate",
    intent: "Institutional stature and technical resilience for a global technology hub.",
    image: "/wipro-hq.png",
    stats: [
      { label: "Performance", value: "Sustainable infrastructure" },
      { label: "Spec", value: "High-seismic tolerance" },
    ],
  },
];

async function migrate() {
  console.log('🚀 Starting Sanity Migration...');
  
  const sectorMap = {};

  // 1. Migrate Sectors
  console.log('--- Migrating Sectors ---');
  for (const s of rawSectors) {
    console.log(`Processing Sector: ${s.title}`);
    const image = await uploadImage(s.image);
    
    const doc = {
      _type: 'sector',
      _id: `sector-${s.slug}`,
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      focus: s.focus,
      approach: s.approach,
      proof: s.proof,
      image,
    };

    const result = await client.createOrReplace(doc);
    sectorMap[s.title] = result._id;
    console.log(`✅ Success: ${result.title}`);
  }

  // 2. Migrate Projects
  console.log('\n--- Migrating Projects ---');
  for (const p of rawProjects) {
    console.log(`Processing Project: ${p.title}`);
    const mainImage = await uploadImage(p.image);
    
    const doc = {
      _type: 'project',
      _id: `project-${p.slug}`,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      location: p.location,
      sector: { _type: 'reference', _ref: sectorMap[p.category] },
      intent: p.intent,
      mainImage,
      stats: p.stats,
    };

    const result = await client.createOrReplace(doc);
    console.log(`✅ Success: ${result.title}`);
  }

  console.log('\n✨ Migration Complete!');
}

migrate().catch(console.error);
