import React from 'react'
import { useRouter } from 'next/router'

import { getStaticPage, queries } from '@data'

import NotFoundPage from '@pages/404'

import Layout from '@components/layout'
import Photo from '@components/photo'
import BlockContent from '@components/block-content'
import { Module } from '@components/modules'
import Grid from '@components/grid'

const Page = ({ data }) => {
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />
  }

  const { site, page } = data

  const { sketches, title } = page

  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          <div className="w-full sheet-container">
            {sketches?.map((sketch, key) => (
              <section data-section={key} key={key} className="sheet-trace flex items-center justify-center">
                <Grid />
                <div className='w-[80%] h-[66%] flex items-center justify-center is-drawing'>
                    <Photo
                      photo={sketch?.image}
                      width={2000}
                      srcSizes={[1000, 1200, 1600, 2000]}
                      sizes="100%"
                      layout={'contain'}
                      className={'w-full h-full object-contain'}
                    />
                </div>
                {sketch?.caption && <div className='absolute left-24 bottom-18 text-ash'>{sketch?.caption}</div>}
              </section>
            ))}
          </div>
        </Layout>
      )}
    </>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
      *[_type == "sketches"][0]{
        'id': _id,
        title,
        sketches[]{
            image{${queries.assetMeta}},
            caption
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

// export async function getStaticPaths() {
//   const allPages = await getAllDocSlugs('work')

//   return {
//     paths:
//       allPages?.map((page) => {
//         let slugs = page.slug.split('/').filter((e) => e)
//         return {
//           params: {
//             slug: slugs,
//           },
//         }
//       }) || [],
//     fallback: false,
//   }
// }

export default Page
