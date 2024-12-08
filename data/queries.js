// Construct our "home" and "error" page GROQ
export const homeID = `*[_type=="generalSettings"][0].home->_id`
export const errorID = `*[_type=="generalSettings"][0].error->_id`

// Construct our "page" GROQ
const page = `
  "type": _type,
  "slug": slug.current,
  "isHome": _id == ${homeID}
`

// Construct our "link" GROQ
const link = `
  _key,
  _type,
  title,
  url,
  anchor,
  "page": page->{
    ${page}
  }
`

// Construct our "image meta" GROQ
export const imageMeta = `
  "alt": coalesce(alt, asset->alt),
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`

// Construct our "image meta" GROQ
export const assetMeta = `
  alt,
  'asset': image.asset,
  "id": image.asset->assetId,
  "type": image.asset->mimeType,
  "aspectRatio": image.asset->metadata.dimensions.aspectRatio,
  "lqip": image.asset->metadata.lqip
`

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${page}
      }
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`

// Construct our "blocks" GROQ
export const blocks = `
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${ptContent}
      }
    }
  }
`

// Construct our "projectSection" GROQ
export const projectSection = `
  'section': section->{
    title,
    'slug': slug.current
  }
`

// Construct our content "modules" GROQ
export const modules = `
  _type == 'generalText' => {
    _type,
    _key,
    title,
    content[]{
      ${ptContent}
    }
  },
  _type == 'imageFull' => {
    _type,
    _key,
    title,
    caption,
    layout,
    image{
      ${assetMeta}
    },
    ${projectSection}
  },
  _type == 'videoFull' => {
    _type,
    _key,
    video,
    videoHD,
    caption,
    layout,
    'poster': videoPlaceholder.image.asset->url,
    "aspectRatio": videoPlaceholder.image.asset->metadata.dimensions.aspectRatio,
    ${projectSection}
  },
  _type == 'tagList' => {
    _type,
    _key,
    title,
    tags[]->{
      title,
      'content': description[]{${ptContent}}
    }
  },
  _type == 'textBlock' => {
    _type,
    _key,
    title,
    padding,
    'content': body[]{${ptContent}}
  },
  _type == 'description' => {
    _type,
    _key,
    title,
    padding,
    size,
    display,
    'content': body[]{${ptContent}},
    ${projectSection}
  },
  _type == 'indexList' => {
    _type,
    _key,
    title,
    "directory": *[_type == "directory"][0]{
      indexItems[]|order(year desc){
        clientName,
        year,
        categories[]->{title},
        industry[]->{title},
        inProgress,
        hidden,
        year,
        description[]{${ptContent}}
      }
    }
  },
  _type == 'imageText2Up' => {
    _type,
    _key,
    title,
    subtitle,
    cta[0]{
      ${link}
    },
    content[]{
      ${ptContent}
    },
    image{
      ${assetMeta}
    },
  },
  _type == 'marquee' => {
    _type,
    _key,
    items[]{
      _type == 'simple' => {
        _type,
        text
      },
    },
    speed,
    reverse,
    pausable
  }
`

// Construct our "site" GROQ
export const site = `
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "cookieConsent": *[_type == "cookieSettings"][0]{
      enabled,
      message,
      "link": link->{"type": _type, "slug": slug.current}
    },
    "header": *[_type == "headerSettings"][0]{
      tagline,
      subtitle,
      marquee{
        _type,
        _key,
        items[]{
          _type == 'simple' => {
            _type,
            text
          },
        },
        speed,
        reverse,
        pausable
      },
      news{
        title,
        image{image{${assetMeta}}},
        items[]| order(date desc){
          ...,
        },
        'icon': icon.asset->url,
      }
    },
    "footer": *[_type == "footerSettings"][0]{ 
      images[]{
        ${assetMeta}
      },
      links[]{
        ${link}
      },
      banner{
        items[]{
          _type == 'simple' => {
            _type,
            text
          },
        },
        speed,
        reverse,
        pausable
      },
      newsletter,
      instagram,
      copyright
    },
    "seo": *[_type == "seoSettings"][0]{
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic,
      "favicon": favicon.asset->url,
      "faviconLegacy": faviconLegacy.asset->url,
      touchIcon
    },
    "gtmID": *[_type == "generalSettings"][0].gtmID,
  }
`

export const projectData = `
  'id': _id,
  'work': *[_type == "selectedWork"][0]{
    projects[]->{
      title,
      'slug': slug.current,
      'tags': info.tags[]->{title, 'slug':slug.current}
    }
  },
  'modules': contentModules[]{
    ${modules}
  },
  creditList[]{
    'title': credit->title,
    credits[]->{...}
  },
  title,
  'slug': slug.current,
  'services': info.tags[]->title,
  'tags': info.tags[]->{title, 'slug':slug.current},
  description[]{${ptContent}},
  descriptionThumbnail[]{${ptContent}},
  completed,
  seo,
  info{
    link,
    thumbVideo,
    thumbBackground{${assetMeta}},
    'poster': thumbPlaceholder.image.asset->url,
  },
  related[0]->{
    title,
    'slug': slug.current,
    info{
      thumbPlaceholder{${assetMeta}}
    }
  }
`
