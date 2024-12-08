import React from 'react'

import AccordionList from '@components/accordion-list'

const TagList = ({ data = {} }) => {
  const { tags } = data

  return (
    <section className="w-full">
      <AccordionList items={tags} />
    </section>
  )
}

export default TagList
