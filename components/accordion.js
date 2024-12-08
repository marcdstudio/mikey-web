import React, { useState } from 'react'
import { m } from 'framer-motion'
import cx from 'classnames'

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
}) => {
  const [hasFocus, setHasFocus] = useState(isOpen)

  return (
    <div key={id} className={cx('accordion overflow-hidden', className)}>
      {!isControlled && (
        <button
          onClick={() => onToggle(id, !isOpen)}
          aria-expanded={isOpen}
          aria-controls={`accordion-${id}`}
          className={cx('accordion--toggle is-dot gap-10 flex w-full items-start py-10 px-0 group', { 'is-open': isOpen })}
        >
          <div className='accordion--title'><span>{title}</span></div>
          <div className="uppercase text-slate text-8">
            {isOpen ? 'Close' : 'Expand'}
          </div>
        </button>
      )}

      <m.div
        id={`accordion-${id}`}
        className="accordion--content"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
        onAnimationComplete={(v) => setHasFocus(v === 'open')}
      >
        <div className="accordion--inner pl-15 pb-10" hidden={!isOpen && !hasFocus}>
          {children}
        </div>
      </m.div>
    </div>
  )
}

export default Accordion
