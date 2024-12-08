import React from 'react'

import BlockContent from '@components/block-content'

const capabilityBlock = ({ data = {} }) => {
  const { content, title } = data

  return (
    <section className="w-full">
      <h2 className="">
        {title}
      </h2>
      <div className='mt-15 pr-20'>
        <BlockContent blocks={content}/>
      </div>
    </section>
  )
}

export default capabilityBlock
