import React, { useRef, useState, useEffect, useMemo } from 'react'

import AccordionList from '@components/accordion-list'

const capabilityBlock = ({ data = {} }) => {
  const { drawers, title } = data

  return (
    <section className="w-full">
      <h2 className="w-full">
        {title}
      </h2>
      <section className="w-full mt-10">
        <AccordionList items={drawers} />
      </section>
    </section>
  )
}

export default capabilityBlock
