import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Media from '@components/media'

const MediaFull = ({ data = {} }) => {
  const { media, caption, bleed, drawing } = data

  return (
    <div className={`w-full h-full flex justify-center${bleed ? ' items-end' : ' items-center'}${drawing ? ' is-drawing' : ''}`}>
      {bleed ? (
        <div className={`relative w-full h-[calc(83.3333%+1.2rem)]`}>
          <div className='w-full h-full px-24 py-24'>
            {media && (
              <Media
                className={`w-full h-full object-cover`}
                width={2400}
                layout={'fill'}
                media={media.content}
                controls={true}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={`relative w-[80%] h-[66%]`}>
          {media && (
            <Media
              className={`w-full h-full object-contain`}
              width={2000}
              layout={'contain'}
              media={media.content}
              controls={true}
            />
          )}
        </div>
      )}
      {caption && (
        <div className={`absolute bottom-36 left-24 media--caption`}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default MediaFull
