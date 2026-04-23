import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'discipline',
  title: 'Discipline',
  type: 'document',
  icon: SparklesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'discipline'}),
    defineField({
      name: 'title',
      title: 'Discipline Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Architecture, Interiors, Landscape',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valueProposition',
      title: 'Conversion Copy (Value Proposition)',
      type: 'text',
      rows: 4,
      description: 'The prospect-focused pitch. Why should they hire the firm for this discipline?',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Stunning establishing shot to anchor the landing page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
