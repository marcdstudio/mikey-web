import React, { useRef, useEffect, useState } from 'react'
import { useIntersection } from 'use-intersection'
import cx from 'classnames'

import Icon from '@components/icon'

const VideoControls = ({
  isPlaying = true,
  controls = false,
  hasSound,
  handleAudio,
  handlePlay,
}) => {
  return (
    <>
      {controls && (
        <div className="absolute z-3 right-32 bottom-32 flex gap-15 items-center text-cream transition-opacity duration-300 md:opacity-0 group-hover:opacity-100 text-white">
          <button
            className="flex w-[2rem] h-[2rem] px-0 items-center justify-center"
            onClick={() => handleAudio()}
          >
            {hasSound && (
              <span className="flex items-center justify-center w-[66.667%]">
                <Icon name="Unmuted" viewBox="0 0 305 429" />
              </span>
            )}
            {!hasSound && (
              <span className="flex items-center justify-center w-[100%]">
                <Icon name="Muted" viewBox="0 0 466 429" />
              </span>
            )}
          </button>
          <button
            className="w-[2rem] h-[2rem] px-0 flex items-center justify-center"
            onClick={() => handlePlay()}
          >
            {!isPlaying && (
              <span className="flex items-center justify-center h-full">
                <Icon name="Play Video" viewBox="0 0 372 429" />
              </span>
            )}
            {isPlaying && (
              <span className="flex items-center justify-center h-full">
                <Icon name="Pause Video" viewBox="0 0 330 429" />
              </span>
            )}
          </button>
        </div>
      )}
    </>
  )
}

const Video = ({
  src,
  className,
  poster,
  posterAspect,
  setAspect,
  layout,
  controls = false,
  autoplay = true,
  isSlide,
}) => {
  if (!src) return null

  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasSound, setHasSound] = useState(false)
  const isIntersecting = useIntersection(videoRef)

  const [slideAspect, setSlideAspect] = useState(posterAspect || 1)

  const handleVideoLoaded = () => {
    // Access the video's dimensions once it has loaded
    if (videoRef.current) {
      const videoElement = videoRef.current
      setSlideAspect(videoElement.videoWidth / videoElement.videoHeight)
      if (setAspect) {
        setAspect(videoElement.videoWidth / videoElement.videoHeight)
      }
    }
  }

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleAudio = () => {
    if (hasSound) {
      setHasSound(false)
    } else {
      setHasSound(true)
    }
  }

  useEffect(() => {
    if (isIntersecting) {
      videoRef.current.play().catch(() => {})
      setHasLoaded(true)
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isIntersecting])

  const [vimeoID, setVimeoID] = useState()

  useEffect(() => {
    if (!src.includes('/playback')) return
    // Use a regular expression to match the ID number
    const regex = /playback\/(\d+)\//
    const match = src?.match(regex)

    if (match) {
      const id = match[1]
      setVimeoID(id)
    } else {
      console.log('ID not found in the URL')
    }
  }, [])

  return isSlide ? (
    <div
      style={{
        '--slideRatio': slideAspect,
      }}
      className="carousel-slide group"
    >
      <VideoControls
        isPlaying={isPlaying}
        controls={controls}
        hasSound={hasSound}
        handleAudio={handleAudio}
        handlePlay={handlePlay}
      />
      <video
        onLoadedData={handleVideoLoaded}
        poster={poster || `https://vumbnail.com/${vimeoID}.jpg`}
        ref={videoRef}
        src={hasLoaded ? src : null}
        className={cx(
          className,
          { 'w-full h-[auto]': layout == 'intrinsic' },
          { 'h-full w-[auto]': layout == 'height' },
          {
            'w-full md:h-full md:object-cover md:absolute md:left-0 md:top-0 h-[auto]':
              layout == 'thumb',
          },
          {
            'h-full w-full object-cover absolute left-0 top-0':
              layout == 'fill',
          }
        )}
        autoPlay={autoplay}
        loop={autoplay}
        muted={hasSound ? true : autoplay || false}
        controls={!autoplay}
        playsInline
      ></video>
    </div>
  ) : (
    <div
      className={cx(
        className,
        'group',
        { 'w-full h-[auto]': layout == 'intrinsic' },
        { 'h-full w-[auto]': layout == 'height' },
        {
          'w-full md:h-full md:object-cover md:absolute md:left-0 md:top-0 h-[auto]':
            layout == 'thumb',
        },
        { 'h-full w-full object-cover absolute left-0 top-0': layout == 'fill' }
      )}
    >
      <VideoControls
        isPlaying={isPlaying}
        controls={controls}
        hasSound={hasSound}
        handleAudio={handleAudio}
        handlePlay={handlePlay}
      />
      <video
        onLoadedData={handleVideoLoaded}
        ref={videoRef}
        src={hasLoaded ? src : null}
        className={className || 'w-full'}
        autoPlay={autoplay}
        loop={autoplay}
        muted={!hasSound}
        controls={!autoplay}
        playsInline
        poster={poster || `https://vumbnail.com/${vimeoID}.jpg`}
      ></video>
    </div>
  )
}

export default Video
