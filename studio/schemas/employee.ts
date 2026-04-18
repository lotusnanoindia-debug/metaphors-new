import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'employee',
  title: 'Employee / Bench',
  type: 'document',
  icon: UserIcon,
  orderings: [orderRankOrdering],
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'expertise', title: 'Expertise & Relations' },
    { name: 'editorial', title: 'Editorial Narrative' },
    { name: 'settings', title: 'Operational Settings' },
  ],
  fields: [
    orderRankField({ type: 'employee' }),

    // --- IDENTITY ---
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Professional Title',
      description: 'e.g. "Senior Architect" or "Principal"',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience Label',
      description: 'e.g. "4 Decades" or "12 Years"',
      type: 'string',
      group: 'identity',
    }),

    // --- EXPERTISE & RELATIONS ---
    defineField({
      name: 'sectors',
      title: 'Sector Specialisations',
      description: 'Assign this member to one or more practice sectors.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
      group: 'expertise',
    }),
    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      description: 'The core disciplines this member leads.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'discipline' }] }],
      group: 'expertise',
    }),

    // --- EDITORIAL ---
    defineField({
      name: 'image',
      title: 'Editorial Portrait',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
    }),
    defineField({
      name: 'body',
      title: 'Professional Narrative',
      description: 'The narrative bio / story of this member.',
      type: 'text',
      rows: 5,
      group: 'editorial',
    }),

    // --- SETTINGS ---
    defineField({
      name: 'classification',
      title: 'Bench Classification',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership / Founders', value: 'leadership' },
          { title: 'Senior Bench', value: 'senior' },
          { title: 'Associates', value: 'associate' },
        ],
        layout: 'radio',
      },
      initialValue: 'senior',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Active Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'In Memoriam / Legacy', value: 'legacy' },
          { title: 'Alumni', value: 'alumni' },
        ],
      },
      initialValue: 'active',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      const statusIcon = status === 'legacy' ? '🕯️' : status === 'alumni' ? '🎓' : '🟢'
      return {
        title: `${statusIcon} ${title}`,
        subtitle: subtitle,
        media,
      }
    },
  },
})
