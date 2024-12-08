import React from 'react'

import VideoLoop from '@components/vimeo-loop'

const VideoFull = ({ data = {}, isProject, isModal }) => {
  const { video, caption, aspectRatio, poster } = data

  return (
    <div className={`w-full video-full max-w-[120rem] mx-auto`}>
      <div
        className={`w-full${isModal ? ' h-full' : isProject ? ' absolute top-0 left-0 w-full h-full' : ''}`}
      >
        <VideoLoop
          className={
            `relative shadow-thumb overflow-hidden w-full${isModal && caption ? ' h-[calc(100%-3rem)]' : isModal ? ' h-full' : ''}`
          }
          poster={poster}
          contain={true}
          id={video}
        />
        {caption && isModal && (
          <div className="w-full project-caption">
            <div className="w-full project-caption--inner">{caption}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoFull
