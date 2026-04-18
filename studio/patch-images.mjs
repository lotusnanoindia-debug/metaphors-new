/**
 * patch-images.mjs
 * Re-attaches the stature and precision images to the homepage.statureSection
 * after they were lost in the createOrReplace migration.
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

// Identified from the asset list:
// oracle-pune-dome-metaphors-design.jpeg  →  the large stature image
// metaphors-detail.png                    →  the precision detail image

const statureImageId   = 'image-dc1a4cf08cda82fa89fbeb800293dde0ee8980d0-1696x2528-jpg'
const precisionImageId = 'image-8d34a77e35acfaaa3a8cdf283a888590bb43a9e6-1024x1024-jpg'

const result = await client
  .patch('homepage')
  .set({
    'statureSection.statureImage': {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: statureImageId,
      },
      alt: 'Oracle Centre, Pune — Metaphors Design',
      caption: 'Oracle Centre, Pune, India',
    },
    'statureSection.precisionImage': {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: precisionImageId,
      },
      alt: 'Architectural precision — Metaphors Design studio detail',
    },
  })
  .commit()

console.log('✓ Images re-attached:', result._id)
