import { defineType, defineField } from 'sanity'

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
    { name: 'hero', title: 'Hero' },
    { name: 'featureImages', title: 'Feature Images' },
    { name: 'scale', title: 'Scale of Practice' },
    { name: 'featured', title: 'Featured Projects' },
  ],

  fields: [
    // ── HERO ────────────────────────────────────────────────────────────────

    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the headline. e.g. "Metaphors Design • Est. 1989"',
      initialValue: 'Metaphors Design • Est. 1989',
      group: 'hero',
    }),

    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      type: 'string',
      description: 'First line of the large hero heading.',
      initialValue: 'Defining Modern',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),

    defineField({
      name: 'heroHeadlineAccent',
      title: 'Headline Accent (italic line)',
      type: 'string',
      description: 'Second italic line of the heading. e.g. "Indian Architecture."',
      initialValue: 'Indian Architecture.',
      group: 'hero',
    }),

    defineField({
      name: 'heroHeadlineTagline',
      title: 'Headline Tagline (bottom text)',
      type: 'string',
      description: 'Optional third line below the accent. e.g. "- since 1989"',
      initialValue: '- since 1989',
      group: 'hero',
    }),

    defineField({
      name: 'heroSubheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      initialValue:
        'Four decades of shaping the corporate, institutional, civic, and residential environments of modern India.',
      group: 'hero',
    }),

    defineField({
      name: 'heroCtaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'START A CONVERSATION',
      group: 'hero',
    }),

    defineField({
      name: 'heroCtaUrl',
      title: 'CTA Button URL',
      type: 'string',
      initialValue: '/contact',
      group: 'hero',
    }),

    // ── FEATURE IMAGES ──────────────────────────────────────────────────────

    defineField({
      name: 'statureImage',
      title: 'Stature Image (large, left)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'caption', title: 'Architectural Caption', type: 'string',
          description: 'Displayed as a tiny footnote below the image pair. e.g. "Oracle Centre, Pune, India"' },
      ],
      group: 'featureImages',
    }),

    defineField({
      name: 'precisionImage',
      title: 'Precision Image (small, right)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
      group: 'featureImages',
    }),

    // ── SCALE OF PRACTICE ───────────────────────────────────────────────────

    defineField({
      name: 'scaleEyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'SINCE 1989',
      group: 'scale',
    }),

    defineField({
      name: 'scaleHeadline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Those shaping modern India know whom to call.',
      group: 'scale',
    }),

    defineField({
      name: 'scaleBody',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      group: 'scale',
    }),

    // Stats are now dynamically derived from Sector documents to avoid duplication
    // and ensure accurate cumulative tracking.

    // ── FEATURED PROJECTS ───────────────────────────────────────────────────

    defineField({
      name: 'featuredSectionEyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'Project Archive',
      group: 'featured',
    }),

    defineField({
      name: 'featuredSectionHeadline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Selected Landmark Deployments.',
      group: 'featured',
    }),

    defineField({
      name: 'featuredProjects',
      title: 'Featured Project Cards',
      description: 'These are bespoke editorial cards — independent from the projects database.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuredProject',
          title: 'Featured Project',
          fields: [
            defineField({
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sectorLabel',
              title: 'Sector Label',
              type: 'string',
              description: 'Displayed in small caps above the title. e.g. "Institutional & Corporate"',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'e.g. "Pune, India"',
            }),
            defineField({
              name: 'intent',
              title: 'Design Intent',
              type: 'text',
              rows: 2,
              description: 'One or two sentences. The hook copy shown on the card.',
            }),
            defineField({
              name: 'image',
              title: 'Project Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
              ],
            }),
            defineField({
              name: 'stats',
              title: 'Project Stats (max 2)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'value', title: 'Value', type: 'string' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'value' } },
                },
              ],
              validation: (Rule) => Rule.max(2),
            }),
            defineField({
              name: 'linkUrl',
              title: 'Card Link URL',
              type: 'string',
              description: 'Where "Project Details" links to. Can be a /projects/[slug] or /archive/[slug].',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'sectorLabel', media: 'image' },
          },
        },
      ],
      group: 'featured',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
