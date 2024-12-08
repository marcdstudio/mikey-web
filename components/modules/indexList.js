import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useIntersection } from 'use-intersection'

import { AnimatePresence, m } from 'framer-motion'

import BlockContent from '@components/block-content'
import { Marqy } from 'marqy'

const indexList = ({ data = {} }) => {
  const { directory } = data

  const marqueeRef = useRef()
  const isIntersecting = useIntersection(marqueeRef, {
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isHovering, setIsHovering] = useState(false)

  const randomNames = [
    'xy7dor97',
    'udnsow98',
    'dhna0eij23',
    'd8jd0ekn2hd0',
    'dhufi4',
    'qpeoodw3',
    'xy8j390d',
    'Lj83ki0Ynk',
    '034i&r2',
    '90ej76K3l9H6',
    'uok&loe47',
    'i4o05j2y',
  ]

  return (
    <section className="w-full p-10 directory min-h-[100vh]">
      <div className="flex justify-between text-9 uppercase text-smoke">
        <div className="w-200">Client</div>
        <div className="flex-grow">Categories</div>
        <div className="w-40 text-right">Year</div>
      </div>
      <AnimatePresence mode="wait">
        <div className='flex flex-col gap-5 w-full mt-10 pb-10'>
          {directory.indexItems?.map((project, key) => {
            if (project.hidden) return null
            return (
              <m.div
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.02 * key,
                }}
                key={key}
                className="w-full flex justify-between"
              >
                {project.inProgress && (
                  <div className="w-200 flex-shrink-0 blur-sm">
                    {randomNames[key]}
                  </div>
                )}
                {!project.inProgress && (
                  <div className="w-200 flex-shrink-0">
                    {project.clientName}
                  </div>
                )}
                <div
                  className="flex-grow text-left relative overflow-hidden cursor-pointer"
                  onMouseEnter={() => setIsHovering(key)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className='w-full max-w-[60rem] overflow-hidden'>
                    {isHovering !== key && (
                      <>
                        {project.categories?.map((category, key) => (
                          <span key={key}>
                            {category.title}
                            {key + 1 != project.categories.length ? ', ' : ''}
                          </span>
                        ))}
                      </>
                    )}
                    {isHovering === key && (
                      <Marqy
                        speed={0.5}
                        direction={'left'}
                        pauseOnHover={false}
                        className="marquee w-full max-w-[60rem] absolute left-0 top-0 z-2"
                      >
                        <div className="marquee--item">
                          <span className="marquee--text">
                            <BlockContent blocks={project.description} />
                          </span>
                        </div>
                      </Marqy>
                    )}
                  </div>
                </div>
                <div
                  className={`w-45 flex-shrink-0 text-right${
                    project.inProgress ? ' italic text-slate' : ''
                  }`}
                >
                  {project.inProgress ? 'WIP' : project.year}
                </div>
              </m.div>
            )
          })}
        </div>
      </AnimatePresence>
    </section>
  )
}

export default indexList
