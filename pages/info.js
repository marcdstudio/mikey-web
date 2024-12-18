import React from 'react'
import { useRouter } from 'next/router'

import { getStaticPage, queries } from '@data'

import NotFoundPage from '@pages/404'

import Layout from '@components/layout'
import BlockContent from '@components/block-content'
import { Module } from '@components/modules'
import Grid from '@components/grid'

const Page = ({ data }) => {
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />
  }

  const { site, page } = data

  const { contentModules } = page

  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          <div className="w-full">
            {contentModules?.map((module, key) => (
              <section data-section={key} key={key} className="sheet-trace">
                <Grid />
                <Module index={key} key={key} module={module} />
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
      *[_type == "info"][0]{
        'id': _id,
        title,
        contentModules[]{${queries.modules}},
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
