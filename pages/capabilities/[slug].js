import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import { useInView } from 'react-intersection-observer'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import { getCapability, getAllDocSlugs } from '@data'

import NotFoundPage from '@pages/404'

import Photo from '@components/photo'
import VideoLoop from '@components/vimeo-loop'
import Icon from '@components/icon'
import Layout from '@components/layout'
import BlockContent from '@components/block-content'
import CarouselNav from '@components/carousel-nav'
import { Module } from '@components/modules'

const Capability = ({ data }) => {
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />
  }

  const { site, page } = data

  const {
    _updatedAt,
    _createdAt,
    title,
    slug,
    client,
    password,
    date,
    projectIndex,
    projects,
    general,
    modules,
    type,
    size,
  } = page

  //setup states
  const [activeProject, setActiveProject] = useState(null)
  const [passwordError, setPasswordError] = useState(false)

  //Setup Password
  const [showPassword, setShowPassword] = useState(
    password || localStorage.getItem(`pass-${slug}`) != 'true' ? true : false
  )

  useEffect(() => {
    if (localStorage.getItem(`pass-${slug}`) == 'true') {
      setShowPassword(false)
    }
  }, [])

  //handle updated date
  const [updatedAt, setUpdatedAt] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const convertDate = (date) => {
    let dateString = date
    let dateObject = new Date(dateString)
    // Set timezone to UTC
    dateObject.setMinutes(
      dateObject.getMinutes() + dateObject.getTimezoneOffset()
    )
    let options = { year: 'numeric', month: 'short', day: 'numeric' }

    return dateObject.toLocaleDateString('en-US', options)
  }
  useEffect(() => {
    setUpdatedAt(convertDate(_updatedAt))
    setCreatedAt(convertDate(date || _createdAt))
  }, [])

  //handle password

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()

    const formPassword = data?.entry.trim().toLowerCase()
    const pagePassword = password.trim().toLowerCase()

    if (formPassword == pagePassword) {
      localStorage.setItem(`pass-${slug}`, true)
      setShowPassword(false)
    } else {
      setPasswordError(true)
    }
  }

  const entry = register('entry')

  //handle drawers
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState(null)

  const onToggle = (id, status) => {
    setActiveAccordion(status ? id : null)
  }

  //handle skip button
  const handleSkip = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: `.modules`,
        offsetY: 10,
      },
      ease: 'expo.out',
    })
  }

  // handle studio age
  function calculateYearsSince(dateString) {
    const inputDate = new Date(dateString)
    const currentDate = new Date()
    const timeDifference = currentDate - inputDate
    const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25)
    const roundedYears = Math.floor(yearsDifference)

    return roundedYears
  }

  // Example usage:
  const inputDate = '2018-01-01'
  const studioAge = calculateYearsSince(inputDate)

  //setup carousel
  const [target, setTarget] = useState(undefined)
  const scrollRef = useRef()

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

  const [emblaRef, embla] = useEmblaCarousel(options, [
    WheelGesturesPlugin({
      forceWheelAxis: 'x',
      target,
    }),
  ])

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

  return (
    <>
      {!router.isFallback && (
        <>
          <div className="hidden md:block fixed z-2 top-10 right-10 text-right text-cement max-w-[30rem]">
            <div>Prepared for {client}.</div>
            <div>Last updated on {updatedAt}.</div>
            <div>
              Contact:{' '}
              <a
                href="mailto:jake@marcd.co"
                className="hover:text-black transition-colors duration-300"
              >
                jake@marcd.co
              </a>
              .
            </div>

            {/* <div>The enclosed content is the sole property of Marcd LLC.</div> */}
          </div>
          {showPassword && (
            <div className="p-10 w-screen h-screen flex items-center justify-center">
              <div className="w-full md:max-w-[35rem]">
                <form className="font-mono" onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className={`control flex-grow w-full${
                      errors?.email ? ' has-error' : ''
                    }`}
                  >
                    <label
                      htmlFor={`entry`}
                      className="control--label uppercase hidden"
                    >
                      Password
                    </label>
                    <input
                      id={`entry`}
                      name="entry"
                      type="text"
                      inputMode="entry"
                      autoComplete="off"
                      className={`w-full border-smoke text-center uppercase`}
                      placeholder="Enter Password to View"
                      ref={entry.ref}
                      onFocus={(e) => {
                        e.target.parentNode.classList.add('is-filled')
                      }}
                      onBlur={(e) => {
                        const value = e.target.value
                        entry.onBlur(e)
                        e.target.parentNode.classList.toggle('is-filled', value)
                      }}
                      onChange={(e) => {
                        const value = e.target.value
                        entry.onChange(e)
                        e.target.parentNode.classList.toggle('is-filled', value)
                      }}
                    />

                    {errors?.entry && (
                      <span role="alert" className="control--error">
                        {errors.entry.message}
                      </span>
                    )}
                  </div>
                  <button
                    className="btn-nav w-full mt-10 text-center flex justify-center"
                    type="submit"
                  >
                    <span className="block w-full text-center">Enter</span>
                  </button>
                  {passwordError && (
                    <div className="mt-10 uppercase text-center w-full">
                      Incorrect Password. Please Try Again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          <Layout site={site} page={page}>
            {!showPassword && activeProject == null && (
              <>
                <div className={`capability w-full relative z-2${size == 'normal' ? ' text-[1.2rem]' : ' text-12'}`}>
                  <div className={`px-10 pt-10 max-w-[50rem]`}>
                    <div className="flex gap-10 w-full mb-30 text-slate uppercase text-[1.05rem]">
                      <div>{title}</div>
                      <div>{createdAt}</div>
                    </div>
                    <div className="flex gap-15 flex-col mt-100">
                      <h1 className={`my-0${size == 'normal' ? ' text-[1.05rem]' : ' text-12'}`}>
                        {general.description}
                      </h1>
                      <div className="">
                        Over the past{' '}
                        <span className="bg-acid font-texbi">
                          {studioAge} years
                        </span>
                        , we've launched{' '}
                        <span className="bg-acid font-texbi">
                          {projectIndex?.totalProjects?.length}
                          {type == 'web' ? ' brands' : ' brands'}
                        </span>
                        .
                      </div>
                      <div>
                        <div className="max-w-[52rem]">
                          <BlockContent blocks={general.overview} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSkip()}
                    className="underline mt-15 flex gap-5 transition-colors duration-300 hover:text-slate px-10 text-12"
                  >
                    <span>Skip To Proposal Details</span>
                    <span className="w-[.7rem]">
                      <Icon name="Arrow Down" viewBox="0 0 18 24" />
                    </span>
                  </button>
                  <div className="w-full project-modules mt-100">
                    <h2 className="px-10">Relevant Work</h2>
                    <div className="w-full mt-10 overflow-hidden">
                      <div
                        ref={emblaRef}
                        className={`carousel--container h-[fit-content] w-full relative cursor-[grab] px-10`}
                      >
                        <div className="carousel-slides w-full relative flex items-center select-none">
                          {projects?.map((project, key) => {
                            return (
                              <div
                                key={key}
                                className={`w-[90%] md:w-[37%] min-w-[90%] md:min-w-[37%] relative overflow-hidden px-0${
                                  key + 1 == projects?.length
                                    ? ' mr-0'
                                    : ' mr-10'
                                }`}
                              >
                                <div className="w-full relative rounded-[.5rem] overflow-hidden pb-[120%]">
                                  <Photo
                                    width={1600}
                                    srcSizes={[600, 800, 1200, 1600]}
                                    sizes="100%"
                                    layout="fill"
                                    photo={project.info.thumbBackground}
                                    className="w-full h-full object-cover top-0 left-0 absolute p-15"
                                  />
                                  <div className="w-full h-full p-10 absolute z-2">
                                    <div className="w-full h-full relative rounded-[.5rem] overflow-hidden">
                                      <VideoLoop
                                        className={
                                          'w-full z-2 left-1/2 -translate-x-1/2 bottom-0 absolute overflow-hidden rounded-[.5rem]'
                                        }
                                        poster={project.info.poster}
                                        contain={true}
                                        id={project.info.thumbVideo}
                                      />
                                    </div>
                                  </div>

                                  <div className="tag absolute left-10 top-10 z-3">
                                    {project.title}
                                  </div>
                                  <div className="flex absolute z-3 top-10 right-10">
                                    {project.tags?.map((tag, key) => {
                                      return (
                                        <div key={key} className="tag">
                                          {tag.title}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-full justify-end mt-10'>
                    <CarouselNav
                      scrollProgress={scrollProgress}
                      prev={() => scrollPrev()}
                      next={() => scrollNext()}
                      className={
                        'w-full md:max-w-[20rem] ml-auto px-5 flex items-center gap-5'
                      }
                    />
                  </div>
                  <div className={`mt-100 modules px-10 pb-10 max-w-[50rem]`}>
                    {modules && (
                      <div className="w-full flex flex-col gap-30">
                        {modules.map((module, key) => {
                          return <Module key={key} module={module} />
                        })}
                      </div>
                    )}
                  </div>
                  <div className="text-12 text-smoke w-full p-10 pt-15 mt-15 border-t border-fog max-w-[50rem]">
                    <div className="md:hidden">Prepared for {client}.</div>
                    <div className="md:hidden">
                      Last updated on {updatedAt}.
                    </div>
                    <div>
                      Reach out to{' '}
                      <a href="mailto:jake@marcd.co">jake@marcd.co</a> with any
                      questions.
                    </div>
                    <div>
                      The enclosed content is the sole property of Marcd LLC.
                    </div>
                  </div>
                </div>
              </>
            )}
          </Layout>
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params, preview, previewData }) {
  const eventData = await getCapability(params.slug, {
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
  const capes = await getAllDocSlugs('capability')

  return {
    paths:
      capes?.map((project) => {
        return {
          params: {
            slug: project.slug,
          },
        }
      }) || [],
    fallback: false,
  }
}

export default Capability
