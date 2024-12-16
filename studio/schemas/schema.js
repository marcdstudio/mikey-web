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
import info from './documents/info'
import category from './documents/category'
import directory from './documents/directory'
import error from './documents/error'
import profile from './documents/profile'

// Module types
import marquee from './modules/marquee'
import generalText from './modules/generalText'
import blockText from './modules/blockText'
import mediaFull from './modules/mediaFull'
import media2Up from './modules/media2Up'
import media3Up from './modules/media3Up'

// Object types
import seo from './objects/seo'

import form from './objects/form'

import navDropdown from './objects/nav-dropdown'
import navPage from './objects/nav-page'
import navLink from './objects/nav-link'
import socialLink from './objects/social-link'

import simplePortableText from './objects/portable-simple'
import complexPortableText from './objects/portable-complex'

import freeform from './objects/freeform'
import accordions from './objects/accordions'
import accordion from './objects/accordion'
import tagList from './objects/tagList'

import media from './objects/media'
import video from './objects/video'
import asset from './objects/asset'
import a11yImage from './objects/a11yImage'

import textBlock from './objects/textBlock'
import videoFull from './objects/videoFull'
import description from './objects/description'

import capabilityBlock from './objects/capability-block'
import capabilityDrawer from './objects/capability-drawer'
import capabilityDeliverables from './objects/capability-deliverables'
import capabilityFees from './objects/capability-fees'

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
    info,
    category,
    directory,
    error,
    profile,

    /* --------------- */
    /* 2: Module types */
    marquee,
    generalText,
    blockText,
    mediaFull,
    media2Up,
    media3Up,

    /* ----------------------- */
    /* 3: Generic Object types */
    seo,

    form,

    navDropdown,
    navPage,
    navLink,
    socialLink,

    simplePortableText,
    complexPortableText,

    freeform,
    accordions,
    accordion,
    tagList,

    media,
    video,
    asset,
    a11yImage,
    textBlock,
    videoFull,
    description,

    capabilityBlock,
    capabilityDrawer,
    capabilityFees,
    capabilityDeliverables
]