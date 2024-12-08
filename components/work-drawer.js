import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, m } from 'framer-motion'

import cx from 'classnames'

import { getStaticPage, queries } from '@data'

import NotFoundPage from '@pages/404'

import Layout from '@components/layout'
import Icon from '@components/icon'
import BlockContent from '@components/block-content'
import { Module } from '@components/modules'

const Work = ({ data }) => {
  const { site, page } = data
  const { projects } = page

  const router = useRouter()

  const [isExpanded, setIsExpanded] = useState(false)

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />
  }

  //handle drawers
  const [activeAccordion, setActiveAccordion] = useState(null)

  const onToggle = (id, status) => {
    setActiveAccordion(status ? id : null)
  }

  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          <div className="fixed z-7 left-0 px-10 top-55 w-full h-frame md:max-w-[50rem] xl:max-w-[60rem] 2xl:max-w-[70rem]">
            <div className="bg-frame backdrop-blur-frame shadow-primary relative w-full flex flex-col justify-between items-start work-container">
              <div className="project-card--frame h-full overflow-y-auto no-bar w-full flex flex-col pb-10">
                {projects?.map((project, key) => (
                  <section
                    className="pt-10"
                    data-project={project.slug}
                    key={key}
                  >
                    
                  </section>
                ))}
              </div>
            </div>
          </div>
          <div
            className={cx(
              'fixed top-0 left-0 z-[999999] w-screen h-screen transition-transform ease-[cubic-bezier(0.16,1,.3,1)] duration-500 flex',
              { 'translate-x-0': isExpanded, '-translate-x-full': !isExpanded }
            )}
          >
            <div className="w-full h-full bg-frame backdrop-blur-frame max-w-[120rem] shadow-primary flex-shrink-0">
              <div className="h-full overflow-y-auto no-bar">
                <AnimatePresence>
                  {isExpanded &&
                    projects?.map((project, key) => {
                      if (project.slug == isExpanded)
                        return (
                          <m.div
                            initial="hide"
                            animate="show"
                            exit="hide"
                            variants={{
                              show: {
                                opacity: 1,
                              },
                              hide: {
                                opacity: 0,
                              },
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            key={key}
                          >
                            <div className="w-full text-12 p-15">
                              <h2 className="text-30 md:text-40 leading-100 font-bota tracking-tight">
                                {project.title}
                              </h2>
                              <div className={`p-10}`}>
                                {project.info?.link && (
                                  <a
                                    className="flex gap-3 items-start uppercase mt-25 hover:text-blue transition-colors duration-300"
                                    href={project.info.link}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <span className="inline-block">
                                      Visit Site
                                    </span>
                                    <div className="flex items-center w-[.6rem] h-[.6rem] mt-[.4rem]">
                                      <Icon
                                        name="Arrow Out"
                                        viewBox="0 0 6 6"
                                      />
                                    </div>
                                  </a>
                                )}
                                <div className="w-full mt-15 max-w-[55rem]">
                                  <BlockContent blocks={project.description} />
                                </div>
                                {project.creditList && (
                                  <div className={`mt-20`}>
                                    <h2 className="text-12 uppercase font-texi text-slate">
                                      Credits
                                    </h2>
                                    <div className="w-full mt-10 flex flex-col gap-5">
                                      {project.creditList?.map((list, key) => (
                                        <div key={key} className={`flex gap-5`}>
                                          <div className="pb-5 uppercase">
                                            {list.title}
                                          </div>
                                          <span>&mdash;</span>
                                          <div className="flex flex-col md:flex-row gap-5 md:gap-[.3rem]">
                                            {list.credits.map((credit, key) => (
                                              <div key={key} className="">
                                                {credit.title}
                                                {key + 1 != list.credits.length
                                                  ? ','
                                                  : ''}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full relative px-15 flex flex-col gap-80 pb-15">
                              {project.modules?.map((slide, key) => {
                                if (
                                  slide._type == 'imageFull' ||
                                  slide._type == 'videoFull'
                                )
                                return (
                                  <div
                                    data-type={slide._type}
                                    className={`relative w-full`}
                                    key={key}
                                  >
                                    <Module
                                      key={key}
                                      isModal={true}
                                      module={slide}
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          </m.div>
                        )
                    })}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setIsExpanded(null)}
                className={`fixed z-3 right-25 top-15 btn--project`}
              >
                Close
              </button>
            </div>
            <button
              className="flex-1 h-full"
              onClick={() => setIsExpanded(null)}
            ></button>
          </div>
        </Layout>
      )}
    </>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
      *[_type == "selectedWork"][0]{
        seo,
        projects[]->{
          'modules': contentModules[]{
            _type == 'imageFull' => {
              _type,
              _key,
              title,
              caption,
              layout,
              image{
                ${queries.assetMeta}
              },
            },
            _type == 'videoFull' => {
              _type,
              _key,
              video,
              caption,
              layout,
              'poster': videoPlaceholder.image.asset->url,
              "aspectRatio": videoPlaceholder.image.asset->metadata.dimensions.aspectRatio,
            },
          },
          title,
          'slug': slug.current,
          'services': info.tags[]->title,
          'tags': info.tags[]->{title, 'slug':slug.current},
          'categories': info.categories[]->{title, 'slug':slug.current},
          description[]{${queries.ptContent}},
          descriptionThumbnail[]{${queries.ptContent}},
          creditList[]{
            title,
            credits[]->{...}
          },
          info{
            link,
            thumbVideo,
            thumbBackground{${queries.assetMeta}},
            'poster':thumbPlaceholder.image.asset->url,
          },
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
export default Work
