import { List } from 'phosphor-react'

export default {
    title: 'Categories',
    name: 'categories',
    type: 'object',
    icon: () => <List />,
    fields: [
        {
            title: 'Items',
            name: 'items',
            type: 'array',
            // validation: Rule => Rule.min(3).max(3),
            of: [{ type: 'reference', to: [{ type: 'category' }] }]
        },
    ],
    preview: {
        select: {
            title: 'items.0.title',
            video: 'items.0.thumbnail.media.0.video',
            image: 'items.0.thumbnail.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title,
                subtitle: 'Categories',
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
