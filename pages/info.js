import React from 'react'
import { useRouter } from 'next/router'

import { getStaticPage, queries } from '@data'

import NotFoundPage from '@pages/404'

import Layout from '@components/layout'
import BlockContent from '@components/block-content'

const Page = ({ data }) => {
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />
  }

  const { site, page } = data

  const { description, about, serviceTags, press } = page

  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          <div className={`px-10 py-60`}>
            <div className="">
              {/* <h2 className="text-10 uppercase leading-100">Studio</h2> */}
              <div className="flex gap-15 flex-col max-w-[45rem]">
                <h1 className="">{description}</h1>
                <div className="">
                  <div className="">
                    <BlockContent blocks={about} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-60 flex-col md:flex-row gap-10 md:gap-0">
              <div className="w-[15rem] uppercase text-slate">Services</div>
              <div className="flex gap-5 flex-col md:flex-row items-start">
                {serviceTags?.map((tag, key) => {
                  return (
                    <div key={key} className="btn-service px-10 uppercase">
                      {tag.title}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex mt-60 flex-col md:flex-row gap-10 md:gap-0">
              <div className="w-[15rem] uppercase text-slate">Contact</div>
              <div className="flex gap-5 flex-col">
                <a
                  className="link-text underline"
                  href="https://www.instagram.com/marcd.co/"
                >
                  studio@marcd.co
                </a>
                <a
                  className="link-text underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/marcd.co/"
                >
                  Instagram
                </a>
                <a
                  className="link-text underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.are.na/jake-pfahl"
                >
                  Are.na
                </a>
              </div>
            </div>
            <div className="flex mt-60 flex-col md:flex-row gap-10 md:gap-0">
              <div className="w-[15rem] uppercase text-slate">Recognition</div>
              <div className="flex gap-5 flex-col">
                {press?.map((item, key) => {
                  const ItemTag = item.link ? 'a' : 'div'
                  return (
                    <ItemTag
                      href={item.link}
                      target={item.link ? '_blank' : ''}
                      rel={item.link ? 'noopener noreferrer' : ''}
                      key={key}
                      className="transition-colors duration-300 hover:text-slate"
                    >
                      {item.title}
                    </ItemTag>
                  )
                })}
              </div>
            </div>
            {/* <div className="w-full flex justify-between p-10 mt-10 text-12">
              <span className="font-texi uppercase">
                © Marcd {new Date().getFullYear()}. ALL RIGHTS RESERVED.
              </span>
              <a
                className="uppercase link-text"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/marcd.co/"
              >
                Instagram
              </a>
            </div> */}
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
        description,
        about[]{${queries.ptContent}},
        image{${queries.assetMeta}},
        banner,
        content,
        contact,
        seo,
        services,
        press,
        serviceTags[]->{'slug': slug.current, title},
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
