import React from 'react'
import { Handshake, Circle } from 'phosphor-react'

export default {
  title: 'Deliverables',
  name: 'capabilityDeliverables',
  type: 'object',
  icon: Handshake,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          title: 'Items',
          name: 'items',
          type: 'object',
          icon: Circle,
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Description',
              name: 'description',
              type: 'complexPortableText',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description.0.children.0.text',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: subtitle,
              }
            },
          },
        },
      ],
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
      }
    },
  },
}
