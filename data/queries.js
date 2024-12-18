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

// Construct our "media meta" GROQ
export const mediaContent = `
  'content': media[0]{
    _type,
    ...,
    _type == 'asset' => {
      ${assetMeta}
    },
    _type == 'video' => {
      'video': video.asset->{...},
      'poster': poster.asset->url,
      "posterAspect": poster.asset->metadata.dimensions.aspectRatio,
      autoplayDisabled
    }
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
  _type == 'hero' => {
    _type,
    _key,
    title,
    media{${mediaContent}},
    background
  },
  _type == 'media2Up' => {
    _type,
    _key,
    caption,
    drawing,
    content[]{${mediaContent}}
  },
  _type == 'mediaText2Up' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    media{${mediaContent}}
  },
  _type == 'mediaText3Up' => {
    _type,
    _key,
    items[]{
      title,
      content[]{
        ${ptContent}
      },
      media{${mediaContent}},
    }
  },
  _type == 'link3Up' => {
    _type,
    _key,
    items[]{
      title,
      link[0]{${link}},
    }
  },
  _type == 'categories' => {
    _type,
    _key,
    items[]->{
      title,
      description,
      thumbnail { ${mediaContent} },
      color,
      "projects": *[_type == 'project' && category._ref == ^._id]{
        title
      }
    }
  },
  _type == 'mediaText' => {
    _type,
    _key,
    title,
    content[]{
      ${ptContent}
    },
    media{${mediaContent}}
  },
  _type == 'mediaFull' => {
    _type,
    _key,
    bleed,
    media{${mediaContent}},
    caption,
    drawing
  },
  _type == 'drawers' => {
    _type,
    _key,
    drawers[]{
      _key,
      media{${mediaContent}},
      content[]{${ptContent}},
      title,
      link,
      date
    }
  },
  _type == 'carousel' => {
    _type,
    _key,
    media[]{${mediaContent}},
    caption,
    drawing
  },
  _type == 'model' => {
    _type,
    _key,
    model{asset->{...}},
    caption,
  },
  _type == 'featuredProject' => {
    _type,
    _key,
    project->{
      title,
      caption,
      thumbnail{${mediaContent}},
      category->{color, title},
      description[]{${ptContent}}
    },
  },
  _type == 'featuredProject3Up' => {
    _type,
    _key,
    title,
    projects[]->{
      title,
      'slug': slug.current,
      caption,
      thumbnail{${mediaContent}},
      category->{color, title},
      description[]{${ptContent}}
    },
  },
  _type == 'blockText' => {
    _type,
    _key,
    sizeBody,
    content[]{
      ${ptContent}
    },
    width,
    alignment
  }
`

// Construct our "product" GROQ
export const product = `
  {
    "publishDate": coalesce(publishDate, _createdAt),
    "slug": slug.current,
    "id": productID,
    title,
    subtitle,
    price,
    comparePrice,
    description[]{
      ${ptContent}
    },
    message[]{
      ${ptContent}
    },
    'gallery': productGallery[]{
      ${mediaContent}
    },
    'swatches': productSwatches[]{
      color,
      'swatch':swatch.image.asset->url,
      variants[]->{title}
    },
    "photos": {
      "main": galleryPhotos[]{
        forOption,
        photos[]{
          _type == 'asset' => {
            ${imageMeta}
          },
          _type == 'videoSimple' => {
            'src' => video.asset->url,
            'poster': poster.asset->url
          }
        }
      },
      "listing": listingPhotos[]{
        forOption,
        "default": listingPhoto{
          ${imageMeta}
        },
        "hover": listingPhotoHover{
          ${imageMeta}
        }
      },
    },
    heroImage{${assetMeta}},
    inStock,
    lowStock,
    useGallery,
    surfaceOption,
    options[]{
      name,
      position,
      values[]
    },
    optionSettings[]{
      forOption,
      "color": color->color,
    },
    "variants": *[_type == "productVariant" && productID == ^.productID && wasDeleted != true && isDraft != true]{
      "id": variantID,
      title,
      swatch,
      price,
      comparePrice,
      inStock,
      lowStock,
      "photos": galleryPhotos[]{
        forOption,
        photos[]{
          ${imageMeta}
        }
      },
      cartImage{${assetMeta}},
      options[]{
        name,
        position,
        value
      },
      seo
    },    
    "klaviyoAccountID": *[_type == "generalSettings"][0].klaviyoAccountID,
    "filters": filters[]{
      "slug": filter->slug.current,
      forOption
    },
    preOrder,
    'waitlist': *[_type == "shopSettings"][0].waitlist,
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
      nav[]{
        _type == 'navLink' => {_type, ${link}},
        _type == 'navPage' => {_type, ${link}},
        _type == 'navContact' => {_type, title,links[]{${link}}}
      },
      email
    },
    "footer": *[_type == "footerSettings"][0]{ 
      links[]{
        ${link}
      },
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
  title,
  subtitle,
  year,
  location->{title},
  'category': category->{title, color},
  'slug': slug.current,
  'tags': info.tags[]->{title, 'slug':slug.current},
  description[]{${ptContent}},
  thumbnail{${mediaContent}},
  contentModules[]{
    ${modules}
  },
  credits[]{
    profile->{title, link},
    role,
  },
  seo,
  related[]->{
    title,
    'slug': slug.current,
    thumbnail{${mediaContent}},
  }
`
