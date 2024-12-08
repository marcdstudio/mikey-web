import { Article } from 'phosphor-react'

export default {
  title: 'Capability',
  name: 'capability',
  type: 'document',
  icon: Article,
  fieldsets: [
    {
      title: '',
      name: 'settings',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Won', value: 'won' },
          { title: 'Lost', value: 'lost' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'active',
    },
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
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'settings',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'settings',
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Brand', value: 'brand' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'settings',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      fieldset: 'settings',
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            filter: async ({ document }) => {
              const addedItems = document.projects
                .map((el) => el._ref)
                .filter(Boolean)

              return {
                filter: '!(_id in $ids)',
                params: {
                  ids: addedItems,
                },
              }
            },
          },
        },
      ],
    },
    {
      name: 'modules',
      title: 'Content Modules',
      type: 'array',
      of: [
        { type: 'capabilityDrawer' },
        { type: 'capabilityBlock' },
        { type: 'capabilityDeliverables' },
        { type: 'capabilityFees' },
      ],
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
    },
    prepare({ title, subtitle }) {
      console.log('status', subtitle);
      return {
        title: title,
        subtitle: `Status: ${subtitle}`,
      }
    },
  },
}
