import { Tag } from 'phosphor-react'

export default {
  title: 'Client Industry',
  name: 'industry',
  type: 'document',
  icon: Tag,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
