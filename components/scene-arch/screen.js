import React, { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Screen({ src, position, message, title, ...props }) {
  const radian = 0.0174533

  return (
    <mesh
      {...props}
      //   onClick={() => message(title, message)}
      position={position}
      rotation={[0, -90 * radian, 0]}
    >
      <planeGeometry attach="geometry" args={[23.5, 12.5]} />
      <meshBasicMaterial attach="material" toneMapped={false}>
        <videoTexture
          attach="map"
          args={[src.current]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </mesh>
  )
}
