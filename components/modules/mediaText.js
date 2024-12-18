import React from 'react'

import Media from '@components/media'
import Carousel from '@components/carousel'
import BlockContent from '@components/block-content'

const MediaText2Up = ({ data = {} }) => {
  const { media, content, title } = data

  return (
    <div className={`w-full h-full grid-standard items-end relative z-2`}>
      <div className="col-span-2 h-full relative pt-[16.666667vh]">
        <div className='w-full h-[33.333333vh] py-12'>
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
      <div className='col-span-3 col-start-1 pb-18 flex flex-col gap-24'>
        <h2 className='title-lg max-w-[55rem]'>{title}</h2>
        <BlockContent blocks={content}/>
      </div>
    </div>
  )
}

export default MediaText2Up
