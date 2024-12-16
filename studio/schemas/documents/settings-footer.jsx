import { AnchorSimple} from 'phosphor-react'


export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  icon: AnchorSimple,
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navLink' }]
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
