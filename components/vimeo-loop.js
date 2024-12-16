import React, { useRef, useState, useEffect } from 'react'
import { useIntersection } from 'use-intersection'
import cx from 'classnames'
import { AnimatePresence, m } from 'framer-motion'

import axios from 'axios';

const variants = {
  exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
}

const VideoLoop = ({
  title,
  id,
  width = 1440,
  height = 900,
  className,
  contain,
  poster,
  ...rest
}) => {
  if (!id) return null

  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const isIntersecting = useIntersection(videoRef)

  const [vimeoID, setVimeoID] = useState()
  const [thumbnailUrl, setThumbnailUrl] = useState(poster);
  

  useEffect(() => {
    if (!id.includes('/playback')) return
    // Use a regular expression to match the ID number
    const regex = /playback\/(\d+)\//
    const match = id?.match(regex)

    if (match) {
      const vimeoID = match[1]
      setVimeoID(vimeoID)
    } else {
      console.log('ID not found in the URL')
    }
  }, [id])

  useEffect(() => {
    if (vimeoID) {
      axios
        .post('/api/vimeo/vimeo-thumbnail', { videoId: vimeoID })
        .then((response) => {
          if (response.data.thumbnailUrl) {
            setThumbnailUrl(response.data.thumbnailUrl);
          }
        })
        .catch((error) => {
          console.error('Error fetching Vimeo thumbnail:', error.message);
          if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
          }
        });
    }
  }, [vimeoID]);

  useEffect(() => {
    if (isIntersecting) {
      videoRef.current.play().catch(() => {})
      setHasLoaded(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isIntersecting])

  return (
    <div className={cx('video-loop', className)} {...rest}>
      <video
        poster={thumbnailUrl || poster}
        ref={videoRef}
        src={hasLoaded ? id : null}
        className={`w-full h-full${
          contain ? ' object-contain' : ' object-cover absolute top-0 left-0'
        }`}
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline
      ></video>
    </div>
  )
}

export default VideoLoop
