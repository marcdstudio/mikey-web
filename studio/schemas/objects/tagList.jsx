import React from 'react'

export default {
  title: 'Tag List',
  name: 'tagList',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        media: <span style={{ fontSize: '1.5rem' }}>🛒</span>,
      }
    },
  },
}
