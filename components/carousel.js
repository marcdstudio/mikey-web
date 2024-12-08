import React, { useState, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import cx from 'classnames'

import Icon from '@components/icon'
import Photo from '@components/photo'

const Carousel = ({
  id,
  slides,
  hasArrows,
  hasDrag = true,
  className,
  title,
  children,
  showCaption,
  activeSlide,
  containImage,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const [sliderRef, slider] = useEmblaCarousel({
    loop: true,
    draggable: hasDrag,
    align: 'center',
  })


  const [scrollRef, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const scrollPrev = useCallback(() => slider?.scrollPrev(), [slider])
  const scrollNext = useCallback(() => slider?.scrollNext(), [slider])
  const scrollTo = useCallback((index) => slider?.scrollTo(index), [slider])

  const onSelect = useCallback(() => {
    setCurrentSlide(slider.selectedScrollSnap())
  }, [slider])

  useEffect(() => {
    if (slider) {
      setScrollSnaps(slider.scrollSnapList())
      slider.on('select', onSelect)
      onSelect()
    }
  }, [slider])

  useEffect(() => {
    scrollTo(activeSlide)
  }, [activeSlide])

  return (
    <div
      ref={scrollRef}
      className={cx(
        'carousel relative w-full overflow-hidden',
        { 'has-drag': hasDrag },
        { 'has-title': slides[0]?.title },
        className
      )}
    >
      {slider && scrollSnaps.length > 1 && (
        <div className="">
          {hasArrows && (
            <button
              onClick={scrollPrev}
              className="btn-arrow is-prev"
              aria-label="Previous slide"
            >
              <Icon name="Arrow" id={`prev-${id}`} />
            </button>
          )}

          {hasArrows && (
            <button
              onClick={scrollNext}
              className="btn-arrow is-next"
              aria-label="Next slide"
            >
              <Icon name="Arrow" id={`next-${id}`} />
            </button>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        className="carousel--container w-full relative overflow-y-visible"
      >
        <div className="carousel--slides w-full relative flex items-center select-none">
          {slides.map((slide, key) => (
            <div
              className={`relative carousel-slide${
                slider?.selectedScrollSnap() == key ? ' is-active' : ''
              }`}
              key={key}
              href={slide.url ? slide.url : null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{
                  duration: 1,
                  delay: key == slides.length - 1 ? 0.1 : (key + 2) / 10,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full relative"
              >
                <div className="w-full relative carousel-slide--inner">
                  <div className="w-full relative carousel-image overflow-hidden">
                    <Photo
                      key={key}
                      width={1600}
                      srcSizes={[600, 800, 1200, 1600]}
                      sizes="100%"
                      layout={containImage ? 'contain' : 'fill'}
                      photo={slide.alt ? slide : slide.image}
                      className="w-full h-full object-cover top-0 left-0 absolute"
                    />
                  </div>
                  {showCaption && (
                    <div className="w-full text-center md:mt-15">
                      <div className="w-full md:max-w-[50rem] font-gar text-center mx-auto">
                        {slide.alt}
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
