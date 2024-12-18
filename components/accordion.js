import React, { useState } from 'react'
import { m } from 'framer-motion'
import cx from 'classnames'

import Date from '@lib/dateOrder'

const accordionAnim = {
  open: {
    opacity: 1,
    height: 'auto',
  },
  closed: {
    opacity: 0,
    height: 0,
  },
}

const Accordion = ({
  id,
  title,
  isOpen = false,
  isControlled = false,
  onToggle = () => {},
  className,
  children,
  content,
}) => {
  const [hasFocus, setHasFocus] = useState(isOpen)

  return (
    <div
      key={id}
      className={cx(
        'accordion overflow-hidden border-t border-[#D7D6D1]',
        className
      )}
    >
      {!isControlled && (
        <button
          onClick={() => onToggle(id, !isOpen)}
          aria-expanded={isOpen}
          aria-controls={`accordion-${id}`}
          className={cx(
            'gap-10 flex w-full items-start py-12 px-14 md:px-24 group justify-between',
            { 'is-open': isOpen }
          )}
        >
          <div className="accordion--title text-15 md:text-24 line-clamp-1">
            <span>{content?.title}</span>
          </div>
          <div className="text-ash">{Date(content?.date)}</div>
        </button>
      )}

      <m.div
        id={`accordion-${id}`}
        className=""
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
        onAnimationComplete={(v) => setHasFocus(v === 'open')}
      >
        <div
          className="grid-standard pl-15 pb-10"
          hidden={!isOpen && !hasFocus}
        >
          {children}
        </div>
      </m.div>
    </div>
  )
}

export default Accordion
