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
    {name: 'content', title: 'Landing Page Content'},
    {name: 'sectorLens', title: 'Sector Contexts'},
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
      title: 'Discipline Hook / Sub-headline',
      type: 'string',
      group: 'identity',
      description: 'The short, punchy line under the title (e.g. "Form is the Consequence...")',
    }),
    defineField({
      name: 'mainImage',
      title: 'Feature Image (Large)',
      type: 'image',
      group: 'identity',
      options: {
        hotspot: true,
      },
      description: 'The primary monumental shot used in the Hero.',
    }),

    // --- CONTENT ---
    defineField({
      name: 'statureQuote',
      title: 'Anand Bhagat Quote',
      description: 'The authoritative quote reflecting the philosophy of this discipline.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'statureSubHeadline',
      title: 'Pivot Narrative',
      description: '1-2 sentences next to the stature image (The "principles are fixed..." equivalent).',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'valueProposition',
      title: 'Rigour & Intent (Manifesto)',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'The prospect-focused pitch proving domain expertise.',
    }),
    defineField({
      name: 'positions',
      title: 'Key Positions / Tenets',
      type: 'array',
      group: 'content',
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
    defineField({
      name: 'secondaryImage',
      title: 'Secondary/Atmospheric Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      description: 'A smaller atmospheric shot used to complement the narrative.',
    }),

    // --- SECTOR LENS ---
    defineField({
      name: 'sectorContexts',
      title: 'Sector Lens',
      type: 'array',
      group: 'sectorLens',
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
