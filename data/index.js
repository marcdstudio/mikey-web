import { getSanityClient } from '@lib/sanity'
import * as queries from './queries'

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true && isDraft != true]{ "slug": slug.current }`
  )
  return data
}

// Fetch all our page redirects
export async function getAllRedirects() {
  const data = await getSanityClient().fetch(
    `*[_type == "redirect"]{ from, to }`
  )
  return data
}

// Fetch a static page with our global data
export async function getStaticPage(pageData, preview) {
  const query = `
  {
    "page": ${pageData},
    ${queries.site}
  }
  `

  const data = await getSanityClient(preview).fetch(query)

  return data
}

// Fetch a specific dynamic page with our global data
export async function getProject(slug, preview) {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  // Query to get the current project and the ordered projects from selectedWork
  const query = `
    {
      "page": *[_type == "project" && slug.current in ${JSON.stringify(
        slugs
      )}] | order(_updatedAt desc)[0]{
        ${queries.projectData},
        "slug": slug.current
      },
      "selectedWork": *[_type == "selectedWork"][0]{
        "projects": projects[]->{
          "slug": slug.current,
          "title": title
        }
      },
      ${queries.site},
    }
  `

  const data = await getSanityClient(preview).fetch(query)

  // Determine the next project if it exists
  const projects = data.selectedWork?.projects || []
  const currentProjectIndex = projects.findIndex(
    (project) => project.slug === data.page.slug
  )
  const nextProjectIndex = currentProjectIndex + 1
  let nextProject = null

  if (nextProjectIndex < projects.length) {
    nextProject = {
      slug: projects[nextProjectIndex].slug,
      title: projects[nextProjectIndex].title,
    }
  }

  return {
    ...data,
    nextProject,
  }
}

export async function getCapability(slug, preview) {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
    {
      "page": *[_type == "capability" && slug.current in ${JSON.stringify(
        slugs
      )}] | order(_updatedAt desc)[0]{
        _updatedAt,
        date,
        title,
        'slug': slug.current,
        size,
        type,
        client,
        password,
        description[]{${queries.ptContent}},
        projects[]->{
          ${queries.projectData}
        },
        modules[]{
          _type == 'capabilityBlock' => {
            _type,
            _key,
            title,
            content[]{
              ${queries.ptContent}
            },
          },
          _type == 'capabilityDrawer' => {
            _type,
            _key,
            title,
            drawers[]->{
              title,
              'content':description[]{${queries.ptContent}}
            },
          },
          _type == 'capabilityDeliverables' => {
            _type,
            _key,
            title,
            items[]{
              title,
              'content':description[]{${queries.ptContent}}
            },
          },
          _type == 'capabilityFees' => {
            _type,
            _key,
            title,
            description[]{${queries.ptContent}},
            structure[]{${queries.ptContent}},
            items[]{
              'feature': feature->title,
              'timeline': timeline->title,
              cost
            },
            spacing,
            override,
            summation
          }
        },
        'general': *[_type == "capabilityGeneral"][0]{
          ...,
          overview[]{${queries.ptContent}},
        }
      },
      ${queries.site},
    }
    `

  const data = await getSanityClient(preview).fetch(query)

  return data
}

// Fetch a specific dynamic project with our global data
export async function getPage(slug, preview) {
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const query = `
    {
      "page": *[_type == "page" && slug.current in ${JSON.stringify(
        slugs
      )}] | order(_updatedAt desc)[0]{
        hasTransparentHeader,
        modules[]{
          defined(_ref) => { ...@->content[0] {
            ${queries.modules}
          }},
          !defined(_ref) => {
            ${queries.modules},
          }
        },
        title,
        seo,
      },
      ${queries.site},
    }
    `

  const data = await getSanityClient(preview).fetch(query)

  return data
}

export { queries }
