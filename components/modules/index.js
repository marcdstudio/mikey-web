import React from 'react'
import dynamic from 'next/dynamic'

const BlockText = dynamic(() => import('./blockText'))
const Media2Up = dynamic(() => import('./media2Up'))
const Media3Up = dynamic(() => import('./media3Up'))
const MediaFull = dynamic(() => import('./mediaFull'))
const MediaText2Up = dynamic(() => import('./mediaText2Up'))
const MediaText3Up = dynamic(() => import('./mediaText3Up'))
const MediaText = dynamic(() => import('./mediaText'))
const Carousel = dynamic(() => import('./carousel'))
const Model = dynamic(() => import('./model'))
const FeaturedProject = dynamic(() => import('./featuredProject'))
const FeaturedProject3Up = dynamic(() => import('./featuredProject3Up'))
const Drawers = dynamic(() => import('./drawers'))
const Categories = dynamic(() => import('./categories'))
const Link3Up = dynamic(() => import('./link3Up'))
const Hero = dynamic(() => import('./hero'))

export const Module = ({ module, type, index }) => {
  const moduleType = module._type

  switch (moduleType) {
    case 'blockText':
      return <BlockText index={index} type={type} data={module} />
    case 'media2Up':
      return <Media2Up index={index} type={type} data={module} />
    case 'media3Up':
      return <Media3Up index={index} type={type} data={module} />
    case 'mediaFull':
      return <MediaFull index={index} type={type} data={module} />
    case 'mediaText2Up':
      return <MediaText2Up index={index} type={type} data={module} />
    case 'mediaText3Up':
      return <MediaText3Up index={index} type={type} data={module} />
    case 'mediaText':
      return <MediaText index={index} type={type} data={module} />
    case 'carousel':
      return <Carousel index={index} type={type} data={module} />
    case 'model':
      return <Model index={index} type={type} data={module} />
    case 'featuredProject':
      return <FeaturedProject index={index} type={type} data={module} />
    case 'featuredProject3Up':
      return <FeaturedProject3Up index={index} type={type} data={module} />
    case 'drawers':
      return <Drawers index={index} type={type} data={module} />
    case 'categories':
      return <Categories index={index} type={type} data={module} />
    case 'link3Up':
      return <Link3Up index={index} type={type} data={module} />
    case 'hero':
      return <Hero index={index} type={type} data={module} />
    default:
      return null
  }
}
