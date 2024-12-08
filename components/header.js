import React, { useState } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'

import NextLink from 'next/link'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import Marquee from '@components/modules/marquee'

import { useWindowSize } from '@lib/helpers'

const Header = ({ data, work }) => {
  if (!data) return

  const { width } = useWindowSize()

  const { marquee } = data
  // setup states
  const router = useRouter()

  const [isCopying, setIsCopying] = useState(false)

  const handleContact = () => {
    setIsCopying(true)

    navigator.clipboard.writeText('studio@marcd.co')

    setTimeout(() => {
      setIsCopying(false)
    }, 3000)
  }

  const handleWorkScroll = () => {
    document.body.style.overflow = 'hidden'

    gsap.to('.work', {
      duration: 1,
      scrollTo: {
        y: 'header',
        offsetY: 0,
      },
      ease: 'expo.out',
      onComplete: () => {
        document.body.style.overflow = ''
      },
    })
  }

  const [isHome, setIsHome] = useState()

  useState(() => {
    setIsHome(router.pathname == '/')
  }, [])

  const handleHome = () => {
    router.push(`/`) // Replace '/new-page' with your desired route
  }

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <header
        className={cx('fixed z-9 top-0 left-0 w-full grid-standard', {
          shrink: !isHome,
        })}
      >
        <NextLink
          className="col-span-1 -translate-x-6 w-[calc(100%+2.4rem)]"
          href={'/'}
        >
          <img className='w-full' src={'/icons/icon-logo-full.png'} alt="logo"/>
        </NextLink>
      </header>
    </>
  )
}

export default Header
