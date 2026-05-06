import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN, // Needs a token with write access
  useCdn: false,
});

async function run() {
  const clients = await client.fetch(`*[_type == "client" && defined(category)]`);
  console.log(`Found ${clients.length} clients to patch.`);
  
  for (const doc of clients) {
    console.log(`Unsetting category for client: ${doc.name} (${doc._id})`);
    await client.patch(doc._id).unset(['category']).commit();
  }
  console.log('Done!');
}
run().catch(console.error);
