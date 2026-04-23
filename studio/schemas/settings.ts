import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'heroStatureImage',
      title: 'Hero Stature Image (Large)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'statureTagline',
      title: 'Stature Tagline',
      type: 'text',
      rows: 2,
      description: 'The editorial lead text that sits under the large Stature image.',
    }),
    defineField({
      name: 'heroPrecisionImage',
      title: 'Hero Precision Image (Small)',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
