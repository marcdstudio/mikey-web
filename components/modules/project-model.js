import React, { useRef } from 'react'
import { useIntersection } from 'use-intersection'
import { Marqy } from 'marqy'

import Photo from '@components/photo'
import Scene from '@components/scene'


const Marquee = ({ data = {} }) => {
  const { items, speed, reverse, pausable } = data

  if (!items?.length) return null

  const marqueeRef = useRef()
  const isIntersecting = useIntersection(marqueeRef, {
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={marqueeRef} className="relative">
      <div className="marquee-section relative w-full">
        <Scene />
      </div>
    </section>
  )
}

export default Marquee
