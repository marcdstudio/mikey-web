import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useIntersection } from 'use-intersection'

import Photo from '@components/photo'
import Link from '@components/link'
import BlockContent from '@components/block-content'
import { Marqy } from 'marqy'

const indexList = ({ data = {} }) => {
  const { content, padding } = data

  const marqueeRef = useRef()
  const isIntersecting = useIntersection(marqueeRef, {
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="w-full p-10">
      <div className='w-full'>
        <BlockContent blocks={content} />
      </div>
    </section>
  )
}

export default indexList
