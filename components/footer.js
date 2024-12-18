import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import cx from 'classnames'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import Icon from '@components/icon'
import Link from '@components/link'
import BlockContent from '@components/block-content'

import { useSiteContext } from '@lib/context'

const Block = () => {
  return (
    <NextLink className="grid-item" href={'/'}>
      <div className="grid-item--content group">
        <img
          className="w-full logo-icon"
          src={'/icons/icon-logo-full.png'}
          alt="logo"
        />
        <img
          className="w-full absolute left-0 top-0 group-hover:opacity-0 logo-icon"
          src={'/icons/icon-logo-full-block.png'}
          alt="logo"
        />
      </div>
    </NextLink>
  )
}

const Footer = ({ data }) => {
  const { links } = data

  const router = useRouter()

  const [isWork, setIsWork] = useState(false)
  const { isPageTransition } = useSiteContext()

  useEffect(() => {
    if (router.pathname == '/work') {
      setIsWork(true)
    } else {
      setIsWork(false)
    }
  }, [router, isPageTransition])

  return isWork ? null : (
    <>
      <footer className="w-full sticky top-0 h-[16.66667vh] flex items-end justify-end flex-col -mb-12">
        <div className="w-full flex justify-between px-14 md:px-24 py-24">
          <div className="flex gap-12">
            <div className="col-span-3">© Mikey {new Date().getFullYear()}</div>
            <a
              className="transition-colors duration-300 hover:text-forest"
              href="https://marcd.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site Credits
            </a>
          </div>
          <div className="flex gap-12">
            {links?.map((link, key) => {
              return <Link key={key} link={link} />
            })}
          </div>
        </div>
        <div className={cx('footer-grid w-full grid-standard relative')}>
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </div>
        <div className="absolute left-0 bottom-0 w-full h-full pointer-events-none">
          <div className="texture-grid">
            {/* x axis */}
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
            <div className="grid-line--vertical"></div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
