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
    {name: 'content', title: 'Landing Page Content'},
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
    defineField({
      name: 'homeHeadline',
      title: 'Sector Hook / Sub-headline',
      description: 'A concise value proposition. Used for Hero Sub and Mega Menu. e.g. "Your Sanctuary, Architected."',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      description: 'The primary visual for this sector. Used in Hero and Mega Menu.',
      type: 'image',
      options: {hotspot: true},
      group: 'identity',
    }),

    // --- CONTENT ---
    defineField({
      name: 'statureQuote',
      title: 'Anand Bhagat Quote',
      description: 'A quote from the studio principal reflecting the philosophy for this sector.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'pageHeroSub',
      title: 'Pivot Narrative',
      description: '1-2 sentences next to the hero image (The "shell is given..." equivalent).',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'valueProposition',
      title: 'Rigour & Intent (Manifesto)',
      description: 'The core long-form pitch proving domain expertise.',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'keyPillars',
      title: 'Key Standards / Pillars',
      description: 'The 3 main capabilities for this sector.',
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
      group: 'content',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title, media}
    },
  },
})
