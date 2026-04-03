import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g., Phoenix Citadel',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // This is the secret for perfect architectural crops!
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'reference',
      to: [{ type: 'sector' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g., Pune, India',
    },
    {
      name: 'intent',
      title: 'Design Intent',
      description: 'The core architectural concept or programmatic goal.',
      type: 'text',
      rows: 3,
    },
    {
      name: 'stats',
      title: 'Project Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', placeholder: 'e.g., Scale' },
            { name: 'value', title: 'Value', type: 'string', placeholder: 'e.g., Regional Landmark' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'mainImage',
    },
  },
};
