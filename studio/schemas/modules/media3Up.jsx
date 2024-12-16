import { DotsThreeOutline } from 'phosphor-react'

export default {
  title: 'Media 3-Up',
  name: 'media3Up',
  type: 'object',
  icon: () => <DotsThreeOutline />,
  fields: [
    {
      title: '3-Up Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule) => Rule.required().min(3).max(3),
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      video: 'content.0.media.media.0.video',
      image: 'content.0.media.media.0.image',
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
                objectFit: 'cover',
              }}
              src={video}
            ></video>
          </div>
        ) : (
          image || <DotsThreeOutline />
        ),
      }
    },
  },
}
