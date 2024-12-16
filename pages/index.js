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
import Scene from '@components/scene'

import { filterItems } from '@lib/filters'

import { useWindowSize } from '@lib/helpers'

import { useSiteContext } from '@lib/context'

const Home = ({ data }) => {
  const { site, page } = data

  const { work } = page

  const router = useRouter()

  if (!page) {
    return (
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    )
  }

  return (
    <Layout site={site} page={page}>
      <div className="work h-screen w-screen">
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
