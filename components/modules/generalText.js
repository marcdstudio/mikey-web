import React from 'react'

import BlockContent from '@components/block-content'

const GeneralText = ({ data = {} }) => {
  const { title, content } =
    data

  return (
    <div className="px-15 md:px-20 mt-100 mb-100 relative z-2 flex">
        <div className='w-full max-w-[80rem] mx-auto'>
            {title && (<h1 className='w-full text-center mb-25'>{title}</h1>)}
            <div className='w-full'>
                <BlockContent blocks={content}/>
            </div>
        </div>
    </div>
  )
}

export default GeneralText
