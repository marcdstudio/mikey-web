import React, { useEffect, useRef, useState, useCallback } from 'react'

import { getProject, getAllDocSlugs } from '@data'
import NextLink from 'next/link'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import FocusTrap from 'focus-trap-react'
import { AnimatePresence, m } from 'framer-motion'

import cx from 'classnames'

import Layout from '@components/layout'
import NotFoundPage from '@pages/404'

import Media from '@components/media'
import BlockContent from '@components/block-content'
import { Module } from '@components/modules'
import Grid from '@components/grid'

import { useWindowSize } from '@lib/helpers'

const Project = ({ data }) => {
  const { site, page, nextProject } = data

  const {
    title,
    subtitle,
    category,
    year,
    location,
    description,
    contentModules,
    credits,
    thumbnail,
    related,
  } = page

  const { width } = useWindowSize()

  const [activeSection, setActiveSection] = useState(4)
  const [infoOpen, setInfoOpen] = useState(false)

  const drawerRef = useRef()

  if (!page) {
    return <NotFoundPage statusCode={404} />
  }

  console.log('credits', credits)

  const handleScroll = (key) => {
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: `[data-section="${key}"]`,
      },
      ease: 'expo.out',
    })
  }

  const [isClamped, setIsClamped] = useState(true)
  const descriptionRef = useRef()

  useEffect(() => {
    if (descriptionRef?.current?.offsetHeight > 48) {
      setIsClamped(true)
    } else {
      setIsClamped(false)
    }
  }, [width])

  return (
    <Layout site={site} page={page}>
      <div className="w-full h-full">
        <section className="sheet-trace mb-[calc(-50vh-.6rem)]">
          <Grid />
          <div className="grid-standard relative z-2 pt-[16.667vh]">
            <div className="col-span-3 flex flex-col gap-12">
              <div className="flex flex-col gap-5 h-[16.667vh] pb-12 justify-end relative">
                {category && (
                  <div className="absolute -left-18 -top-6 flex gap-10 items-center group cursor-pointer">
                    <div
                      style={{ background: category?.color?.hex }}
                      className={`w-[1.2rem] h-[1.2rem]`}
                    ></div>
                    <div className="leading-90 text-12 text-ash opacity-0 group-hover:opacity-100">
                      {category?.title}
                    </div>
                  </div>
                )}
                <h1 className="title-xl">{title}</h1>
                {subtitle && <h2 className="title-md text-ash">{subtitle}</h2>}
              </div>
              <div ref={descriptionRef} className="relative">
                <BlockContent className={'line-clamp-3'} blocks={description} />
                {isClamped && (
                  <button
                    onClick={() => setInfoOpen(true)}
                    className="flex items-center text-ash gap-6 mt-6"
                  >
                    <span>More Info</span>
                    <span className="block">+</span>
                  </button>
                )}
              </div>
            </div>
            <div className="col-span-3">
              <div className="h-[16.667vh] pb-12 flex items-end justify-end text-ash gap-10">
                <div className="">{year}</div>
                {location && <div className="">{location?.title}</div>}
                {credits && (
                  <button
                    className="btn-text underline"
                    onClick={() => setInfoOpen(true)}
                  >
                    Collaborators+
                  </button>
                )}
              </div>
              {contentModules && (
                <div className="flex gap-12 flex-wrap justify-end pt-12">
                  {contentModules?.map((module, key) => {
                    const thumb =
                      module._type == 'mediaFull'
                        ? module.media?.content
                        : module._type == 'media2Up'
                        ? module.content[0]?.content
                        : module._type == 'carousel'
                        ? module.media[0]?.content
                        : null

                    return key < 12 && thumb ? (
                      <button
                        onClick={() => handleScroll(key)}
                        key={key}
                        className={`w-[calc(8vw-1.2rem)] h-[calc(8vh-1.8rem)]${module.drawing ? ' is-drawing' : ''}`}
                      >
                        <Media
                          className={'w-full h-full object-contain'}
                          width={2400}
                          layout={'contain'}
                          media={thumb}
                          controls={true}
                        />
                      </button>
                    ) : null
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
        {thumbnail && (
          <section className="sheet-trace">
            <Grid />
            <div className="w-full h-full p-24">
              <Media
                className={'w-full h-full object-cover'}
                width={2400}
                layout={'fill'}
                media={thumbnail?.content}
                controls={true}
              />
            </div>
          </section>
        )}
        {contentModules?.map((module, key) => (
          <section data-section={key} key={key} className="sheet-trace">
            <Grid />
            <Module index={key} key={key} module={module} />
          </section>
        ))}
        <section className="sheet-trace">
          <Grid />
          <div className="grid-standard h-full">
            {related?.map((project, key) => {
              return (
                <NextLink
                  href={`/work/${project.slug}`}
                  key={key}
                  className="col-span-2 h-full flex items-center"
                >
                  <div className="w-full h-[33.33333vh] py-12 relative">
                    {project?.title && (
                      <div className="absolute left-0 top-0 py-12 -translate-y-full text-ash">
                        {project.title}
                      </div>
                    )}
                    <div className="w-full h-full relative">
                      <Media
                        className={
                          'w-full h-full object-cover absolute left-0 top-0'
                        }
                        width={1400}
                        layout={'fill'}
                        media={project.thumbnail?.content}
                        controls={true}
                      />
                    </div>
                  </div>
                </NextLink>
              )
            })}
          </div>
        </section>
      </div>
      <FocusTrap
        active={infoOpen}
        focusTrapOptions={{
          fallbackFocus: () => drawerRef.current,
          allowOutsideClick: true,
        }}
      >
        <m.div
          ref={drawerRef}
          key="drawer"
          initial="hide"
          animate={infoOpen ? 'show' : 'hide'}
          variants={{
            show: {
              y: '0%',
            },
            hide: {
              y: '100%',
            },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cx('info fixed top-0 left-0 w-screen h-screen z-[91]')}
        >
          <div className={`sheet-trace grid-standard`}>
            <button
              onClick={() => setInfoOpen(false)}
              className="absolute z-3 right-24 top-[calc(33.3333vh-3rem)] flex items-center gap-6"
            >
              <span>Close</span>
              <span className="block rotate-45">+</span>
            </button>
            <Grid />
            <div className="relative z-3 col-span-3">
              <div className="flex flex-col gap-36 pt-[calc(33.3333vh-3.6rem)]">
                <div className="max-w-[60rem] flex flex-col gap-24">
                  <h2 className="title-xs">Description</h2>
                  <BlockContent blocks={description} />
                </div>
                {credits && (
                  <div className="flex flex-col gap-24">
                    <h2 className="title-xs">Collaborators</h2>
                    <div className="flex flex-col gap-6">
                      {credits?.map((credit, key) => (
                        <a
                          href={credit.profile?.link}
                          key={key}
                          className={`flex flex-col md:flex-row`}
                        >
                          <div key={key} className="">
                            {credit.profile?.title}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="max-w-[60rem] flex flex-col gap-24">
                  <h2 className="title-xs">Details</h2>
                  <div className="flex gap-12">
                    <div className="">{year}</div>
                    {location && <div className="">{location?.title}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </FocusTrap>
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
