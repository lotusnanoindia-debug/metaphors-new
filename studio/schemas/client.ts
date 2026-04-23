import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Sector',
      type: 'reference',
      to: {type: 'sector'},
      description: 'Which industry/sector does this client belong to?',
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
