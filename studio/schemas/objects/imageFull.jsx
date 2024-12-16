import React from 'react'

export default {
  title: 'Image Full',
  name: 'imageFull',
  type: 'object',
  options: {
    collapsible: false
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      hidden: true
    },
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage'
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'vertical',
      hidden: true
    },
    {
      title: 'Reverse Direction',
      description:
        'This will display the image on the right and text on the left.',
      name: 'reverse',
      type: 'boolean',
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'image.alt',
      caption: 'caption',
      media: 'image.image',
      section: 'section.title'
    },
    prepare(selection) {
      const { title, caption, media, section } = selection
      return {
        title: caption ? caption : title || 'Full Bleed Image',
        // subtitle: section ? section : 'Assign a section',
        media: media
      }
    }
  }
}
