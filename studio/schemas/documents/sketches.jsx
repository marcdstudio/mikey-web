import { Circle } from 'phosphor-react'

export default {
    title: 'Sketches',
    name: 'sketches',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string'
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required(),
            hidden: true
        },
        {
            name: 'sketches',
            title: 'Sketches',
            description: '(Required)',
            type: 'array',
            of: [
                {
                    name: 'sketch',
                    title: 'Sketch',
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'asset'
                        },
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string'
                        },
                    ]
                }
            ],
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo'
        }
    ]
}
