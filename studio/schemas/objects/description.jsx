import React from 'react'
import { TextAlignLeft } from 'phosphor-react'

export default {
  title: 'Description',
  name: 'description',
  type: 'object',
  icon: TextAlignLeft,
  fields: [
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
