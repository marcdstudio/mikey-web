import React from 'react'
import { TextAlignLeft } from 'phosphor-react'

export default {
  title: 'Description',
  name: 'description',
  type: 'object',
  icon: TextAlignLeft,
  fields: [
    {
      name: 'section',
      title: 'Section',
      type: 'reference',
      to: [{ type: 'projectSection' }],
      options: {
        filter: async ({ document }) => {
          const addedSections = document.sections
            .map(p => p._ref)
            .filter(Boolean)

          return {
            filter: '(_id in $ids)',
            params: {
              ids: addedSections
            }
          }
        }
      },
      hidden: ({ document }) => document?._type != 'project'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'complexPortableText'
    },
    {
      title: 'Display',
      name: 'display',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile', value: 'mobile' },
          { title: 'Desktop', value: 'desktop' },
          { title: 'Both', value: 'both' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ],
  preview: {
    select: {
      body: 'body',
      blocks: 'body',
      section: 'section.title'
    },
    prepare({ body, blocks, section }) {
      const block = (blocks || []).find(block => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
        subtitle: section ? section : 'Assign a section'
      }
    }
  }
}
