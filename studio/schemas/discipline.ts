import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'discipline',
  title: 'Discipline',
  type: 'document',
  icon: SparklesIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'stature', title: 'Stature Section'},
    {name: 'positions', title: 'Positions'},
    {name: 'sectors', title: 'Sector Lens'},
  ],
  fields: [
    orderRankField({type: 'discipline'}),
    
    // --- IDENTITY ---
    defineField({
      name: 'title',
      title: 'Discipline Name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Architecture, Interiors, Landscape',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'identity',
      description: 'The short, punchy line under the title (e.g. "Form is the Consequence...")',
    }),
    defineField({
      name: 'valueProposition',
      title: 'Conversion Copy (Value Proposition)',
      type: 'text',
      group: 'identity',
      rows: 4,
      description: 'The prospect-focused pitch. Why should they hire the firm for this discipline?',
    }),
    defineField({
      name: 'mainImage',
      title: 'Stature Image (Large)',
      type: 'image',
      group: 'identity',
      options: {
        hotspot: true,
      },
      description: 'The primary monumental shot in the stature grid.',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Stature Image (Small)',
      type: 'image',
      group: 'identity',
      options: {
        hotspot: true,
      },
      description: 'The smaller atmospheric shot used in the dark block/stature grid.',
    }),

    // --- STATURE SECTION ---
    defineField({
      name: 'statureSubHeadline',
      title: 'Stature Sub-headline',
      type: 'text',
      group: 'stature',
      rows: 3,
      description: 'e.g. "The principles are fixed. What changes is how architecture..."',
    }),
    defineField({
      name: 'statureQuote',
      title: 'Principal Quote',
      type: 'text',
      group: 'stature',
      rows: 3,
      description: 'The authoritative quote from the principal.',
    }),

    // --- POSITIONS ---
    defineField({
      name: 'positions',
      title: 'Positions',
      type: 'array',
      group: 'positions',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Position Title', type: 'string'},
            {name: 'text', title: 'Body Text', type: 'text', rows: 4},
          ],
        },
      ],
      description: 'The core tenets of this discipline.',
    }),

    // --- SECTOR LENS ---
    defineField({
      name: 'sectorContexts',
      title: 'Sector Lens',
      type: 'array',
      group: 'sectors',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sector',
              title: 'Sector (Global Reference)',
              type: 'reference',
              to: [{type: 'sector'}],
              description: 'Link to the global Sector document. Note: Changes made to the referenced Sector document itself will affect the entire site.',
            },
            {
              name: 'directive',
              title: 'The Directive',
              type: 'string',
              description: 'e.g. "Asset Efficiency & Lifecycle"',
            },
            {
              name: 'narrative',
              title: 'Narrative Text',
              type: 'text',
              rows: 5,
            },
            {
              name: 'image',
              title: 'Bespoke Discipline Image (Override)',
              type: 'image',
              description: 'SAFE TO EDIT: Uploading an image here only affects this Discipline and does NOT change the main Sector image.',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: 'sector.title',
              subtitle: 'directive',
              sectorImage: 'sector.image',
              overrideImage: 'image',
            },
            prepare(selection: any) {
              const { title, subtitle, sectorImage, overrideImage } = selection;
              // If there's an override image WITH an asset, prioritize it. Otherwise use the sector default.
              const activeMedia = (overrideImage && overrideImage.asset) ? overrideImage : sectorImage;
              return {
                title: title || 'Unnamed Sector',
                subtitle: subtitle || 'No directive set',
                media: activeMedia,
              };
            },
          },
        },
      ],
      description: 'Discipline-specific directives and narratives for each sector.',
    }),

    // --- CLOSING CTA ---
    defineField({
      name: 'closingCtaTagline',
      title: 'Closing CTA Tagline',
      type: 'text',
      rows: 3,
      description: 'The narrative text above the final CTA button.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
