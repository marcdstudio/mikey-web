import React, { useEffect, useRef, useState } from 'react'

import Icon from '@components/icon'

const GridCross = ({ index, type }) => {
  return (
    <div className="grid-cross">
      <div className="grid-cross-span">
        <div className="grid-cross--icon"></div>
      </div>
      <div className={`grid-cross-span${type == 'work' ? ' hidden' : ''}`}>
        <div className="grid-cross--icon"></div>
      </div>
      <div className="grid-cross-span">
        <div className="grid-cross--icon"></div>
      </div>
      <div className={`grid-cross-span${type == 'work' ? ' hidden' : ''}`}>
        <div className="grid-cross--icon"></div>
      </div>
      <div className={`grid-cross-span`}>
        <div className="grid-cross--icon"></div>
      </div>
      <div className={`grid-cross-span${type == 'work' ? ' hidden' : ''}`}>
        <div className="grid-cross--icon"></div>
      </div>
      <div className={`grid-cross-span`}>
        <div className="grid-cross--icon"></div>
      </div>
      {index != 5 && <div className="grid-line--horizontal"></div>}
      {index == 0 && <div className="grid-line--horizontal is-top"></div>}
    </div>
  )
}

export default GridCross
