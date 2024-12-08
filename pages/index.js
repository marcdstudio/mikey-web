import React, { useEffect, useRef, useState, useCallback } from 'react'
import Error from 'next/error'
import NextLink from 'next/link'

import { AnimatePresence, m } from 'framer-motion'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import { getStaticPage, queries } from '@data'

import { useInView } from 'react-intersection-observer'

import { useRouter } from 'next/router'

import Layout from '@components/layout'
import Photo from '@components/photo'
import VideoLoop from '@components/vimeo-loop'

import Header from '@components/header'
import Icon from '@components/icon'
import Scene from '@components/scene'
import Tagline from '@components/tagline'
import IndexList from '@components/modules/indexList'

import CarouselNav from '@components/carousel-nav'

import { filterItems, FilterOption } from '@lib/filters'

import { useWindowSize } from '@lib/helpers'
import ToolTip from '@components/tooltip'

import { useSiteContext, useSceneLoaded } from '@lib/context'

const variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

const Home = ({ data }) => {
  const { site, page } = data

  const { work, directory, reel } = page

  const router = useRouter()

  const { width, height } = useWindowSize()
  const [position, setPosition] = useState(0)
  const [visible, setVisible] = useState(true)
  const [blockHeight, setBlockHeight] = useState(80)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [scrollScale, setScrollScale] = useState(0)

  //setup tags
  //setup filters
  const tags = []

  work?.projects?.forEach((project) => {
    project.tags?.forEach((tag) => {
      if (tag && !tags.find((t) => t.slug == tag.slug)) {
        tags.push({
          title: tag.title,
          slug: tag.slug,
        })
      }
    })
  })

  const filteredItems = filterItems(work?.projects, tags, 100)

  const blurRef = useRef()
  const headerRef = useRef()

  useEffect(() => {
    document.body.style.setProperty(
      '--headerHeight',
      `${headerRef?.current?.offsetHeight}px`
    )
  }, [width])

  useEffect(() => {
    let scrollContainer = document.querySelector('.work')
    const handleScroll = () => {
      let moving = scrollContainer.scrollTop

      if (position > moving || moving < 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      setPosition(moving)
      setScrollPercentage((moving / (width * 42)) * 10000)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const newBlockHeight = 80 + (scrollPercentage * 20) / 100
    setBlockHeight(newBlockHeight)

    //update scrollScale here
    const startScale = 1
    const endScale = 0.8
    const newScrollScale =
      startScale + (endScale - startScale) * (scrollPercentage / 100)
    setScrollScale(newScrollScale)
  }, [scrollPercentage])

  if (!page) {
    return (
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    )
  }

  //setup carousel
  const [triggerRef, triggerInView] = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  const options = {
    loop: false,
    skipSnaps: true,
    axis: 'x',
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  }

  const [target, setTarget] = useState(undefined)
  const scrollRef = useRef()

  const [emblaRef, embla] = useEmblaCarousel(options, [
    WheelGesturesPlugin({
      forceWheelAxis: 'x',
      target,
    }),
  ])

  useEffect(() => {
    if (embla) {
      embla.reInit({ ...options, dragFree: width > 950 })
    }
  }, [embla])

  useEffect(() => {
    setTarget(scrollRef.current)
  }, [target])

  useEffect(() => {
    if (triggerInView) {
      embla.reInit()
    }
  }, [target, triggerInView])

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla])
  const scrollTo = useCallback((index) => embla?.scrollTo(index), [embla])

  //handle progress
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    if (!embla) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress)
  }, [embla])

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll)
      handleScroll() // Initial call to set the progress bar
    }
  }, [embla, handleScroll])

  const [tagCount, setTagCount] = useState({})

  useEffect(() => {
    // Initialize a count object
    const counter = tags.reduce((acc, tag) => {
      acc[tag.title] = 0
      return acc
    }, {})

    // Count the projects for each tag
    work?.projects.forEach((project) => {
      project.tags.forEach((projectTag) => {
        if (counter.hasOwnProperty(projectTag.title)) {
          counter[projectTag.title]++
        }
      })
    })

    setTagCount(counter)
  }, [])

  const [activeToggle, setActiveToggle] = useState('image')

  const [isFiltered, setIsFiltered] = useState()

  useEffect(() => {
    setIsFiltered(router?.query?.tag)
  }, [router])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (width > 950) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [width])

  const handleSlide = (slug) => {
    router.push(`/work/${slug}`)
  }

  useEffect(() => {
    if (activeToggle == 'index') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [activeToggle])

  const { sceneLoaded } = useSiteContext()

  // handle scene interactions
  const [toolText, setToolText] = useState('View Reel')
  const [viewReel, setViewReel] = useState(false)
  const [audioToggled, setAudioToggled] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!audioToggled) {
      setMuted(!viewReel)
    }

    setToolText(viewReel ? 'Close Reel' : 'View Reel')
  }, [viewReel])

  return (
    <Layout site={site} page={page}>
      <div className="work h-screen w-screen">
        <Scene
          viewReel={viewReel}
          muted={muted}
          background={work?.featuredBackground}
          hero={work?.reel}
        />
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "home"][0]{
      'id': _id,
      title,
      seo,
      'work': *[_type == "selectedWork"][0]{
        reel,
        'featuredBackground': projects[0]->info.thumbBackground.image.asset->url,
        projects[]->{
          title,
          'slug': slug.current,
          'tags': info.tags[]->{title, 'slug':slug.current},
          info{
            link,
            thumbVideo,
            thumbBackground{${queries.assetMeta}},
            'poster':thumbPlaceholder.image.asset->url,
          },
        }
      },
      'directory': *[_type == "directory"][0]{
        indexItems[]{
          inProgress,
          hidden,
          clientName,
          year,
          tags,
          description,
          categories[]->{...},
          tags[]->{...},
        }
      } 
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  )

  return {
    props: {
      data: pageData,
    },
  }
}

export default Home
