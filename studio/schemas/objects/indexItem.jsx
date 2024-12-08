import React from 'react'
import { Circle } from 'phosphor-react'

export default {
  title: 'Index Item',
  name: 'indexItem',
  type: 'object',
  icon: Circle,
  fields: [
    {
      title: 'In-Progess',
      name: 'inProgress',
      type: 'boolean'
    },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean'
    },
    {
      title: 'Client',
      name: 'clientName',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Year',
      name: 'year',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url'
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'industry' } }],
      // validation: Rule => Rule.required().max(1),
      hidden: true,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      // validation: Rule => Rule.required(),
      // hidden: true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'complexPortableText'
    },
    {
      name: 'case',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'project' }]
    }
  ],
  preview: {
    select: {
      title: 'clientName',
      link: 'link',
      inProgress: 'inProgress',
      video: 'case.info.thumbVideo',
      image: 'case.info.thumbPlaceholder.image',
      year: 'year'
    },
    prepare(selection) {
      const { title, link, video, image, year, inProgress } = selection
      return {
        title: title,
        subtitle: `${year}${inProgress ? ` | WIP` : ''}${link ? ` | ${link}` : ''}`,
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
        ) : image
      }
    }
  }
}
