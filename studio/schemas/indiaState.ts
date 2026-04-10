import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'indiaState',
  title: 'India State',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'State Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'State Code',
      type: 'string',
      description: 'e.g., MH, KA, DL',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
