/**
 * verify-homepage.mjs — confirms the homepage document in Sanity has content
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

const doc = await client.fetch('*[_id == "homepage"][0]')
console.log(JSON.stringify(doc, null, 2))
