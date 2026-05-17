import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {ClientProjects} from '../components/ClientProjects'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'identity', title: 'Identity'},
    {name: 'contact', title: 'Contact Information'},
    {name: 'location', title: 'Location'},
    {name: 'governance', title: 'Governance & Business'},
    {name: 'meta', title: 'Studio Metadata'},
  ],
  fields: [
    // --- IDENTITY GROUP ---
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
      type: 'image',
      group: 'identity',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'classification',
      title: 'Client Classification',
      type: 'string',
      group: 'identity',
      options: {
        list: [
          {title: 'Private / HNI', value: 'hni'},
          {title: 'Corporate / Institutional', value: 'corporate'},
          {title: 'Government / Public Sector', value: 'government'},
          {title: 'Developer', value: 'developer'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Sector',
      type: 'string',
      description: 'Primary sector e.g. Aviation, Luxury Residential, Tech.',
      group: 'identity',
    }),
    defineField({
      name: 'establishedYear',
      title: 'Established Year',
      type: 'number',
      group: 'identity',
    }),

    // --- CONTACT GROUP ---
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Primary Contact Person',
      type: 'object',
      group: 'contact',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'role', title: 'Role/Designation', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
      ],
    }),
    defineField({
      name: 'secondaryContact',
      title: 'Secondary / Assistant Contact',
      type: 'object',
      group: 'contact',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'role', title: 'Role/Designation', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
      ],
    }),

    // --- LOCATION GROUP ---
    defineField({
      name: 'address',
      title: 'Headquarters Address',
      type: 'text',
      rows: 3,
      group: 'location',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'locationCountry'}],
      group: 'location',
      initialValue: {
        _ref: 'country-india',
      },
    }),
    defineField({
      name: 'indiaState',
      title: 'India State',
      type: 'reference',
      to: [{type: 'indiaState'}],
      group: 'location',
      hidden: ({parent}) => parent?.country?._ref !== 'country-india',
    }),
    defineField({
      name: 'otherState',
      title: 'State/Region/Province',
      type: 'string',
      group: 'location',
      hidden: ({parent}) => parent?.country?._ref === 'country-india',
    }),

    // --- GOVERNANCE & BUSINESS GROUP ---
    defineField({
      name: 'gstNumber',
      title: 'GST / Tax Identification Number',
      type: 'string',
      group: 'governance',
    }),
    defineField({
      name: 'relationshipStatus',
      title: 'Relationship Status',
      type: 'string',
      group: 'governance',
      options: {
        list: [
          {title: 'Active / Ongoing', value: 'active'},
          {title: 'Legacy / Completed', value: 'legacy'},
          {title: 'Prospect / Lead', value: 'prospect'},
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'confidentiality',
      title: 'Confidentiality Level',
      type: 'string',
      group: 'governance',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Confidential (No Public Logos)', value: 'confidential'},
          {title: 'Strictly NDA (Internal Only)', value: 'nda'},
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'referralSource',
      title: 'Referral / Source',
      type: 'string',
      description: 'How did this client reach Metaphors?',
      group: 'governance',
    }),

    // --- META GROUP ---
    defineField({
      name: 'internalNotes',
      title: 'Internal Studio Notes',
      type: 'text',
      description: 'Private context for the leadership team.',
      group: 'meta',
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'string',
      readOnly: true,
      group: 'meta',
      components: {
        field: ClientProjects,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'industry',
      media: 'logo',
      type: 'classification',
      city: 'city',
      contactName: 'contactPerson.name',
    },
    prepare({title, subtitle, media, type, city, contactName}) {
      const typeLabel = type ? type.toUpperCase() : ''
      const industryLabel = subtitle || ''
      const cityLabel = city || ''
      const contactLabel = contactName || ''

      // If it's a private client, prioritize the person's name in the subtitle
      const details = type === 'hni' 
        ? [contactLabel, cityLabel].filter(Boolean).join(' | ')
        : [typeLabel, industryLabel, cityLabel].filter(Boolean).join(' | ')

      return {
        title: title || 'Unnamed Client',
        subtitle: details,
        media,
      }
    },
  },
})
