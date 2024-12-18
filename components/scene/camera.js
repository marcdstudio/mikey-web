import React, { useState, useEffect, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { isBrowser, useWindowSize } from '@lib/helpers'
import { gsap } from 'gsap'

const Camera = ({ viewReel }) => {
  const { height: windowHeight, width } = useWindowSize()
  const cameraRef = useRef()
  const [cameraZ, setCameraZ] = useState(3)

  useEffect(() => {
    setCameraZ(width > 950 ? 20 : 170)
  }, [width])

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={[10, 10, cameraZ]}
      fov={18}
      near={0.1}
      far={1000}
      dpr={[1, 1]}
      makeDefault
    />
  )
}

export default Camera
