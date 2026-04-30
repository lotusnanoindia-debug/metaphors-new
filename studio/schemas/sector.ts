import {defineType, defineField} from 'sanity'
import {HashIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'sector',
  title: 'Sector',
  type: 'document',
  icon: HashIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'menuContext', title: 'Mega Menu Context'},
    {name: 'homeContext', title: 'Homepage Context'},
    {name: 'landingContext', title: 'Landing Page Context'},
  ],
  fields: [
    // Required by @sanity/orderable-document-list for drag-to-reorder
    orderRankField({type: 'sector'}),

    // --- IDENTITY ---
    defineField({
      name: 'title',
      title: 'Sector Name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),

    // --- MEGA MENU CONTEXT ---
    defineField({
      name: 'menuTagline',
      title: 'Menu Tagline',
      description: 'A punchy 3-5 word hook for the mega menu.',
      type: 'string',
      group: 'menuContext',
    }),
    defineField({
      name: 'menuCTA',
      title: 'Mega Menu CTA text',
      description: 'Dynamic button text tailored to the sector, e.g. "View Commercial Projects".',
      type: 'string',
      group: 'menuContext',
    }),
    defineField({
      name: 'menuImage',
      title: 'Menu Thumbnail',
      description:
        'A small, specific graphic or abstract crop to anchor the link visually in the menu.',
      type: 'image',
      options: {hotspot: true},
      group: 'menuContext',
    }),

    // --- HOMEPAGE CONTEXT ---
    defineField({
      name: 'homeHeadline',
      title: 'Homepage Headline',
      description: 'A concise value proposition. e.g. "Your Sanctuary, Architected."',
      type: 'string',
      group: 'homeContext',
    }),
    defineField({
      name: 'homeIntro',
      title: 'Homepage Intro Teaser',
      description:
        'Short text to show you understand their specific industry challenge (~150 chars).',
      type: 'text',
      rows: 3,
      group: 'homeContext',
    }),
    defineField({
      name: 'image', // Reusing the old field name for backward compatibility
      title: 'Homepage Feature Image',
      description:
        'The absolute strongest hero piece for this sector. Also used as the main thumbnail in Sanity UI.',
      type: 'image',
      options: {hotspot: true},
      group: 'homeContext',
    }),

    // --- LANDING PAGE CONTEXT ---
    defineField({
      name: 'pageHeroHeadline',
      title: 'Landing Page Hero Headline',
      description: 'The primary pain-point solver.',
      type: 'string',
      group: 'landingContext',
    }),
    defineField({
      name: 'pageHeroSub',
      title: 'Landing Page Sub-headline',
      description: '1-2 sentences setting the scene under the main headline.',
      type: 'text',
      rows: 3,
      group: 'landingContext',
    }),
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition',
      description: 'The core pitch proving Metaphors deep domain expertise in this exact sector.',
      type: 'text',
      rows: 5,
      group: 'landingContext',
    }),
    defineField({
      name: 'keyPillars',
      title: 'Key Capabilities / Pillars',
      description:
        'What are the 3 main pillars for this sector? (e.g. For Retail: 1. Footfall Flow, 2. Brand Identity...)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Pillar Title', type: 'string'},
            {name: 'description', title: 'Pillar Description', type: 'text', rows: 3},
          ],
        },
      ],
      group: 'landingContext',
    }),
    defineField({
      name: 'curatedProjects',
      title: 'Curated Sector Projects',
      description:
        'Manually pin specific showcase projects that perfectly capture the pitch for this sector. (Optional: You can also just dynamically fetch featured projects instead)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
      group: 'landingContext',
    }),
    defineField({
      name: 'customCTA',
      title: 'Custom CTA Text',
      description: 'Instead of "Contact Us", tailor the button: "Discuss Your Healthcare Project".',
      type: 'string',
      group: 'landingContext',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title, media}
    },
  },
})
