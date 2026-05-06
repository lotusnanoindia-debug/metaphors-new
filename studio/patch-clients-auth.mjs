import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  const clients = await client.fetch(`*[_type == "client" && defined(category)]`);
  console.log(`Found ${clients.length} clients to patch.`);
  
  if (clients.length === 0) return;

  const transaction = client.transaction();
  for (const doc of clients) {
    console.log(`Unsetting category for client: ${doc.name} (${doc._id})`);
    transaction.patch(doc._id, p => p.unset(['category']));
  }
  
  console.log('Committing transaction...');
  await transaction.commit();
  console.log('Done!');
}
run().catch(console.error);
