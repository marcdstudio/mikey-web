// Document types
import page from './documents/page'

import generalSettings from './documents/settings-general'
import headerSettings from './documents/settings-header'
import footerSettings from './documents/settings-footer'
import seoSettings from './documents/settings-seo'
import home from './documents/home'
import menu from './documents/menu'
import redirect from './documents/redirect'
import section from './documents/section'
import project from './documents/project'
import work from './documents/work'
import info from './documents/info'
import category from './documents/category'
import directory from './documents/directory'
import error from './documents/error'
import profile from './documents/profile'
import location from './documents/location'
import sketches from './documents/sketches'

// Module types
import marquee from './modules/marquee'
import generalText from './modules/generalText'
import blockText from './modules/blockText'
import mediaFull from './modules/mediaFull'
import media2Up from './modules/media2Up'
import carousel from './modules/carousel'
import model from './modules/model'
import featuredProject from './modules/featuredProject'
import featuredProject3Up from './modules/featuredProject3Up'
import mediaText2Up from './modules/mediaText2Up'
import mediaText3Up from './modules/mediaText3Up'
import mediaText from './modules/mediaText'
import drawers from './modules/drawers'
import categories from './modules/categories'
import link3Up from './modules/link3Up'
import hero from './modules/hero'

// Object types
import seo from './objects/seo'

import form from './objects/form'

import navDropdown from './objects/nav-dropdown'
import navPage from './objects/nav-page'
import navLink from './objects/nav-link'

import simplePortableText from './objects/portable-simple'
import complexPortableText from './objects/portable-complex'

import freeform from './objects/freeform'
import accordions from './objects/accordions'
import accordion from './objects/accordion'

import media from './objects/media'
import video from './objects/video'
import asset from './objects/asset'
import a11yImage from './objects/a11yImage'

import textBlock from './objects/textBlock'
import videoFull from './objects/videoFull'
import description from './objects/description'

/*  ------------------------------------------ */
/*  Your Schema documents / modules / objects
/*  ------------------------------------------ */
export default [
  /* ----------------- */
  /* 1: Document types */
  page,

  generalSettings,
  headerSettings,
  footerSettings,
  seoSettings,
  home,
  menu,
  redirect,
  section,
  project,
  work,
  info,
  category,
  directory,
  error,
  profile,
  location,
  sketches,

  /* --------------- */
  /* 2: Module types */
  marquee,
  generalText,
  blockText,
  mediaFull,
  media2Up,
  carousel,
  model,
  featuredProject,
  featuredProject3Up,
  mediaText,
  mediaText2Up,
  mediaText3Up,
  drawers,
  categories,
  link3Up,
  hero,

  /* ----------------------- */
  /* 3: Generic Object types */
  seo,

  form,

  navDropdown,
  navPage,
  navLink,

  simplePortableText,
  complexPortableText,

  freeform,
  accordions,
  accordion,

  media,
  video,
  asset,
  a11yImage,
  textBlock,
  videoFull,
  description,
]
