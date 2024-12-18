import { ArrowsLeftRight } from 'phosphor-react'

export default {
  title: 'Carousel',
  name: 'carousel',
  type: 'object',
  icon: ArrowsLeftRight,
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'array',
      of: [{ type: 'media'}],
      validation: Rule => Rule.min(4),
      preview: {
        select: {
          title: 'title',
          image: 'images.0.image'
        },
        prepare({ title, image }) {
          return {
            title: 'Images',
            media: image
          }
        }
      }
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
      video: 'media.0.media.0.video',
      image: 'media.0.media.0.image',
    },
    prepare({ title, video, image }) {
      return {
        title: title || 'No Caption',
        subtitle: 'Carousel',
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
