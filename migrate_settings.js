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
    const isPublicPath = imagePathOrUrl.startsWith('/');
    const absolutePath = isPublicPath
      ? path.join(process.cwd(), 'public', imagePathOrUrl.slice(1))
      : path.join(process.cwd(), 'public', imagePathOrUrl);
    
    const asset = await client.assets.upload('image', fs.createReadStream(absolutePath), {
      filename: path.basename(absolutePath),
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error(`Failed to upload image ${imagePathOrUrl}:`, err.message);
    return null;
  }
}

async function migrateSettings() {
  console.log('🚀 Migrating Home Settings...');
  
  const statureImage = await uploadImage('/oracle-pune-dome-metaphors-design.jpeg');
  const precisionImage = await uploadImage('/metaphors-detail.png');

  const settingsDoc = {
    _type: 'settings',
    _id: 'singleton-settings',
    title: 'Metaphors Design',
    heroStatureImage: statureImage,
    heroPrecisionImage: precisionImage,
  };

  await client.createOrReplace(settingsDoc);
  console.log('✅ Success: Homepage Assets Migrated');
}

migrateSettings().catch(console.error);
