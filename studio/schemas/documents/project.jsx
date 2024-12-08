import React from 'react'
import { Circle } from 'phosphor-react'

export default {
  title: 'Project',
  name: 'project',
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
      name: 'description',
      title: 'Page Description',
      type: 'complexPortableText',
      hidden: true
    },
    {
      name: 'descriptionThumbnail',
      title: 'Description',
      type: 'complexPortableText'
    },
    {
      name: 'info',
      title: 'Info',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'link',
          title: 'Project Link',
          type: 'url'
        },
        {
          name: 'thumbVideo',
          title: 'Thumbnail Video',
          description: 'paste the vimeo distrubution link',
          type: 'string'
        },
        {
          name: 'thumbPlaceholder',
          title: 'Video Placeholder',
          description:
            'This is a downsized placeholder to display while the video is loading.',
          type: 'a11yImage'
        },
        {
          name: 'thumbBackground',
          title: 'Thumbnail Background',
          description:
            'Displays behind the primary thumbnail media in Selectd Work.',
          type: 'a11yImage'
        },
        {
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: { type: 'tag' },
              options: {
                filter: async ({ document }) => {
                  const addedItems = document.info.tags
                    .map(el => el._ref)
                    .filter(Boolean)

                  return {
                    filter: '!(_id in $ids)',
                    params: {
                      ids: addedItems
                    }
                  }
                }
              }
            }
          ]
        },
        {
          name: 'categories',
          title: 'Categories',
          type: 'array',
          hidden: true,
          of: [
            {
              type: 'reference',
              to: { type: 'category' },
              options: {
                filter: async ({ document }) => {
                  const addedItems = document.info.categories
                    .map(el => el._ref)
                    .filter(Boolean)

                  return {
                    filter: '!(_id in $ids)',
                    params: {
                      ids: addedItems
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'reference',
          to: [{ type: 'projectSection' }],
          options: {
            filter: ({ document, parent }) => {
              const addedSections = document.sections
                .map(s => s._ref)
                .filter(Boolean)

              return {
                filter: '!(_id in $ids)',
                params: {
                  ids: addedSections
                }
              }
            }
          }
        }
      ]
    },
    {
      title: 'Content Modules',
      name: 'contentModules',
      type: 'array',
      of: [
        { type: 'videoFull' },
        { type: 'imageFull' },
        { type: 'description' }
      ]
    },
    {
      title: 'Credit List',
      name: 'creditList',
      type: 'array',
      of: [
        {
          name: 'list',
          title: 'List',
          type: 'object',
          icon: Circle,
          fields: [
            {
              name: 'credit',
              title: 'Credit',
              type: 'reference',
              to: [{ type: 'credit' }]
            },
            {
              name: 'credits',
              title: 'Credits',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'profile' }] }]
            }
          ],
          preview: {
            select: {
              title: 'credit.title',
              credits: 'credits'
            },
            prepare({ title, credits }) {
              return {
                title: title,
                // subtitle: credits.map(credit => credit.title).join(', ')
              }
            }
          }
        }
      ]
    },
    {
      name: 'related',
      title: 'Related Work',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      hidden: true
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      video: 'info.thumbVideo',
      image: 'info.thumbPlaceholder.image'
    },
    prepare({ title, video, image }) {
      return {
        title: title || ' Full Beed Video',
        media: video ? (
          <div style={{ width: '100%', height: '100%' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              src={video}
            ></video>
          </div>
        ) : (
          image
        )
      }
    }
  }
}
