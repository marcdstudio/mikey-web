export default {
  title: 'Selected Work',
  name: 'selectedWork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'filters',
      title: 'Filters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      hidden: true,
    },
    { 
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }]
    },
    {
      name: 'reel',
      title: 'Reel',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ]
}
