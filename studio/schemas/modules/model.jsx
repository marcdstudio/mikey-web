import { Cube } from 'phosphor-react'

export default {
  title: 'Model',
  name: 'model',
  type: 'object',
  icon: Cube,
  fields: [
    {
      title: 'Model',
      name: 'model',
      type: 'file',
      validation: Rule => Rule.required(),
      description: 'Must be a gltf file.'
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string'
    },
  ],
  preview: {
    select: {
      title: 'caption',
      image: 'media.media.0.image',
      video: 'media.media.0.video'
    },
    prepare({ title, image, video }) {
      return {
        title: title || 'No Caption',
        subtitle: 'Model',
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
