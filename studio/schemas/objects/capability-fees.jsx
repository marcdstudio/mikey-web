import React from 'react'
import { Money } from 'phosphor-react'

export default {
  title: 'Fees',
  name: 'capabilityFees',
  type: 'object',
  icon: Money,
  fieldsets: [
    {
      title: 'Settings',
      name: 'settings',
      options: { columns: 2 }
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'complexPortableText'
    },
    {
      title: 'Structure',
      name: 'structure',
      type: 'complexPortableText'
    },
    {
      title: 'Line Items',
      name: 'items',
      type: 'array',
      of: [
        {
          title: 'Items',
          name: 'items',
          type: 'object',
          fields: [
            {
              title: 'Feature Set',
              name: 'feature',
              type: 'reference',
              to: [{ type: 'feature' }]
            },
            {
              title: 'Timeline',
              name: 'timeline',
              type: 'reference',
              to: [{ type: 'timeline' }]
            },
            {
              title: 'Cost',
              name: 'cost',
              type: 'string'
            }
          ],
          preview: {
            select: {
              feature: 'feature.title',
              timeline: 'timeline.title',
              cost: 'cost'
            },
            prepare(selection) {
              const { feature, timeline, cost } = selection
              return {
                title: feature,
                subtitle: `${timeline} | ${cost}k`
              }
            }
          }
        }
      ]
    },
    {
      title: 'Cost Summation',
      name: 'summation',
      type: 'string',
      description:
        'This will override the line items pricing, used for things like discounted fees.',
      hidden: ({ parent }) => !parent?.override
    },
    {
      title: 'Override Costs',
      name: 'override',
      type: 'boolean',
      // fieldset: 'settings',
      description:
        'This will override the line items pricing, used for things like discounted fees.',
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title
      }
    }
  }
}
