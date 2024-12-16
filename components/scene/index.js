import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import Screen from '@components/scene/screen'
import Camera from '@components/scene/camera'
import { EffectComposer, DotScreen } from '@react-three/postprocessing'
import * as THREE from 'three'

const Scene = ({ hero, muted, viewReel }) => {
  const videoRef = useRef()

  // supress warning from @react-three/spring until they release a fix
  console.warn = () => {}

  return (
    <div className={`w-full h-full bg-white`}>
      <div className={`absolute left-0 top-0 w-screen h-hero md:h-screen`}>
        <video
          className={`w-[.1rem] object-cover opacity-0`}
          crossOrigin="Anonymous"
          ref={videoRef}
          autoPlay
          playsInline
          loop
          muted={muted}
          src={hero}
        />
      </div>
      <Canvas
        // onClick={() => setViewReel(!viewReel)}
        shadows={true}
        className="w-screen h-screen"
      >
        <OrbitControls />

        {/* <Camera viewReel={viewReel} /> */}
        <Suspense fallback={null}>
          {/* <Environment
            intensity={1}
            files="/models/studio_1k_bw.hdr"
            background={false}
            blur={1}
          /> */}
          <Screen src={videoRef} viewReel={viewReel} />
        </Suspense>
        <ambientLight intensity={.5} />
        <spotLight intensity={200} position={[0, 14, 0]} />


        <EffectComposer autoClear={false}>
          <DotScreen angle={1} scale={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default Scene
