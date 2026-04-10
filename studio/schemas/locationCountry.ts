import { defineType, defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'locationCountry',
  title: 'Country',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Country Code',
      type: 'string',
      description: 'e.g., IN, US, UK',
    }),
  ],
})
