import React from 'react'

import Media from '@components/media'
import Carousel from '@components/carousel'
import BlockContent from '@components/block-content'

const MediaText2Up = ({ data = {} }) => {
  const { media, content } = data

  return (
    <div className={`w-full h-full grid-standard md:items-end relative z-2`}>
      <div className="col-span-3 md:col-span-2 h-full relative pt-[16.666667vh]">
        <div className='w-full h-[50vh] py-12'>
          <div className='w-full h-full'>
            <Media
              className={'w-full h-full object-cover'}
              width={1800}
              layout={'fill'}
              media={media?.content}
              controls={true}
            />
          </div>
        </div>
      </div>
      <div className='col-span-3 md:col-start-4 line-clamp-6 md:line-clamp-none pb-18'>
        <BlockContent blocks={content}/>
      </div>
    </div>
  )
}

export default MediaText2Up
