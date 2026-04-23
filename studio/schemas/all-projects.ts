import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {DisciplineCheckboxes} from '../components/DisciplineCheckboxes'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    {name: 'identity', title: 'Identity'},
    {name: 'projectContext', title: 'Project Context'},
    {name: 'narrative', title: 'Narrative'},
    {name: 'media', title: 'Media'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // Required by @sanity/orderable-document-list for drag-to-reorder
    orderRankField({type: 'project'}),

    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      group: 'identity',
      description: 'Show this project at the top of category lists and site-wide highlights.',
    }),
    defineField({
      name: 'isVisible',
      title: 'Is Visible',
      type: 'boolean',
      initialValue: true,
      group: 'identity',
    }),

    // --- IDENTITY GROUP ---
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      options: {
        source: 'projectName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'One-line Headline',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'category',
      title: 'Sector',
      type: 'reference',
      to: [{type: 'sector'}],
      group: 'identity',
    }),
    defineField({
      name: 'subcategorySlug',
      title: 'Subcategory Slug',
      type: 'string',
      group: 'identity',
    }),
    // Removed legacy scopeOfWork
    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      type: 'array',
      of: [{type: 'reference', to: {type: 'discipline'}}],
      description: 'Select one or more core disciplines delivered for this project.',
      components: {
        input: DisciplineCheckboxes,
      },
      group: 'identity',
    }),

    // --- PROJECT CONTEXT GROUP ---
    defineField({
      name: 'client',
      title: 'Project Client',
      type: 'reference',
      to: [{type: 'client'}],
    }),
    defineField({
      name: 'showClientPublicly',
      title: 'Show Client Publicly',
      type: 'boolean',
      initialValue: true,
      group: 'projectContext',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'city', title: 'City', type: 'string'},
        {
          name: 'country',
          title: 'Country',
          type: 'reference',
          to: [{type: 'locationCountry'}],
        },
        {
          name: 'indiaState',
          title: 'India State',
          type: 'reference',
          to: [{type: 'indiaState'}],
          hidden: ({parent}) => parent?.country?._ref !== 'country-india',
        },
        {
          name: 'otherState',
          title: 'State/Region/Province',
          type: 'string',
          hidden: ({parent}) => parent?.country?._ref === 'country-india',
        },
      ],
      group: 'projectContext',
    }),
    defineField({
      name: 'areaSqFt',
      title: 'Area (sq ft)',
      type: 'number',
      group: 'projectContext',
    }),
    defineField({
      name: 'completionYear',
      title: 'Completion Year',
      type: 'number',
      group: 'projectContext',
    }),
    defineField({
      name: 'projectDuration',
      title: 'Project Duration',
      type: 'string',
      group: 'projectContext',
    }),
    defineField({
      name: 'projectStatus',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'Completed'},
          {title: 'Ongoing', value: 'Ongoing'},
          {title: 'On Hold', value: 'On Hold'},
          {title: 'Concept', value: 'Concept'},
        ],
        layout: 'radio',
      },
      initialValue: 'Completed',
      group: 'projectContext',
    }),

    // --- NARRATIVE GROUP ---
    defineField({
      name: 'theBrief',
      title: 'The Brief',
      type: 'text',
      group: 'narrative',
    }),
    defineField({
      name: 'theDesignResponse',
      title: 'The Design Response',
      type: 'text',
      group: 'narrative',
    }),
    defineField({
      name: 'theOutcome',
      title: 'The Outcome',
      type: 'text',
      group: 'narrative',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(6),
      group: 'narrative',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', title: 'Quote', type: 'text'},
        {name: 'attribution', title: 'Attribution', type: 'string'},
        {name: 'showPublicly', title: 'Show Publicly', type: 'boolean', initialValue: false},
      ],
      group: 'narrative',
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'awardName', title: 'Award Name', type: 'string'},
            {name: 'awardingBody', title: 'Awarding Body', type: 'string'},
            {name: 'year', title: 'Year', type: 'number'},
          ],
        },
      ],
      group: 'narrative',
    }),

    // --- MEDIA GROUP ---
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alternative Text', type: 'string'},
        {name: 'caption', title: 'Caption', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Image Array',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alternative Text', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'},
          ],
        },
      ],
      group: 'media',
    }),

    // --- SETTINGS GROUP ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',

      type: 'string',
      validation: (Rule) => Rule.max(60),
      group: 'settings',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) => Rule.max(155),
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'projectName',
      subtitle: 'category.title',
      media: 'coverImage',
      isVisible: 'isVisible',
      featured: 'featured',
    },
    prepare({title, subtitle, media, isVisible, featured}) {
      const visibilityIcon = isVisible ? '🟢' : '⚫'
      const featuredIcon = featured ? '⭐ ' : ''
      return {
        title: `${featuredIcon}${visibilityIcon} ${title || 'Unnamed Project'}`,
        subtitle: subtitle || 'No Category',
        media,
      }
    },
  },
})
