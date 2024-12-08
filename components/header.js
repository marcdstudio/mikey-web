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
        className={cx('w-screen z-6 flex gap-5 justify-between p-10 pb-0', {
          shrink: !isHome,
        })}
      >
        <button
          onClick={isHome ? () => handleWorkScroll() : () => handleHome()}
          className="btn-nav uppercase px-10"
        >
          <div className="text-slate nav-count">{work?.projects?.length}</div>
          <div>Selected Work</div>
        </button>
        <NextLink href="/info" className="btn-nav flex-1 px-0">
          <div className="w-full font-texi text-slate nav-marquee">
            <Marquee data={marquee} />
          </div>
          <div className="uppercase px-10">Information</div>
        </NextLink>
        {/* <button
          onClick={() => handleContact()}
          className={`btn-nav uppercase px-10 items-end is-contact duration-300${isCopying ? ' is-copying' : ''}`}
        >
          <div className="icon-pulse"></div>
          <div className='hidden md:block'>{isCopying ? 'Copied studio@marcd.co' : 'Contact'}</div>
          <div className='block md:hidden'>{isCopying ? 'Copied' : 'Contact'}</div>
        </button> */}
        <a
          href="mailto:studio@marcd.co"
          className={`btn-nav uppercase group px-10 items-end is-contact duration-300${
            isCopying ? ' is-copying' : ''
          }`}
        >
          <div className="icon-pulse group-hover:bg-black transition-colors duration-300"></div>
          <div className="">Contact</div>
        </a>
      </header>
    </>
  )
}

export default Header
