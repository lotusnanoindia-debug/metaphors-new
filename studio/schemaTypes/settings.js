export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'heroStatureImage',
      title: 'Hero Stature Image (Large)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'heroPrecisionImage',
      title: 'Hero Precision Image (Small)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
