import { ImageSquare } from 'phosphor-react'

export default {
  title: 'Media Full',
  name: 'mediaFull',
  type: 'object',
  icon: ImageSquare,
  fieldsets: [
    {
      title: 'Settings',
      name: 'settings',
      options: { columns: 2 },
    },
  ],
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
    {
      title: 'Bleed',
      name: 'bleed',
      type: 'boolean',
      initialValue: false,
      fieldset: 'settings',
    },
    {
      title: 'Drawing',
      name: 'drawing',
      type: 'boolean',
      initialValue: false,
      fieldset: 'settings',
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
        subtitle: 'Media Full',
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
