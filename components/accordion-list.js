import React, { useState } from 'react'

import Accordion from '@components/accordion'
import Media from '@components/media'
import BlockContent from '@components/block-content'

const AccordionList = ({ items }) => {
  const [activeAccordion, setActiveAccordion] = useState(null)

  const onToggle = (id, status) => {
    setActiveAccordion(status ? id : null)
  }

  return (
    <div className="accordion-group">
      {items.map((accordion, key) => {
        return (
          <Accordion
            key={key}
            id={accordion._key}
            isOpen={accordion._key === activeAccordion}
            onToggle={onToggle}
            title={accordion.title}
            content={accordion}
          >
            <div className="col-span-1 flex">
              <div className="w-full h-full relative min-h-[16rem]">
                <Media
                  className={`w-full h-full object-cover`}
                  width={1200}
                  layout={'fill'}
                  media={accordion?.media?.content}
                  controls={true}
                />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-12 col-span-5">
              <div className='max-w-[55rem] line-clamp-4'>
                <BlockContent blocks={accordion.content} />
              </div>
            </div>
          </Accordion>
        )
      })}
    </div>
  )
}

export default AccordionList
