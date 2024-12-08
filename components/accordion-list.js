import React, { useState } from 'react'

import Accordion from '@components/accordion'
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
            id={accordion.title}
            isOpen={accordion.title === activeAccordion}
            onToggle={onToggle}
            title={accordion.title}
          >
            <BlockContent blocks={accordion.content} />
          </Accordion>
        )
      })}
    </div>
  )
}

export default AccordionList
