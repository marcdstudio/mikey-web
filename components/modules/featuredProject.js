import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Media from '@components/media'
import BlockContent from '@components/block-content'

const FeaturedProject = ({ data = {}, index }) => {
  const { project } = data

  if (!project) return null

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div className={`relative w-[calc(100vw-3rem)] md:w-[80%] h-[66%]`}>
        <Media
          className={`w-full h-full object-contain`}
          width={2400}
          layout={'contain'}
          media={project?.thumbnail?.content}
          controls={true}
        />
      </div>
      <div className="w-full flex justify-between items-end absolute left-0 bottom-0 pl-12 md:pl-24 pb-24 pr-12">
        <div className="w-full md:w-1/2 flex gap-24 items-end justify-between md:justify-start">
          <div
            style={{ background: project?.category?.color?.hex }}
            className={`absolute z-2 left-6 bottom-0 w-[1.2rem] h-[1.2rem]`}
          ></div>
          <div className="pb-3 text-ash w-[2.4rem] whitespace-nowrap">
            {index < 10 ? `0${index + 1}` : `${index + 1}`}
          </div>
          <h2 className="title-md">{project.title}</h2>
        </div>
        <div className="w-1/2 hidden md:flex justify-end">
          {project.description && (
            <div className={`line-clamp-1 max-w-[55rem]`}>
              <BlockContent blocks={project.description} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProject
