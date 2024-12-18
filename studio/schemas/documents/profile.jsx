import { SmileyBlank } from 'phosphor-react'

export default {
  title: 'Profile',
  name: 'profile',
  type: 'document',
  icon: SmileyBlank,
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url'
    },
  ]
}
