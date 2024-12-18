import React, { useState, useCallback, useEffect } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import Media from '@components/media'
import BlockContent from '@components/block-content'

const Carousel = ({ data = {} }) => {
  const { media, caption } = data

  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const [sliderRef, slider] = useEmblaCarousel({
    loop: true,
    draggable: true,
    align: 'center',
  })

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

  return (
    <div className={`w-full h-full flex items-center justify-center relative`}>
      <div className="relative w-full h-full">
        <div
          ref={sliderRef}
          className="carousel--container w-full h-full relative overflow-hidden"
        >
          <div className="carousel--slides w-full h-full relative flex items-center select-none">
            {media.map((media, key) => (
              <div
                className={`w-full h-full min-w-full relative flex items-center justify-center`}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-[80%] h-[66%] relative">
                  <Media
                    className={'w-full h-full object-contain'}
                    width={1800}
                    layout={'contain'}
                    media={media?.content}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 flex gap-10 justify-end w-full p-24">
        {media.map((media, key) => (
          <button
            key={key}
            onClick={() => scrollTo(key)}
            className={`h-[4rem] w-[4rem] relative${
              currentSlide == key ? ' opacity-100' : ' opacity-15'
            }`}
          >
            <Media
              className={'h-full w-full absolute left-0 top-0 object-cover'}
              width={1800}
              layout={'fill'}
              media={media?.content}
            />
          </button>
        ))}
      </div>
      {caption && (
        <div className={`absolute bottom-36 left-24 media--caption`}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default Carousel
