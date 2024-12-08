import React from 'react'
import dynamic from 'next/dynamic'

const GeneralText = dynamic(() => import('./generalText'))
const ImageFull = dynamic(() => import('./imageFull'))
const VideoFull = dynamic(() => import('./videoFull'))
const TagList = dynamic(() => import('./tagList'))
const IndexList = dynamic(() => import('./indexList'))
const TextBlock = dynamic(() => import('./textBlock'))
const Description = dynamic(() => import('./description'))
const CapabilityBlock = dynamic(() => import('./capabilityBlock'))
const CapabilityDrawer = dynamic(() => import('./capabilityDrawer'))
const CapabilityFees = dynamic(() => import('./capabilityFees'))
const CapabilityDeliverables = dynamic(() => import('./capabilityDeliverables'))

export const Module = ({ module, isProject, isModal }) => {
  const type = module._type

  switch (type) {
    case 'generalText':
      return <GeneralText isModal={isModal} data={module} />
    case 'imageFull':
      return <ImageFull isModal={isModal} isProject={isProject} data={module} />
    case 'videoFull':
      return <VideoFull isModal={isModal} isProject={isProject} data={module} />
    case 'tagList':
      return <TagList data={module} />
    case 'indexList':
      return <IndexList data={module} />
    case 'textBlock':
      return <TextBlock data={module} />
    case 'description':
      return <Description data={module} />
    case 'capabilityBlock':
      return <CapabilityBlock data={module} />
    case 'capabilityDrawer':
      return <CapabilityDrawer data={module} />
    case 'capabilityFees':
      return <CapabilityFees data={module} />
    case 'capabilityDeliverables':
      return <CapabilityDeliverables data={module} />
    default:
      return null
  }
}
