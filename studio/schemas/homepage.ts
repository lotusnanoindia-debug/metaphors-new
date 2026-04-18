import {defineType, defineField} from 'sanity'

/**
 * homepage — singleton document
 *
 * One document, one type. Nothing here references `project` or
 * `projectCategory`. All homepage content is bespoke and edited here.
 *
 * Sections covered:
 *   hero          — headline, subheading, eyebrow, CTA label + URL
 *   featureImages — the two grayscale images below the hero
 *   press         — the three pull-quotes (logo + quote + attribution)
 *   scale         — the "Scale of Practice" stats (total + sector breakdown)
 *   featured      — the curated "Selected Landmark Deployments" project cards
 *                   (fully self-contained: image, title, location, sector label,
 *                    intent copy, two stats, a link URL)
 */

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',

  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stature', title: 'Studio Context'},
    {name: 'sectors', title: 'Sectors of Practice'},
    {name: 'scale', title: 'Scale of Practice'},
    {name: 'disciplines', title: 'Disciplines'},
    {name: 'mainCta', title: 'Editorial Closure'},
  ],

  fields: [
    // ── HERO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroSection',
      title: 'Hero Configuration',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Defining Modern',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'headlineAccent',
          title: 'Headline Accent (italic line)',
          type: 'string',
          initialValue: 'Indian Architecture.',
        }),
        defineField({
          name: 'headlineTagline',
          title: 'Headline Tagline (bottom text)',
          type: 'string',
          initialValue: '- since 1989',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          initialValue:
            'Four decades of shaping the corporate, institutional, civic, and residential environments of modern India.',
        }),
      ]
    }),

    // ── STUDIO CONTEXT ──────────────────────────────────────────────────────
    defineField({
      name: 'statureSection',
      title: 'Studio Context Configuration',
      type: 'object',
      group: 'stature',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'contextEyebrow',
          title: 'Studio Context Eyebrow',
          type: 'string',
          initialValue: 'Studio Context',
        }),
        defineField({
          name: 'statureImage',
          title: 'Stature Image (large, left)',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt Text', type: 'string'},
            {
              name: 'caption',
              title: 'Architectural Caption',
              type: 'string',
              description: 'Tiny footnote below the image e.g. "Oracle Centre, Pune, India"'
            },
          ],
        }),
        defineField({
          name: 'precisionImage',
          title: 'Precision Image (small, right)',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
        defineField({
          name: 'pressEyebrow',
          title: 'Press Perspectives Eyebrow',
          type: 'string',
          initialValue: 'Press Perspectives',
        }),
        defineField({
          name: 'pressSubEyebrow',
          title: 'Press Perspectives Sub-Eyebrow',
          type: 'string',
          initialValue: 'Independent Assessment',
        }),
        defineField({
          name: 'pressCtaLabel',
          title: 'Press Perspectives CTA Label',
          type: 'string',
          initialValue: 'MORE VOICES',
        }),
        defineField({
          name: 'pressCtaUrl',
          title: 'Press Perspectives CTA URL',
          type: 'string',
          initialValue: '/perspectives',
        }),
      ]
    }),

    // ── SECTORS ─────────────────────────────────────────────────────────────
    defineField({
      name: 'sectorsSection',
      title: 'Sectors Configuration',
      type: 'object',
      group: 'sectors',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section Eyebrow',
          type: 'string',
          initialValue: 'Sectors of Practice',
        }),
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string',
          initialValue: 'Refined by Experience.',
        }),
        defineField({
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'OUR PRACTICE SPANS EIGHT SECTORS. BUILT ACROSS FOUR DECADES OF DEMANDING COMMISSIONS ON THE SUB-CONTINENT.',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          initialValue: 'Consult Our Sector Experts',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
          initialValue: '/contact',
        }),
      ]
    }),

    // ── SCALE ─────────────────────────────────────────────────────────────
    defineField({
      name: 'scaleSection',
      title: 'Scale of Practice Configuration',
      type: 'object',
      group: 'scale',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'scaleEyebrow',
          title: 'Section Eyebrow',
          type: 'string',
          initialValue: 'SINCE 1989',
        }),
        defineField({
          name: 'scaleHeadline',
          title: 'Section Headline',
          type: 'string',
          initialValue: 'Those shaping modern India know whom to call.',
        }),
        defineField({
          name: 'scaleBody',
          title: 'Body Copy',
          type: 'text',
          rows: 3,
        }),
      ]
    }),


    defineField({
      name: 'disciplinesSection',
      title: 'Studio Disciplines Configuration',
      type: 'object',
      group: 'disciplines',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section Eyebrow',
          type: 'string',
          initialValue: 'Capability Spectrum',
        }),
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'string',
          description: 'Use <br /> tags for line breaks.',
          initialValue: 'Studio<br />Disciplines',
        }),
        defineField({
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text',
          rows: 2,
          description: 'Use <br /> tags for line breaks.',
          initialValue: 'From idea to completion.<br />AN INTEGRATED STUDIO APPROACH.',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          initialValue: 'Enquire About a Discipline',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
          initialValue: '/contact',
        }),
      ]
    }),

    // ── MAIN CTA ────────────────────────────────────────────────────────────
    defineField({
      name: 'mainCtaSection',
      title: 'Editorial Closure Configuration',
      type: 'object',
      group: 'mainCta',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section Eyebrow',
          type: 'string',
          initialValue: 'COMMISSION STEWARDSHIP',
        }),
        defineField({
          name: 'headline',
          title: 'Section Headline',
          type: 'text',
          description: 'Use <br class="md:hidden" /> or similar HTML for tailored wrapping if needed.',
          rows: 2,
          initialValue: 'Your next landmark <br class="md:hidden" />begins here.',
        }),
        defineField({
          name: 'tagline',
          title: 'Section Tagline',
          type: 'text',
          rows: 2,
          initialValue: 'Precision-led architecture for clients who refuse to compromise.<br class=\'hidden md:block\' /> Every project begins with a focused conversation.',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          initialValue: 'Start a Dialogue',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
          initialValue: '/contact',
        }),
      ]
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
