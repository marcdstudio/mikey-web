import React from 'react'
import { MapTrifold } from 'phosphor-react'

export default {
  title: 'Drawer',
  name: 'capabilityDrawer',
  type: 'object',
  icon: MapTrifold,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Drawers',
      name: 'drawers',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'phase' } }]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
      }
    }
  }
}
