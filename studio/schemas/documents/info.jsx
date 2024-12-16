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
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Studio Description',
      type: 'string'
    },
    {
      name: 'about',
      title: 'About',
      type: 'complexPortableText'
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
