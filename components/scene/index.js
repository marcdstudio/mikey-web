import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import Model from '@components/scene/model'
import Camera from '@components/scene/camera'
import { EffectComposer, DotScreen } from '@react-three/postprocessing'
import * as THREE from 'three'

const Scene = ({ model }) => {    

  return (
    <div className={`w-full h-full`}>
      <Canvas
        // onClick={() => setViewReel(!viewReel)}
        shadows={true}
        className="w-screen h-screen"
      >
        <OrbitControls enableZoom={false} />

        <Camera />
        <Suspense fallback={null}>
          {/* <Environment
            intensity={1}
            files="/models/studio_1k_bw.hdr"
            background={false}
            blur={1}
          /> */}
          <Model model={model?.asset?.url} />
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
