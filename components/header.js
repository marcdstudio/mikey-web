import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'

import NextLink from 'next/link'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import Link from '@components/link'

import { useWindowSize } from '@lib/helpers'

import {
  useSiteContext,
} from '@lib/context'

const Header = ({ data, work }) => {
  if (!data) return

  const { width } = useWindowSize()
  const { isPageTransition } =
  useSiteContext()

  const { nav } = data
  // setup states
  const router = useRouter()

  //Setup theme
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const handleTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light') 
  }

  //Setup scroll
  const [visible, setVisible] = useState(true)
  const [position, setPosition] = useState(0)
  const [isHome, setIsHome] = useState(true)
  const [seen, setHasSeen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset

      if (position < 100 && !seen) {
        setVisible(true)
      } else {
        setVisible(false)
        setHasSeen(true)
      }
      setPosition(moving)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    if(router.pathname == '/' && !seen){
      setVisible(true)
    } else{
      setVisible(false)
    }
  }, [router, isPageTransition])

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <header className={cx('fixed z-9 top-0 left-0 w-full grid-standard')}>
        <NextLink
          className="col-span-2 md:col-span-1 -translate-x-12 md:-translate-x-18 w-[calc(100%+3rem)] md:w-[calc(100%+3.6rem)]"
          href={'/'}
        >
          <img
            className={`w-full logo-icon transition-opacity duration-300${visible ? ' opacity-100' : ' opacity-[.05]'}`}
            src={'/icons/icon-logo-full.png'}
            alt="logo"
          />
          <img
            className="logo-icon absolute -left-1 top-0 w-[34.5%]"
            src={'/icons/icon-logo-m.png'}
            alt="m logo"
          />
        </NextLink>

        <div className="col-span-4 hidden md:flex justify-end gap-24 pt-24">
          {nav?.map((link, key) => (
            <span key={key}>
              <Link className={``} key={key} link={link} />
            </span>
          ))}
        </div>
        <div className="col-span-1 pt-24 flex items-start justify-end">
          <button onClick={() => handleTheme()} className="py-0 px-0">{theme == 'dark' ? 'MONO' : 'CMYK'}</button>
        </div>
      </header>
    </>
  )
}

export default Header
