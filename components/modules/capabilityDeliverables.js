import React, { useRef, useState, useEffect, useMemo } from 'react'

import BlockContent from '@components/block-content'

const capabilityDeliverables = ({ data = {} }) => {
  const { items, title } = data

  return (
    <section className="w-full deliverables">
      <h2 className="w-full">{title}</h2>
      <section className="w-full mt-10 flex flex-col gap-10">
        {items?.map((item, key) => {
          return (
            <div key={key} className="w-full">
              <div className="flex gap-10">
                <div className="w-[1.6rem] mt-2 h-[1.6rem] bg-[#D9D9D9] rounded-full flex items-center justify-center font-mono uppercase text-8">
                  {key + 1}
                </div>
                <div className="">{item?.title}</div>
              </div>
              {item?.content && (
                <div className="w-full ml-11">
                  <BlockContent blocks={item?.content} />
                </div>
              )}
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default capabilityDeliverables
