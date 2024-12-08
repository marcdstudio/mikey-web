import React, { useRef, useState, useEffect, useMemo } from 'react'

import BlockContent from '@components/block-content'

const capabilityBlock = ({ data = {} }) => {
  const { description, title, structure, items, override, summation } = data

  let lowCost = 0
  let highCost = 0

  items.forEach((item) => {
    let low = item.cost.includes('-') ? item.cost.split('-')[0] : item.cost
    let high = item.cost.includes('-') ? item.cost.split('-')[1] : item.cost
    lowCost = lowCost + parseInt(low)
    highCost = highCost + parseInt(high)
  })

  return (
    <section className="w-full">
      <h2 className="w-full">
        {title}
      </h2>
      {description && (
        <div className="mt-15 font-texi">
          <BlockContent blocks={description} />
        </div>
      )}
      <div className="my-20">
        <div className="flex gap-10 font-mono uppercase pb-10 border-b border-smoke text-slate title-small">
          <div className="w-1/2 md:w-[1/3]">Feature Set</div>
          <div className="w-1/4 md:w-1/2">Timeline</div>
          <div className="w-1/4 md:w-1/2 text-right">Cost</div>
        </div>
        <div className="">
          {items.map((item, key) => {
            if (!item) return null
            return (
              <div
                key={key}
                className="flex items-center gap-10 py-10 border-b border-smoke"
              >
                <div className="w-1/2 md:w-[1/3]">
                  <div className="px-10 py-5 rounded-[.5rem] bg-fog w-[fit-content]">
                    {item.feature}
                  </div>
                </div>
                <div className="w-1/4 md:w-1/2">{item.timeline}</div>
                <div className={`w-1/4 md:w-1/2 text-right pr-10${override ? ' text-slate line-through' : ''}`}>
                  {item.cost}k
                </div>
              </div>
            )
          })}
        </div>
        <div className="w-full rounded-[.5rem] bg-fog flex justify-between p-10 mt-10">
          <div>Total</div>
          <div className='flex items-center gap-10'>
            {(summation && override) && <div>{summation}k</div>}
            <div className={summation && override ? ' text-slate line-through' : ''}>
              {highCost > lowCost ? `${lowCost}-${highCost}k` : `${highCost}k`}
            </div>
          </div>
        </div>
      </div>
      {structure && (
        <div className="mt-25">
          <div className="font-mono uppercase title-small text-slate mb-[-.5rem]">
            Proposed Fee Structure
          </div>
          <BlockContent blocks={structure} />
        </div>
      )}
    </section>
  )
}

export default capabilityBlock
