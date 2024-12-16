export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'recycling',
      title: 'Recycling',
      type: 'string'
    },
    {
      name: 'loading',
      title: 'Loading Text',
      type: 'string'
    }
  ]
}
