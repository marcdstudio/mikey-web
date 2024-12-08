import React from 'react'

export default {
  title: 'Project Directory',
  name: 'indexList',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'In-Progress', value: 'wip' },
          { title: 'Complete', value: 'complete' },
        ],
        layout: 'radio',
      },
      name: 'status',
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
