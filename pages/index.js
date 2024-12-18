import React, { useEffect, useRef, useState, useCallback } from 'react'
import Error from 'next/error'

import { getStaticPage, queries } from '@data'

import { useRouter } from 'next/router'

import Layout from '@components/layout'
import { Module } from '@components/modules'
import Grid from '@components/grid'

const Home = ({ data }) => {
  const { site, page } = data
  const { contentModules } = page

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
      <div className='w-full'>
        {contentModules?.map((module, key) => (
          <section data-section={key} key={key} className="sheet-trace">
            <Grid />
            <Module index={key} key={key} module={module} />
          </section>
        ))}
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

export default Home
