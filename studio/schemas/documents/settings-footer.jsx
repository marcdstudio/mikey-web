import { AnchorSimple} from 'phosphor-react'


export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  icon: AnchorSimple,
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Social Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'asset' }],
      validation: Rule => Rule.min(4).max(4)
    },
    {
      title: 'Instagram Url',
      name: 'instagram',
      type: 'string',
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navLink' }]
    },
    {
      title: 'Banner',
      name: 'banner',
      type: 'marquee',
    },
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
}
