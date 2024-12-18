import { ImageSquare } from 'phosphor-react'

export default {
  title: 'Hero',
  name: 'hero',
  type: 'object',
  icon: ImageSquare,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Media',
      name: 'media',
      type: 'media',
      validation: Rule => Rule.required()
    },
    {
        title: 'Background',
        name: 'background',
        type: 'boolean',
      },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'media.media.0.image',
      video: 'media.asset'
    },
    prepare({ title, image, video }) {
      return {
        title: 'Hero',
        subtitle: 'Hero',
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
                objectFit: 'cover'
              }}
              src={video}
            ></video>
          </div>
        ) : (
          image
        )
      }
    }
  }
}
