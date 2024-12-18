import React, { useState } from 'react'
import Error from 'next/error'
import NextLink from 'next/link'

import { getStaticPage, queries } from '@data'

import Layout from '@components/layout'
import Grid from '@components/grid'
import Media from '@components/media'

const Work = ({ data }) => {
  const { site, page } = data
  const { sections } = page

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
      <div className="w-full h-screen work-sheets" data-index={activeSection}>
        {sections?.map((section, key) => {
          return (
            <section
              key={key}
              onMouseEnter={() => setActiveSection(key + 1)}
              className={`sheet-work no-bar`}
            >
              <div className="h-auto relative">
                <Grid items={section?.projects} type={'work'} />
                {section?.projects?.map((project, key) => {
                  return (
                    <NextLink
                      href={`/work/${project.slug}`}
                      key={key}
                      className="w-full h-[66.6667vh] flex flex-col justify-between relative z-2"
                    >
                      <div className="flex-1 flex flex-col justify-end text-ash px-24 py-12">
                        <div>{project.title}</div>
                      </div>
                      <div className="w-full h-[50vh] px-24 py-12">
                        <div className="w-full h-full relative">
                          <Media
                            className={'w-full h-full object-cover'}
                            width={1800}
                            layout={'fill'}
                            media={project?.thumbnail?.content}
                            controls={true}
                          />
                        </div>
                      </div>
                    </NextLink>
                  )
                })}
              </div>
              <div
                style={{ background: section?.category?.color?.hex }}
                className={`absolute z-2 right-6 top-[calc(16.6667vh-.6rem)] w-[1.2rem] h-[1.2rem]`}
              ></div>
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "work"][0]{
      "id":_id,
      title,
      sections[]{
        'category': category->{title, 'slug': slug.current, color},
        projects[]->{
            title,
            'slug': slug.current,
            thumbnail{${queries.mediaContent}}
        }
      },
      seo,
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
