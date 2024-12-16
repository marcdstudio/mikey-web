import React from 'react'
import { Browser } from 'phosphor-react'


export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: () => <Browser />,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      slugify: input =>
        input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'marquee' },
        { type: 'generalText' },
        {
          title: 'Reusable Section',
          type: 'reference',
          to: [{ type: 'section' }]
        }
      ]
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `/${slug.current}`
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)'
      }
    }
  }
}
