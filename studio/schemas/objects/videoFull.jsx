import React from 'react'

export default {
  title: 'Video Full',
  name: 'videoFull',
  type: 'object',
  fields: [
    {
      name: 'section',
      title: 'Section',
      type: 'reference',
      to: [{ type: 'projectSection' }],
      options: {
        filter: async ({ document }) => {
          const addedSections = document.sections
            .map(p => p._ref)
            .filter(Boolean)

          return {
            filter: '(_id in $ids)',
            params: {
              ids: addedSections
            }
          }
        }
      },
      // hidden: ({ document }) => document?._type != 'project',
      hidden: true
    },
    {
      name: 'video',
      title: 'Video',
      description: 'paste the vimeo id',
      type: 'string'
    },
    {
      name: 'videoHD',
      title: 'Video HD',
      description: 'paste the vimeo id of the HD version',
      type: 'string'
    },
    {
      name: 'videoPlaceholder',
      title: 'Video Placeholder',
      type: 'a11yImage'
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      initialValue: 'vertical',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'caption',
      video: 'video'
    },
    prepare({ title, video }) {
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
        ) : null
      }
    }
  }
}
