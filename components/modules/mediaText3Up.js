import React from 'react'

import Media from '@components/media'
import BlockContent from '@components/block-content'

const MediaText3Up = ({ data = {} }) => {
  const { items } = data

  return (
    <div className={`w-full h-full grid-standard relative z-2`}>
        {items?.map((item, key) => {
          return (
            <div key={key} className="col-span-2 pt-[33.333vh] flex flex-col justify-end">
              <div className='w-full h-[33.333vh] relative py-12'>
                  <div className='w-full h-full relative'>
                      <Media
                        className={'absolute left-0 top-0 w-full h-full object-cover'}
                        width={1800}
                        layout={'fill'}
                        media={item?.media?.content}
                        controls={true}
                      />
                  </div>
              </div>
              <div className='flex-1 flex flex-col justify-between py-12'>
                <div className='title-md'>{item.title}</div>
                <div className='max-w-[35rem]'><BlockContent blocks={item.content}/></div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default MediaText3Up
