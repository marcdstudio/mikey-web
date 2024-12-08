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
      name: 'serviceTags',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    },
    {
      name: 'press',
      title: 'Press',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url'
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date'
            }
          ]
        }
      ]
    },
    {
      name: 'contact',
      type: 'object',
      title: 'Contact',
      fields: [
        {
          name: 'cta',
          title: 'CTA',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        }
      ]
    },
    {
      title: 'Services',
      name: 'services',
      hidden: true,
      type: 'array',
      of: [
        {
          name: 'service',
          title: 'Service',
          type: 'object',
          icon: Circle,
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Description',
              type: 'simplePortableText'
            }
          ]
        }
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'asset'
    },
    {
      name: 'openings',
      title: 'Openings',
      type: 'simplePortableText'
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
