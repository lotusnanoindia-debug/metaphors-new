export default {
  name: 'sector',
  title: 'Sector Expertise',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Sector Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g., Hospitality & Leisure',
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
      name: 'focus',
      title: 'Core Focus',
      type: 'string',
      placeholder: 'e.g., Operational longevity and guest experience.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'approach',
      title: 'Strategic Approach',
      type: 'text',
      rows: 2,
      placeholder: 'Describe the engineering methodology for this sector.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'proof',
      title: 'Proof Points',
      type: 'string',
      placeholder: 'e.g., Flagship work: The Corinthians Resort.',
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
