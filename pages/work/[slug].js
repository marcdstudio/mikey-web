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

const Project = ({ data }) => {
  const { site, page, nextProject } = data

  const {
    modules,
    creditList,
    work,
    title,
    tags,
    description,
    info
  } = page
  const options = {
    loop: false,
    skipSnaps: true,
    axis: 'x',
    align: 'center',
    dragFree: false,
    containScroll: 'trimSnaps',
  }

  const router = useRouter()

  const [lastSlide, setLastSlide] = useState(false)

  const handleNext = () => {
    router.push(`/work/${nextProject?.slug}`) // Replace '/new-page' with your desired route
  }

  const [emblaRef, embla] = useEmblaCarousel(options)

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla])

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

  const onSelect = useCallback(() => {
    setLastSlide(embla.selectedScrollSnap() == modules.length ? true : false)
  }, [embla])

  useEffect(() => {
    if (embla) {
      embla.on('select', onSelect)
      onSelect()
    }
  }, [embla])

  const [infoOpen, setInfoOpen] = useState(false)

  if (!page) {
    return <NotFoundPage statusCode={404} />
  }

  return (
    <Layout site={site} page={page}>
      <div className="w-full bg-project">
        <div className="w-screen h-screen relative overflow-hidden">
          <div className="flex items-center justify-center overflow-hidden">
            <div
              ref={emblaRef}
              className={`carousel--container h-[fit-content] w-full relative cursor-[grab]`}
            >
              <div className="carousel-slides w-full relative flex items-center select-none">
                {modules?.map((module, key) => {
                  if (
                    !(
                      module._type == 'videoFull' || module._type == 'imageFull'
                    )
                  )
                    return null

                  return (
                    <React.Fragment key={key}>
                      <div
                        className={`w-[100%] min-w-[100%] h-screen relative overflow-hidden flex items-center justify-center`}
                      >
                        <div className="w-[calc(100vw-6rem)] md:w-[80vw] h-[calc(70vh-15rem)] lg:h-[calc(100vh-26rem)] xl:h-[calc(100vh-30rem)] 2xl:h-[calc(80vh-30rem)]">
                          {module._type == 'videoFull' ? (
                            <div className="w-full h-full">
                              <VideoLoop
                                className={`relative w-full h-full object-contain`}
                                poster={module.poster}
                                contain={true}
                                id={module.videoHD || module.video}
                              />
                            </div>
                          ) : module._type == 'imageFull' ? (
                            <div className="w-full h-full">
                              <Photo
                                photo={module.image}
                                width={1600}
                                srcSizes={[800, 1000, 1200, 1600]}
                                sizes="100%"
                                layout={'contain'}
                                className={'w-full h-full object-contain'}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {key + 1 == modules.length && nextProject && (
                        <button
                          onClick={() => handleNext()}
                          className="w-[100%] min-w-[100%] h-screen relative flex items-center justify-center"
                        >
                          <div className="flex gap-10">
                            <div className="text-slate">Next Project</div>
                            <div className="">{nextProject.title}</div>
                          </div>
                        </button>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
          <div
            className={`h-full w-full absolute z-2 top-0 left-0 bg-[rgba(255,255,255,.7)] backdrop-blur-[40px] py-80 px-10 flex items-center transition-opacity duration-300${
              infoOpen ? ' opacity-100' : ' opacity-0 pointer-events-none'
            }`}
          >
            <div className="max-w-[35rem]">
              <BlockContent blocks={description} />
              <div className='flex flex-col mt-60 gap-20 md:gap-30'>
                {tags && (
                  <div className="flex flex-col md:flex-row gap-10 md:gap-0">
                    <div className="w-[20rem] uppercase text-slate flex-shrink-0">Services</div>
                    <div className="flex gap-5">
                      {tags?.map((tag, key) => {
                        return (
                          <div key={key} className="btn-service px-10">
                            {tag.title}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {info?.link && (
                  <div className="flex flex-col md:flex-row gap-10 md:gap-0">
                    <div className="w-[20rem] uppercase text-slate flex-shrink-0">Link</div>
                    <a
                      href={info?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-text underline whitespace-nowrap"
                    >
                      {info?.link}
                    </a>
                  </div>
                )}
                {creditList && (
                  <div className="flex flex-col gap-10">
                    {creditList?.map((list, key) => (
                      <div key={key} className={`flex flex-col md:flex-row`}>
                        <div className="w-[20rem] text-slate uppercase flex-shrink-0">
                          {list.title}
                        </div>
                        <div className="flex flex-col">
                          {list.credits.map((credit, key) => (
                            <div key={key} className="">
                              {credit.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 absolute left-10 bottom-10 z-3">
            <div className="btn-nav px-10">{title}</div>
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className="flex items-center justify-center btn-nav px-7"
            >
              <div
                className={`w-[1rem] transition-transform duration-300${
                  infoOpen ? ' rotate-45' : ''
                }`}
              >
                <Icon name="Plus" viewBox="0 0 10 11" />
              </div>
            </button>
          </div>

          <CarouselNav
            scrollProgress={scrollProgress}
            prev={() => scrollPrev()}
            next={lastSlide ? () => handleNext() : () => scrollNext()}
            className={
              'w-full max-w-[20rem] ml-auto px-5 flex items-center gap-5 absolute right-10 bottom-15'
            }
          />
        </div>
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
