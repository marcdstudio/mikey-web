import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'

import NextLink from 'next/link'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import Link from '@components/link'

import { useWindowSize } from '@lib/helpers'

const Header = ({ data, work }) => {
  if (!data) return

  const { width } = useWindowSize()

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

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <header className={cx('fixed z-9 top-0 left-0 w-full grid-standard')}>
        <NextLink
          className="col-span-1 -translate-x-18 w-[calc(100%+3.6rem)]"
          href={'/'}
        >
          <img
            className="w-full logo-icon"
            src={'/icons/icon-logo-full.png'}
            alt="logo"
          />
        </NextLink>

        <div className="col-span-4 flex justify-end gap-24 pt-24">
          {nav?.map((link, key) => (
            <span key={key}>
              <Link className={``} key={key} link={link} />
            </span>
          ))}
        </div>
        <div className="col-span-1 pt-24 flex items-start justify-end">
          <button onClick={() => handleTheme()} className="py-0 px-0 text-16">CMYK</button>
        </div>
      </header>
    </>
  )
}

export default Header
