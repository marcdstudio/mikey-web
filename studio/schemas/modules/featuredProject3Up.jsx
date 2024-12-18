import { Columns } from 'phosphor-react'

export default {
    title: 'Featured Project 3-Up',
    name: 'featuredProject3Up',
    type: 'object',
    icon: () => <Columns />,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'Projects',
            name: 'projects',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'project' }] }],
            validation: Rule => Rule.required().min(3).max(3)
        }
    ],
    preview: {
        select: {
            title: 'title',
            video: 'projects.0.thumbnail.media.0.video',
            image: 'projects.0.thumbnail.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title || 'No Title',
                subtitle: 'Featured Project 3-Up',
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
