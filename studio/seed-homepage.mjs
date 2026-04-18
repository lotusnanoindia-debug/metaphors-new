/**
 * seed-homepage.mjs
 *
 * Directly patches the 'homepage' singleton in Sanity with all the
 * content that was previously hardcoded in the Astro components.
 *
 * Run from the /studio directory:
 *   node seed-homepage.mjs
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'h05maah4',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  // token is needed to write; reads the SANITY_AUTH_TOKEN env var
  // or falls back to the token in your local ~/.sanity/credentials.json
  token: process.env.SANITY_AUTH_TOKEN,
})

const content = {
  _id: 'homepage',
  _type: 'homepage',

  heroSection: {
    _type: 'object',
    headline: 'Defining Modern',
    headlineAccent: 'Indian Architecture.',
    headlineTagline: '- since 1989',
    subheading:
      'Four decades of shaping the corporate, institutional, civic, and residential environments of modern India.',
  },

  statureSection: {
    _type: 'object',
    contextEyebrow: 'Studio Context',
    pressEyebrow: 'Press Perspectives',
    pressSubEyebrow: 'Independent Assessment',
    pressCtaLabel: 'MORE VOICES',
    pressCtaUrl: '/perspectives',
    // statureImage and precisionImage are set manually in the Studio
  },

  sectorsSection: {
    _type: 'object',
    eyebrow: 'Sectors of Practice',
    headline: 'Refined by Experience.',
    subheading:
      'OUR PRACTICE SPANS EIGHT SECTORS. BUILT ACROSS FOUR DECADES OF DEMANDING COMMISSIONS ON THE SUB-CONTINENT.',
    ctaLabel: 'Consult Our Sector Experts',
    ctaUrl: '/contact',
  },

  scaleSection: {
    _type: 'object',
    scaleEyebrow: 'SINCE 1989',
    scaleHeadline: 'Those shaping modern India know whom to call.',
    scaleBody: '',
  },

  portfolioSection: {
    _type: 'object',
    eyebrow: 'Selected Evidence',
    headline: 'One lead commission per sector.',
    subheading:
      'A TRACK RECORD OF KEY DEPLOYMENTS VALIDATED THROUGH DECADES OF PRECISION AND RESPONSIBLE STEWARDSHIP.',
    ctaLabel: 'Enquire About Our Process',
    ctaUrl: '/contact',
  },

  disciplinesSection: {
    _type: 'object',
    eyebrow: 'Capability Spectrum',
    headline: 'Studio<br />Disciplines',
    subheading: 'From idea to completion.<br />AN INTEGRATED STUDIO APPROACH.',
    ctaLabel: 'Enquire About a Discipline',
    ctaUrl: '/contact',
  },

  mainCtaSection: {
    _type: 'object',
    eyebrow: 'COMMISSION STEWARDSHIP',
    headline: 'Your next landmark begins here.',
    tagline:
      'Precision-led architecture for clients who refuse to compromise. Every project begins with a focused conversation.',
    ctaLabel: 'Start a Dialogue',
    ctaUrl: '/contact',
  },
}

async function seed() {
  console.log('→ Patching homepage document in Sanity...')

  try {
    const result = await client.createOrReplace(content)
    console.log('✓ Homepage seeded successfully:', result._id)
  } catch (err) {
    console.error('✗ Failed to seed homepage:', err.message)
    process.exit(1)
  }
}

seed()
