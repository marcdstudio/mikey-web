import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import AccordionList from '@components/accordion-list'

const Drawers = ({ data = {} }) => {
  const { drawers } = data

  return (
    <div className={`w-full h-full flex items-end overflow-auto relative z-2`}>
      <div className="w-full">
        <AccordionList items={drawers} />
      </div>
    </div>
  )
}

export default Drawers
