import React from 'react'

import Media from '@components/media'
import Carousel from '@components/carousel'
import BlockContent from '@components/block-content'

const Media2Up = ({ data = {} }) => {
  const { content, caption, drawing } = data

  return (
    <div className={`w-full h-full flex items-center justify-center${drawing ? ' is-drawing' : ''}`}>
      <div className={`relative w-[80%] h-[66%] flex gap-24`}>
        {content?.map((media, key) => {
          return (
            <div key={key} className="w-1/2 h-full relative">
              <Media
                className={'w-full h-full object-contain'}
                width={1800}
                layout={'contain'}
                media={media?.content}
                controls={true}
              />
            </div>
          )
        })}
      </div>
      {caption && (
        <div className={`absolute bottom-36 left-24 media--caption`}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default Media2Up
