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
    <NextLink
      className="grid-item"
      href={'/'}
    >
      <div className='grid-item--content group'>
          <img className="w-full logo-icon" src={'/icons/icon-logo-full.png'} alt="logo" />
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
  const { address, contact, cta, social } = data

  return (
    <>
      <footer className={cx('footer-grid w-full grid-standard sticky top-0')}>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </footer>
    </>
  )
}

export default Footer
