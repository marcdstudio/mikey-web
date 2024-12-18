import React from 'react'

import Link from '@components/link'
import BlockContent from '@components/block-content'

const MediaText3Up = ({ data = {} }) => {
  const { items } = data

  return (
    <div className={`w-full h-full grid-standard grid-rows-6 relative z-2`}>
        {items?.map((item, key) => {
          return (
            <div key={key} className="row-start-3 col-span-2 flex flex-col justify-between">
              <div className='flex-1 flex flex-col justify-between py-12'>
                <div className=''>{item.title}</div>
                <Link className="title-md" link={item.link}/>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default MediaText3Up
