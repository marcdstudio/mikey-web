import React from 'react'

export default {
  title: 'Project Directory',
  name: 'directory',
  type: 'document',
  fields: [
    {
      name: 'indexItems',
      title: 'Index Items',
      type: 'array',
      of: [{ type: 'indexItem' }],
    },
  ],
  preview: {
    prepare() {
      const { title } = 'Project Directory'
      return {
        title: title,
        media: <span style={{ fontSize: '1.5rem' }}>♟️</span>,
      }
    },
  },
}
