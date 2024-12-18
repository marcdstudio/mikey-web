import { Columns } from 'phosphor-react'

export default {
  title: 'Media 2-Up',
  name: 'media2Up',
  type: 'object',
  icon: () => <Columns />,
  fields: [
    {
      title: '2-Up Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule) => Rule.required().min(2).max(2),
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string'
    },
    {
      title: 'Drawing',
      name: 'drawing',
      type: 'boolean',
      initialValue: false
    },
  ],
  preview: {
    select: {
      title: 'caption',
      video: 'content.0.media.0.video',
      image: 'content.0.media.0.image',
    },
    prepare({ title, video, image }) {
      return {
        title: title || 'No Caption',
        subtitle: 'Media 2-Up',
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
