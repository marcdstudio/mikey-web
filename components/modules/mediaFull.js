import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Media from '@components/media'

const MediaFull = ({ data = {} }) => {
  const { media, caption } = data

  console.log('caption', caption)

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div className={`relative w-[66%] h-[66%]`}>
        {media && (
          <Media
            className={'w-full h-full object-contain'}
            width={2400}
            layout={'contain'}
            media={media.content}
            controls={true}
          />
        )}
      </div>
      {caption && (
        <div className={`absolute bottom-36 left-24 media--caption`}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default MediaFull
