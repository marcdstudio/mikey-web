import { Columns } from 'phosphor-react'

export default {
    title: 'Media & Text 2-Up',
    name: 'mediaText2Up',
    type: 'object',
    icon: () => <Columns />,
    fields: [
        {
            title: 'Media',
            name: 'media',
            type: 'media',
        },
        {
            title: 'Content',
            name: 'content',
            type: 'simplePortableText'
        }
    ],
    preview: {
        select: {
            title: 'content.0.children.0.text',
            video: 'media.media.0.video',
            image: 'media.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title,
                subtitle: 'Media & Text 2-Up',
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
                    image || <Columns />
                ),
            }
        },
    },
}
