import React from 'react'

export default {
  title: 'Project Directory',
  name: 'directory',
  type: 'document',
  fields: [
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'project' }],
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
