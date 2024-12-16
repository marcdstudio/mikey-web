import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import { getProject, getAllDocSlugs } from '@data'

import Header from '@components/header'
import Layout from '@components/layout'
import Icon from '@components/icon'
import CarouselNav from '@components/carousel-nav'
import NotFoundPage from '@pages/404'

import VideoLoop from '@components/vimeo-loop'
import Photo from '@components/photo'
import BlockContent from '@components/block-content'
import { Module } from '@components/modules'
import Grid from '@components/grid'

const Project = ({ data }) => {
  const { site, page, nextProject } = data

  const { title, subtitle, industries, code, description, contentModules, theme, link } = page

  const [infoOpen, setInfoOpen] = useState(false)

  if (!page) {
    return <NotFoundPage statusCode={404} />
  }

  return (
    <Layout site={site} page={page}>
      <div className="w-full h-full">
        <section className="sheet-trace mb-[calc(-50vh-.6rem)]">
          <Grid />
          <div className='grid-standard relative z-2 pt-[16.667vh]'>
            <div className='col-span-3 pt-36 flex flex-col gap-24'>
              <div className='flex flex-col gap-5'>
                <h1 className='title-xl'>{title}</h1>
                {subtitle && <h2 className='title-md text-ash'>{subtitle}</h2>}
              </div>
              <div className=''>
                <BlockContent className={'line-clamp-3'} blocks={description}/>
              </div>
            </div>
          </div>
        </section>
        {contentModules?.map((module, key) => (
          <section className="sheet-trace">
            <Grid />
            <Module index={key} key={key} module={module} />
          </section>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview, previewData }) {
  const eventData = await getProject(params.slug, {
    active: preview,
    token: previewData?.token,
  })

  return {
    props: {
      data: eventData,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllDocSlugs('project')

  return {
    paths:
      allProjects?.map((project) => {
        return {
          params: {
            slug: project.slug,
          },
        }
      }) || [],
    fallback: false,
  }
}

export default Project
