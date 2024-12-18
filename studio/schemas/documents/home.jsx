export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'contentModules',
      title: 'Content Modules',
      description: '(Required)',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        { type: 'featuredProject' },
        { type: 'featuredProject3Up' },
        { type: 'mediaText2Up' },
        { type: 'drawers' }
      ],
    },
  ]
}
