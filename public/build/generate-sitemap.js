const groq = require('groq')

const fs = require('fs')
const path = require('path')

const sanityClient = require('@sanity/client')
const client = sanityClient({
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: true,
  apiVersion: '2021-03-25',
})

const SITEMAP_PATH = path.resolve(process.cwd(), 'public', 'sitemap.xml')
const SITE_ROOT = 'https://marcd.co'

//
// === Queries ===
//

//
// === Sitemap ===
//
const pagesQuery = groq`*[
	_type == "page" &&
	!(_id in path("drafts.**"))
].slug.current`

const articlesQuery = groq`*[
	_type == "article" &&
	!(_id in path("drafts.**"))
].slug.current`

const projectsQuery = groq`*[
	_type == "project" &&
	!(_id in path("drafts.**"))
].slug.current`

//
// === BUILD ===
//
const generateSitemap = async () => {
  const [pages, articles, projects] = await Promise.all([
    client.fetch(pagesQuery),
    client.fetch(articlesQuery),
    client.fetch(projectsQuery),
  ])

  const homepageLocation = `<url><loc>${SITE_ROOT}</loc></url>`
  const aboutLocation = `<url><loc>${SITE_ROOT}/info</loc></url>`
  const workLocation = `<url><loc>${SITE_ROOT}/work</loc></url>`

  const pagesLocations = pages.map(
    slug => `<url><loc>${SITE_ROOT}/${slug}</loc></url>`,
  )

  const projectsLocations = projects.map(
    slug => `<url><loc>${SITE_ROOT}/work/${slug}</loc></url>`,
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${homepageLocation}
  ${aboutLocation}
  ${workLocation}
  ${pagesLocations}
</urlset>`

  fs.writeFileSync(SITEMAP_PATH, sitemap)
}

generateSitemap()