import { Columns } from 'phosphor-react'

export default {
    title: 'Media & Text 3-Up',
    name: 'mediaText3Up',
    type: 'object',
    icon: () => <Columns />,
    fields: [
        {
            title: 'Items',
            name: 'items',
            type: 'array',
            validation: Rule => Rule.min(3).max(3),
            of: [
                {
                    title: 'Item',
                    name: 'item',
                    type: 'object',
                    fields: [
                        {
                            title: 'Media',
                            name: 'media',
                            type: 'media',
                        },
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'simplePortableText'
                        }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'content.0.children.0.text',
                            video: 'media.media.0.video',
                            image: 'media.media.0.image',
                        },
                        prepare({ title, subtitle, video, image }) {
                            return {
                                title: title,
                                subtitle: subtitle,
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
                },
            ]
        },
    ],
    preview: {
        select: {
            title: 'items.0.title',
            video: 'items.0.media.media.0.video',
            image: 'items.0.media.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title,
                subtitle: 'Media & Text 3-Up',
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
