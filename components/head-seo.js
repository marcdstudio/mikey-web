import React from 'react'
import Head from 'next/head'
import { imageBuilder } from '@lib/sanity'
import { useRouter } from 'next/router'

const HeadSEO = ({ site = {}, page = {}, schema }) => {
  const router = useRouter()

  // set <head> variables
  const siteTitle = site.title

  const siteFavicon = site.seo?.favicon || '/favicon.svg'
  const siteFaviconLegacy = site.seo?.faviconLegacy || '/favicon.ico'
  const siteTouchIcon = site.seo?.touchIcon

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: page.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    page.seo?.metaTitle
      ? `${
          router.asPath == '/'
            ? `Mikey | ${page.seo.metaTitle}`
            : `${page.seo.metaTitle} | Mikey`
        }`
      : site.seo?.metaTitle,
    templateTags
  )
  const metaDesc = page.seo?.metaDesc || site.seo?.metaDesc

  // const shareTitle = replaceTemplateTags(
  //   page.seo?.shareTitle || site.seo?.shareTitle,
  //   templateTags
  // )
  // const shareDesc = page.seo?.shareDesc || site.seo?.shareDesc
  const shareGraphic =
    page.seo?.shareGraphic?.asset || site.seo?.shareGraphic?.asset

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="format-detection" content="telephone=no" />

      {/* Preload Fonts */}
      <link
        rel="preload"
        href="/fonts/Tex-Italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/Tex-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/Tex-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/Tex-BoldItalic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/MonumentGrotesk-Semi-Mono.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/Bota-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link> 

      {/* <link rel="icon" href={siteFaviconLegacy} sizes="any" /> */}
      <link preload="true" rel="icon" type="image/svg+xml" href={siteFavicon} />
      <link preload="true" rel="mask-icon" href={siteFavicon} color="#000000" />

      {siteTouchIcon && (
        <link
          rel="apple-touch-icon"
          href={imageBuilder.image(siteTouchIcon).width(192).height(192).url()}
        />
      )}

      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />

      <title>{metaTitle}</title>

      {metaDesc && <meta name="description" content={metaDesc} />}

      {metaTitle && (
        <>
          <meta property="og:title" content={metaTitle} />
          <meta name="twitter:title" content={metaTitle} />
        </>
      )}

      {metaDesc && (
        <>
          <meta property="og:description" content={metaDesc} />
          <meta name="twitter:description" content={metaDesc} />
        </>
      )}

      {shareGraphic && (
        <>
          <meta
            property="og:image"
            content={imageBuilder
              .image(shareGraphic)
              .width(1200)
              .height(630)
              .url()}
          />
          <meta
            name="twitter:image"
            content={imageBuilder
              .image(shareGraphic)
              .width(1200)
              .height(630)
              .url()}
          />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {siteTitle && <meta property="og:site_name" content={siteTitle} />}

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}

export default HeadSEO

// replace template tags with values
function replaceTemplateTags(string, templateTags = []) {
  let newString = string

  templateTags.map((v) => {
    newString = newString.replace(new RegExp(v.tag, 'g'), v.value)
  })

  return newString
}
