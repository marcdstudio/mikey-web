import React, { useState, useEffect } from 'react'
import { useWindowSize } from '@lib/helpers'

import Media from '@components/media'
import Scene from '@components/scene'

const MediaFull = ({ data = {} }) => {
  const { model, caption } = data

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div className={`relative w-full h-full`}>
        <Scene key="scene" model={model} />
      </div>
      {caption && (
        <div className={`absolute bottom-36 left-24 media--caption`}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default MediaFull
