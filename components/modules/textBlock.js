import React, { useState } from 'react'
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import BlockContent from '@components/block-content'

const Video = ({ data = {} }) => {
  const { content } = data

  const [scrollRef, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={scrollRef} className="section w-full flex justify-center px-15 md:px-20">
      <m.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: inView ? 0 : 30, opacity: inView ? 1 : 0 }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="max-w-[60rem] mx-auto"
      >
        <BlockContent className="w-full text-center" blocks={content} />
      </m.div>
    </div>
  )
}

export default Video
