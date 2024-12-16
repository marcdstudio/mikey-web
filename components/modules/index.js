import React from 'react'
import dynamic from 'next/dynamic'

const BlockText = dynamic(() => import('./blockText'))
const Media2Up = dynamic(() => import('./media2Up'))
const Media3Up = dynamic(() => import('./media3Up'))
const MediaFull = dynamic(() => import('./mediaFull'))
const Details = dynamic(() => import('./details'))

export const Module = ({ module, type }) => {
  const moduleType = module._type

  switch (moduleType) {
    case 'blockText':
      return <BlockText type={type} data={module} />
    case 'media2Up':
      return <Media2Up type={type} data={module} />
    case 'media3Up':
      return <Media3Up type={type} data={module} />
    case 'mediaFull':
      return <MediaFull type={type} data={module} />
    case 'details':
      return <Details type={type} data={module} />
    default:
      return null
  }
}
