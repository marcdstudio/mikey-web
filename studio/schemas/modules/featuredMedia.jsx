import { ImageSquare } from 'phosphor-react'

export default {
  title: 'Media Feature',
  name: 'featuredMedia',
  type: 'object',
  icon: () => <ImageSquare />,
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'media'
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string'
    },
    {
      title: 'Padding',
      name: 'padding',
      type: 'string',
      description: 'Controls the vertical padding.',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Both', value: 'both' },
          { title: 'None', value: 'none' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'both'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      description: 'Controls the width of the media.',
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'XL', value: 'xl' },
          { title: 'Full', value: 'full' },
          { title: 'Bleed (No Horizontal Padding)', value: 'bleed' }
        ],
        layout: 'dropdown',
        direction: 'horizontal',
        initialValue: 'full'
      },
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      description: 'Controls the horizontal position of the media.',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'dropdown',
        direction: 'horizontal',
        initialValue: 'center'
      },
      hidden: ({ parent }) => parent?.maxHeight
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      video: 'media.media[0].video',
      image: 'media.media[0].image'
    },
    prepare({ caption, video, image }) {
      return {
        title: caption || `${video ? 'Video' : 'Image'} Feature`,
        subtitle: caption ? `${video ? 'Video' : 'Image'} Feature` : null,
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
          image || <ImageSquare />
        )
      }
    }
  }
}
