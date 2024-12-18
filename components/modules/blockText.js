import React from 'react'

import BlockContent from '@components/block-content'

const BlockText = ({ data = {}, type }) => {
  const { content, width, alignment } = data

  return (
    <section
      className={`mt-32 mb-96 px-14 md:px-32 grid grid-cols-12 gap-32`}
    >
      <div
        className={`w-full relative${width == 'narrow' ? ' col-span-12 md:col-span-4' : ' col-span-12 md:col-span-8'}${alignment == 'right' ? ' col-span-1  md:col-start-5' : ' col-span-1'}`}
      >
        <div className={`absolute top-25 md:top-30 left-50 md:left-60 h-[calc(100%-5rem)] md:h-[calc(100%-5.5rem)] bg-highlight${width == 'narrow' ? ' col-span-12 md:col-span-4' : ' col-span-12 md:col-span-8'}${alignment == 'right' ? ' w-[calc(100%-5rem)] md:w-[calc(100%-5.5rem)]' : ' w-[calc(100%-5rem)] md:w-[calc(100%-8.4rem)]'}`}></div>
        <div className="block-highlight relative z-2">
          <BlockContent blocks={content} />
        </div>
      </div>
    </section>
  )
}

export default BlockText
