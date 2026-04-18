/**
 * recover-images.mjs
 * Lists all image assets in the Sanity media library so we can identify
 * the stature/precision images and re-attach them to the homepage.
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

// Check for draft version of homepage which may still have the image refs
const draft = await client.fetch('*[_id == "drafts.homepage"][0]{ statureImage, precisionImage, statureSection }')
console.log('\n=== Draft homepage (image refs) ===')
console.log(JSON.stringify(draft, null, 2))

// Also list all image assets
const assets = await client.fetch(`
  *[_type == "sanity.imageAsset"] | order(_createdAt desc) {
    _id,
    originalFilename,
    _createdAt,
    url
  }
`)
console.log('\n=== All image assets ===')
assets.forEach(a => {
  console.log(`${a._id}  |  ${a.originalFilename}  |  ${a._createdAt}`)
})
