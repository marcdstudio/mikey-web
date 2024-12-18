import React from 'react'
import { Browser, SmileyBlank } from 'phosphor-react'

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
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          name: 'credit',
          title: 'Credit',
          type: 'object',
          icon: SmileyBlank,
          fields: [
            {
              name: 'profile',
              title: 'Profile',
              type: 'reference',
              to: [{ type: 'profile' }]
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'profile.title',
              link: 'profile.link',
            },
            prepare({ title, link }) {
              return {
                title: title ? title : video ? 'Video' : 'Image',
                subtitle: link || 'No Link',
              }
            },
          },
        },
      ]
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
        { type: 'carousel' },
        { type: 'model' },
      ],
    },
    {
      name: 'related',
      title: 'Related Projects',
      description: '(Required)',
      type: 'array',
      validation: (Rule) => Rule.required().min(3).max(3),
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
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
      industry: 'category.title',
      image: 'thumbnail.media.0.image',
      video: 'thumbnail.media.0.video',
      year: 'year',
    },
    prepare({ title, image, video, industry, code }) {
      return {
        title: title ? title : video ? 'Video' : 'Image',
        subtitle: `${industry}`,
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
