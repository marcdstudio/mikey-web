import { Circle } from 'phosphor-react'

export default {
  title: 'Info',
  name: 'info',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
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
      validation: Rule => Rule.required(),
      hidden: true
    },
    {
      name: 'contentModules',
      title: 'Content Modules',
      description: '(Required)',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        { type: 'hero' },
        { type: 'mediaFull' },
        { type: 'media2Up' },
        { type: 'mediaText2Up' },
        { type: 'mediaText3Up' },
        { type: 'mediaText' },
        { type: 'carousel' },
        { type: 'model' },
        { type: 'categories' },
        { type: 'link3Up' },
        { type: 'drawers' }
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
