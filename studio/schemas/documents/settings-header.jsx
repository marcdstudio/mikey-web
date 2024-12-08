import { WarningCircle, Compass, Circle } from 'phosphor-react'

export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  icon: Compass,
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
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
      name: 'marquee',
      title: 'Marquee',
      type: 'marquee'
    },
    {
      name: 'news',
      title: 'News',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'file'
        },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              name: 'item',
              title: 'Item',
              type: 'object',
              icon: Circle,
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'asset'
                },
                {
                  name: 'logo',
                  title: 'Logo',
                  type: 'asset'
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'date'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'url'
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  date: 'date',
                  image: 'image.image'
                },
                prepare({ date, title, image }) {
                  return {
                    media: image,
                    title: title,
                    subtitle: date
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      date: 'date',
    },
    prepare({ date, image }) {
      return {
        title: 'Header Settings',
        subtitle: date
      }
    }
  }
}
