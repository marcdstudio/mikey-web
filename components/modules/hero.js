import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Media from '@components/media'

const Hero = ({ data = {} }) => {
  const { media, background } = data

  return (
    <div className={`w-full h-full flex justify-center items-end px-24 pb-18`}>
      <div className={`relative w-full h-[calc(83.3333%-1.2rem)]`}>
        <div className="w-full h-full px-24 py-24 bg-[rgba(0,0,0,.2)] flex items-center justify-center z-3 relative">
          {media && (
            <>
              {background ? (
                <div className='w-[80%] h-[80%] flex items-center justify-center'>
                    <Media
                      className={`w-full h-full object-contain`}
                      width={2400}
                      layout={'contain'}
                      media={media?.content}
                      controls={true}
                    />
                </div>
              ) : (
                <Media
                  className={`w-full h-full object-cover`}
                  width={2400}
                  layout={'fill'}
                  media={media?.content}
                  controls={true}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
