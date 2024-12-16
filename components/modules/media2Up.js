import React from 'react'

import Media from '@components/media'
import Carousel from '@components/carousel'
import BlockContent from '@components/block-content'

const Media2Up = ({ data = {} }) => {
  const { content, caption, padding, displayRatio, bleed } = data

  return (
    <div className={`w-full mt-64 mb-96`}>
      <div className="md:hidden">
        <Carousel slides={content} />
      </div>
      <div className={`hidden md:grid grid-cols-12 gap-32 px-16 md:px-32`}>
        {content?.map((media, key) => {
          return (
            <div
              key={key}
              className={`w-full relative${
                media.width == 'narrow'
                  ? ' col-span-4'
                  : media.width == 'wide'
                  ? ' col-span-8'
                  : ' col-span-6'
              }${
                key == 1 && media.width == 'narrow'
                  ? ' md:col-start-9'
                  : key == 1 && media.width == 'normal'
                  ? ' md:col-start-7' : ''
              }`}
            >
              {(content[0]?.title || content[1]?.title) && (
                <div>
                  {media.title ? (
                    <div className="tag w-[fit-content] mb-8">
                      {media.title}
                    </div>
                  ) : (
                    <div className="h-[2.5rem] mb-8"></div>
                  )}
                </div>
              )}
              <div key={key} className={`w-full relative`}>
                <Media
                  layout={'intrinsic'}
                  className={'w-full'}
                  media={media.media.content}
                  controls={true}
                />
              </div>
              {media.caption && (
                <div
                  className={
                    'font-mono text-12 text-slate leading-130 uppercase mt-32'
                  }
                >
                  <BlockContent blocks={media.caption} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      {caption && <div className={`mt-10 text-smoke md:px-10`}>{caption}</div>}
    </div>
  )
}

export default Media2Up
