import React from 'react'

export default {
    title: 'Work',
    name: 'work',
    type: 'document',
    fields: [
        {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    name: 'section',
                    title: 'Section',
                    type: 'object',
                    fields: [
                        {
                            name: 'category',
                            title: 'Category',
                            type: 'reference',
                            to: [{ type: 'category' }]
                        },
                        {
                            name: 'projects',
                            title: 'Projects',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'project' }] }],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'category.title',
                            projects: 'projects',
                            video: 'projects.0.thumbnail.media.0.video',
                            image: 'projects.0.thumbnail.media.0.image',
                        },
                        prepare({ title, video, image, projects }) {
                            const length = Object.keys(projects).length; 

                            return {
                                title: title,
                                subtitle: `${length} Projects`,
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
                },

            ],
        },
    ],
    preview: {
        prepare() {
            const { title } = 'Work'
            return {
                title: title,
                media: <span style={{ fontSize: '1.5rem' }}>♟️</span>,
            }
        },
    },
}
