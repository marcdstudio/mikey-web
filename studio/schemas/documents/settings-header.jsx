import { WarningCircle, Compass, Circle } from 'phosphor-react'

export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  icon: Compass,
  // __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      name: 'nav',
      title: 'Navigation',
      type: 'array',
      of: [{type: 'navPage'}, {type: 'navLink'}]
    },
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
