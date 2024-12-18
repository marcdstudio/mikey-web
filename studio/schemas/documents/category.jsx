import React from 'react'
import { Tag } from 'phosphor-react'

export default {
  title: 'Project Category',
  name: 'category',
  type: 'document',
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
    {
      name: 'color',
      title: 'Color',
      type: 'color',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'media',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Should be one sentence.'
    },
  ],
  preview: {
    select: {
        title: 'title',
        subtitle: 'subtitle',
        video: 'thumbnail.media.0.video',
        image: 'thumbnail.media.0.image',
    },
    prepare({ title, subtitle, video, image }) {
        return {
            title: title,
            subtitle: subtitle,
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
                            objectFit: 'cover',
                        }}
                        src={video}
                    ></video>
                </div>
            ) : (
                image
            ),
        }
    },
},
}
