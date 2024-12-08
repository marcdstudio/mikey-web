import React from 'react'
import { TextAlignLeft } from 'phosphor-react'

export default {
  title: 'Text Block',
  name: 'capabilityBlock',
  type: 'object',
  icon: TextAlignLeft,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'complexPortableText'
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
