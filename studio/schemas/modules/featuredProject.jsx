import { Columns } from 'phosphor-react'

export default {
    title: 'Featured Project',
    name: 'featuredProject',
    type: 'object',
    icon: () => <Columns />,
    fields: [
        {
            title: 'Project',
            name: 'project',
            type: 'reference',
            to: [{ type: 'project' }]
        }
    ],
    preview: {
        select: {
            title: 'project.title',
            video: 'project.thumbnail.media.0.video',
            image: 'project.thumbnail.media.0.image',
        },
        prepare({ title, video, image }) {
            return {
                title: title,
                subtitle: 'Featured Project',
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
