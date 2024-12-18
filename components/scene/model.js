import React, { Suspense, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, DotScreen } from '@react-three/postprocessing'
import * as THREE from 'three'

const degToRad = (degrees) => degrees * (Math.PI / 180)

const Model = ({ model }) => {
  const url = model

  if (!url) return

  const { nodes, scene } = useGLTF(url);

  return (
    <group rotation={[0, degToRad(180), 0]}>
      <mesh geometry={nodes.House_Mesh.geometry}>
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

const Mesh = ({ model }) => {
  return (
    <Suspense fallback={null}>
      <group
        rotation={[degToRad(270), degToRad(0), degToRad(0)]}
        scale={0.8}
        dispose={null}
      >
        <Model model={model} />
      </group>
    </Suspense>
  )
}

const Scene = ({ model }) => <Mesh model={model} />

export default Scene
