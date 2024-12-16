import { Article } from 'phosphor-react'

export default {
  title: 'General Text',
  name: 'generalText',
  type: 'object',
  icon: Article,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'content',
      type: 'complexPortableText'
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title,
      }
    }
  }
}
