import React, { useRef, useState, useEffect, useMemo } from 'react'
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import Photo from '@components/photo'
import Link from '@components/link'
import BlockContent from '@components/block-content'
import { Marqy } from 'marqy'

const indexList = ({ data = {} }) => {
  const { content, padding, size, display } = data

  const [scrollRef, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={scrollRef} className={`w-full px-10 project-description${display == 'mobile' ? ' md:hidden' : display == 'desktop' ? ' hidden md:block' : ''}`}>
      <m.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full pt-${size == 'large' ? 'large' : 'small'}`}
      >
        <BlockContent blocks={content} />
      </m.div>
    </div>
  )
}

export default indexList
