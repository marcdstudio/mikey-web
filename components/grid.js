import React, { useEffect, useRef, useState } from 'react'

import GridCross from '@components/grid-cross'

const Grid = () => {
  return (
    <div className="texture-grid">
      <div className="texture-paper"></div>

      {/* x axis */}
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="grid-line--vertical"></div>
      <div className="absolute left-0 top-0 w-full h-full flex-col justify-between grid grid-cols-1 grid-rows-6">
        <GridCross index={0} />
        <GridCross index={1} />
        <GridCross index={2} />
        <GridCross index={3} />
        <GridCross index={4} />
        <GridCross index={5} />
        <GridCross index={6} />
      </div>
    </div>
  )
}

export default Grid
