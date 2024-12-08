import React, { useState, useEffect, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { isBrowser, useWindowSize } from '@lib/helpers'
import { gsap } from 'gsap'

const Camera = ({ viewReel }) => {
  const { height: windowHeight, width } = useWindowSize()
  const cameraRef = useRef()
  const [cameraZ, setCameraZ] = useState(3)

  useEffect(() => {
    setCameraZ(width > 950 ? 100 : 170)
  }, [width])

  useEffect(() => {
    if (cameraRef.current) {
      const targetZ = viewReel ? (width > 950 ? 50 : 90) : (width > 950 ? 100 : 170)
      gsap.to(cameraRef.current.position, {
        z: targetZ,
        duration: 1.5, // Adjust duration as needed
        ease: 'power3.inOut',
        onUpdate: () => setCameraZ(cameraRef.current.position.z)
      })
    }
  }, [viewReel, width])

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={[0, 0, cameraZ]}
      fov={24}
      near={0.1}
      far={1000}
      dpr={[1, 1]}
      makeDefault
    />
  )
}

export default Camera
