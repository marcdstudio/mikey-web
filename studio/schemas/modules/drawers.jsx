import { DotsThreeOutline } from 'phosphor-react'

export default {
    title: 'Drawers',
    name: 'drawers',
    type: 'object',
    icon: () => <DotsThreeOutline />,
    fields: [
        {
            title: 'Drawers',
            name: 'drawers',
            type: 'array',
            of: [
                {
                    title: 'Drawer',
                    name: 'drawer',
                    type: 'object',
                    fields: [
                        {
                            title: 'Media',
                            name: 'media',
                            type: 'media'
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
                        },
                        {
                            title: 'Link',
                            name: 'link',
                            type: 'url'
                        },
                        {
                            title: 'Date',
                            name: 'date',
                            type: 'date'
                        },
                    ]
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'drawers.0.title',
            video: 'drawers.0.media.media.0.video',
            image: 'drawers.0.media.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title,
                subtitle: 'Drawers',
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
                    image || <DotsThreeOutline />
                ),
            }
        },
    },
}
