import { ImageSquare } from 'phosphor-react'

export default {
  title: 'Media Full Bleed',
  name: 'mediaFull',
  type: 'object',
  icon: ImageSquare,
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'media',
      validation: Rule => Rule.required()
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string'
    },
  ],
  preview: {
    select: {
      title: 'caption[0].children[0].text',
      image: 'media.media.0.image',
      video: 'media.media.0.video'
    },
    prepare({ title, image, video }) {
      return {
        title: title ? title : video ? 'Video' : 'Image',
        subtitle: 'Media Full Bleed',
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
