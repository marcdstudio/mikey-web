import React from 'react'
import { decodeAssetUrl } from '../../lib/helpers'
import { MagnifyingGlass } from 'phosphor-react'


export default {
  title: 'Default SEO / Share',
  name: 'seoSettings',
  type: 'document',
  icon: MagnifyingGlass,
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Default Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: Rule =>
        Rule.max(50).warning('Longer titles may be truncated by search engines')
    },
    {
      title: 'Default Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: Rule =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        )
    },
    {
      title: 'Default Share Title',
      name: 'shareTitle',
      type: 'string',
      description: 'Title used for social sharing cards',
      validation: Rule =>
        Rule.max(50).warning('Longer titles may be truncated by social sites')
    },
    {
      title: 'Default Share Description',
      name: 'shareDesc',
      type: 'text',
      rows: 3,
      description: 'Description used for social sharing cards',
      validation: Rule =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by social sites'
        )
    },
    {
      title: 'Default Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Recommended size: 1200x630 (PNG or JPG)'
    },
    {
      title: 'Browser Icon (Favicon)',
      name: 'favicon',
      type: 'image',
      description: 'Upload a 16 x 16 SVG icon to use as the browser icon',
      // options: {
      //   accept: 'image/svg+xml'
      // },
    },
    // {
    //   title: 'Legacy Browser Icon (.ico)',
    //   name: 'faviconLegacy',
    //   type: 'file',
    //   description: 'Upload a 32 x 32 .ico file for older browsers',
    //   validation: Rule => {
    //     return Rule.custom(field => {
    //       if (!field) return true

    //       const { format } = decodeAssetUrl(field.asset._ref)

    //       if (format !== 'ico') {
    //         return 'Legacy Favicon must be a 32x32 ICO file'
    //       } else {
    //         return true
    //       }
    //     })
    //   }
    // },
    {
      title: 'Touch Icon',
      name: 'touchIcon',
      type: 'image',
      description: 'Recommended size: 192x192 (PNG)'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Default SEO / Share'
      }
    }
  }
}
