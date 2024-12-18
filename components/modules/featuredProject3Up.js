import React, { useState, useEffect } from 'react'

import NextLink from 'next/link'

import Media from '@components/media'

const FeaturedProject3Up = ({ data = {}, index }) => {
  const { projects, title } = data

  if (!projects) return null

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      {title && <div className="grid-standard absolute top-0 left-0 h-[16.66667vh] flex items-end p-12">
        <h2 className='title-md'>{title}</h2>
      </div>}
      <div className="grid-standard h-full w-full">
        {projects?.map((project, key) => {
          return (
            <NextLink href={`/work/${project?.slug}`} key={key} className="col-span-2 h-full flex items-center">
              <div className="w-full h-[33.33333vh] py-12 relative">
                {project?.title && (
                  <div className="absolute left-0 top-0 py-12 -translate-y-full text-ash">
                    {project.title}
                  </div>
                )}
                <div className="w-full h-full relative">
                  <Media
                    className={
                      'w-full h-full object-cover absolute left-0 top-0'
                    }
                    width={1400}
                    layout={'fill'}
                    media={project.thumbnail?.content}
                    controls={true}
                  />
                </div>
              </div>
            </NextLink>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturedProject3Up
