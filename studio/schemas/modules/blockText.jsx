import { Article } from 'phosphor-react'

export default {
  title: 'Text Block',
  name: 'blockText',
  type: 'object',
  icon: () => <Article />,
  fieldsets: [
    {
      title: 'Settings',
      name: 'settings',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      title: 'Body',
      name: 'content',
      type: 'complexPortableText',
    },
    {
      title: 'CTA',
      name: 'link',
      type: 'array',
      of: [{ type: 'navLink' }, { type: 'navPage' }],
      validation: (Rule) => Rule.max(1),
      hidden: true,
    },
    {
      title: 'Width',
      name: 'width',
      type: 'string',
      fieldset: 'settings',
      options: {
        list: [
          { title: '4-Column', value: 'narrow' },
          { title: '8-Column', value: 'wide' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'narrow',
    },
    {
      title: 'Alignment',
      name: 'alignment',
      type: 'string',
      fieldset: 'settings',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      body: 'content.0.children.0.text',
    },
    prepare({ image, video, body }) {
      return {
        title: body || 'Block Text',
        subtitle: 'Block Text',
        media: <Article />,
      }
    },
  },
}
