import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pressQuote',
  title: 'Press Quotes',
  type: 'document',
  fields: [
    defineField({
      name: 'publication',
      title: 'Publication Name',
      type: 'string',
      description: 'e.g. Forbes India',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Publication Logo (SVG or PNG)',
      type: 'image',
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      description: 'Displayed in small caps below the quote. e.g. Interview / Journal / Insights',
      initialValue: 'Interview',
    }),
  ],
  preview: {
    select: {
      title: 'publication',
      subtitle: 'quote',
      media: 'logo'
    },
  },
})
