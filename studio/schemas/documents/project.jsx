import React from 'react'
import { Browser } from 'phosphor-react'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: Browser,
  fieldsets: [],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(optional)'
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
      name: 'description',
      title: 'Product Description',
      type: 'simplePortableText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      description: '(Required)',
      type: 'media',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mediaPreview',
      title: 'Preview Media',
      description: '(Required) Used in the project index list view.',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contentModules',
      title: 'Content Modules',
      description: '(Required)',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        { type: 'mediaFull' },
        { type: 'media2Up' },
        { type: 'media3Up' },
        { type: 'blockText' },
      ],
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code',
      industry: 'industries.0.title',
      image: 'thumbnail.media.0.image',
      video: 'thumbnail.media.0.video',
      year: 'year',
    },
    prepare({ title, image, video, industry, code }) {
      return {
        title: title ? title : video ? 'Video' : 'Image',
        subtitle: `NK-${code} | ${industry}`,
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
