import React, { Suspense, useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { Perf } from 'r3f-perf'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

// import { useTexture } from '@react-three/drei'
import Studio from '@components/scene/studio'
import Chair from '@components/chair'
import Screen from '@components/scene/screen'

import { useWindowSize } from '@lib/helpers'

import Icon from '@components/icon'
import SectionHeader from '../sectionHeader'

const Scene = () => {
  //setup helpers
  const { width } = useWindowSize()
  const router = useRouter()
  const radian = 0.0174533

  //setup states
  const [settingsOpen, setSettingsOpen] = useState()
  const [isMobile, setIsMobile] = useState(width > 850 ? false : true)
  const [isLarge, setIsLarge] = useState(width > 1800 ? true : false)
  const [zoom, setZoom] = useState(isLarge ? 10 : isMobile ? 3 : 7)
  const [messages, setMessages] = useState([])
  const [canvasScale, setCanvasScale] = useState(1)

  //setup refs
  const interactions = []
  const messageRef = useRef()
  const cameraRef = useRef()
  const canvasRef = useRef()
  const chairLeftRef = useRef()
  const chairRightRef = useRef()

  useEffect(() => {
    if (width >= 1800) {
      if (!isLarge) {
        setIsLarge(true)
        setIsMobile(false)
      }
    } else if (width < 1800 && width >= 850) {
      if (isMobile || isLarge) {
        setIsLarge(false)
        setIsMobile(false)
      }
    } else {
      if (!isMobile) {
        setIsLarge(false)
        setIsMobile(true)
      }
    }
  }, [width])

  //setup click + drag handlers
  const handleDrag = (e) => {
    const slidePosition = width - e.x
    if (slidePosition >= 301 || slidePosition <= 10) return null
    setCanvasScale(canvasScale + e.movementX / 200)
  }

  const Message = ({ time, message, title }) => {
    return (
      <div className="w-full text-10 uppercase mt-10 message">
        <div className="text-slate uppercase text-9">{time}</div>
        <div className="mt-5">{title}</div>
        <div className="mt-5">{message}</div>
      </div>
    )
  }

  const handleMessage = (title, message, clear) => {
    if (clear) {
      setMessages([messages[0]])

      return null
    }

    const today = new Date()
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    interactions.push({ time: time, message: message, title: title })

    setMessages(
      messages.concat(
        <Message
          key={messages.length}
          time={time}
          title={title}
          message={message}
        />
      )
    )
  }

  //initial login
  useEffect(() => {
    handleMessage('Logged In', 'Click objects to explore >>', false)
  }, [])

  //create camera
  const Camera = (props) => {
    const { setDefaultCamera } = useThree()

    const set = useThree((state) => state.set)

    const camera = useRef()

    useEffect(() => {
      void set({ camera: camera.current })
      camera.current.rotation.order = 'YXZ'
      camera.current.lookAt(0, 15, 0)
    }, [setDefaultCamera])

    return (
      <OrthographicCamera
        ref={camera}
        position={[-80, 65, -50]}
        // onUpdate={(self) => self.updateProjectionMatrix()}
        {...props}
      />
    )
  }

  //create floor
  function Floor() {
    return (
      <mesh
        // receiveShadow
        castShadow={false}
        position={[0, 0, 0]}
        rotation={[Math.PI / -2, 0, 0]}
      >
        <planeGeometry
          // receiveShadow
          castShadow
          attach="geometry"
          args={[1000, 1000]}
        />
        <meshStandardMaterial
          attach="material"
          toneMapped={false}
          roughness={1}
          flatShading={true}
          color={0xffffff}
        />
      </mesh>
    )
  }
  //create shade
  function Shade() {
    return (
      <mesh
        // receiveShadow
        castShadow={false}
        position={[1, 0.1, 0]}
        rotation={[Math.PI / -2, 0, 0]}
      >
        <planeGeometry
          // receiveShadow
          castShadow={false}
          attach="geometry"
          args={[35, 100]}
        />
        <meshStandardMaterial
          attach="material"
          toneMapped={false}
          roughness={1}
          flatShading={true}
          color={0x6b6b6b}
        />
      </mesh>
    )
  }

  //create settings
  const [activeColor, setActiveColor] = useState('FFFFFF')
  const colors = [
    'FFFFFF',
    '7000FF',
    'BDFF00',
    'ED5EA0',
    'EBFF00',
    'FF8E00',
    '62F1CF',
  ]

  //setup render pause for mobile
  const DisableRender = () => useFrame(() => null, 1000)

  // return null
  return (
    <>
      <div className="w-screen h-screen fixed z-2 top-0 left-0">
        <div className="fixed z-4 left-10 top-70 font-mono w-full max-w-[20rem] overflow-visible whitespace-nowrap">
          <div className="flex items-start w-full">
            <h2 className="text-12 uppercase">History</h2>
            {messages?.length > 1 && (
              <button
                onClick={() => handleMessage(null, null, true)}
                className="bg-acid px-5 py-[.2rem] uppercase text-9 ml-5"
              >
                X Clear
              </button>
            )}
          </div>
          <div
            className="w-full flex flex-col-reverse message-container justify-end pointer-events-none h-[35vh] md:h-screen absolute top-15 left-0"
            ref={messageRef}
          >
            {messages}
          </div>
        </div>

        <Canvas
          ref={canvasRef}
          shadows={true}
          performance={{ min: 0.1 }}
          gl={{ antialias: false }}
          className="w-full cursor-pointer"
          style={{ transform: `scale(${canvasScale})` }}
        >
          {width < 850 &&
            (router.asPath == '/work' || router.asPath == '/info') && (
              <DisableRender />
            )}
          {/* <Perf/> */}
          <Studio message={handleMessage} />
          <Suspense fallback={null}>
            {/* Left Chair */}
            <Chair
              messageHandler={handleMessage}
              message={'We sit in these most of the day'}
              title={'You clicked a chair'}
              position={[-28, 0, -25]}
              positionX={-28}
              rotation={[0, -12 * radian, 0]}
            />
            {/* Right Chair */}
            <Chair
              messageHandler={handleMessage}
              message={'We sit in these most of the day'}
              title={'You clicked a chair'}
              position={[-30, 0, 25]}
              positionX={-30}
              rotation={[0, 40 * radian, 0]}
            />
            <Screen
              onClick={() =>
                handleMessage(
                  'You clicked a computer',
                  'We are working on a website'
                )
              }
              src={chairLeftRef}
              position={[-2.5, 43, -28]}
            />
            <Screen
              src={chairRightRef}
              position={[-2.5, 43.25, 20.5]}
              onClick={() =>
                handleMessage(
                  'You clicked a computer',
                  'We are working on an identity'
                )
              }
            />
          </Suspense>

          <Floor />
          <Shade />

          <ambientLight color={'white'} intensity={0.15} />
          {/* overhead light */}
          <spotLight
            intensity={2.5}
            castShadow={isMobile ? false : false}
            distance={0}
            angle={Math.PI / 12}
            penumbra={1}
            position={[-200, 2500, -200]}
          />

          {/* fill light */}
          <pointLight
            position={[-150, 10, 0]}
            color={`#${activeColor}`}
            intensity={0.7}
            castShadow={false}
          />

          <Camera
            makeDefault
            ref={cameraRef}
            zoom={isLarge ? 10 : isMobile ? 3 : 7}
          />
        </Canvas>
      </div>
      {/* studio setttings */}
      <div
        className={`studio-settings fixed bottom-10 right-10 z-6 hidden md:flex flex-col items-end justify-end transition-transform duration-300${
          router.pathname == '/' ? ' is-visible' : ''
        }`}
      >
        <div
          className={`studio-settings--content w-[30rem] ml-auto bg-frame backdrop-blur-frame shadow-primary transition-transform duration-300${
            settingsOpen ? ' is-open' : ''
          }`}
        >
          <div className="w-full p-10 uppercase text-12 text-center">
            Studio
          </div>
          <div className="w-full">
            <SectionHeader index={1} title={'zoom'} />
            <div className="px-10 py-30 relative w-full">
              <div className="w-full bg-white shadow-primaryInner h-5 relative">
                <div className="absolute w-full left-0 top-0">
                  <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{ x: 132, y: 0 }}
                    position={null}
                    grid={[1, 1]}
                    scale={1}
                    bounds={{ left: 0, right: 265 }}
                    onDrag={(e) => handleDrag(e)}
                  >
                    <div className="w-full relative">
                      <button className="w-10 handle px-0 -translate-y-1/2">
                        <Icon name="Slider" viewBox="0 0 8 22" />
                      </button>
                    </div>
                  </Draggable>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <SectionHeader index={2} title={'hue'} />
            <div className="px-10 py-20 w-full flex justify-between">
              {colors.map((color, key) => (
                <button
                  key={key}
                  onClick={() => setActiveColor(color)}
                  className={`w-15 h-15 rounded-full border flex items-center justify-center px-0${
                    activeColor == color ? ' border-black' : ' border-fog'
                  }`}
                >
                  <div
                    className="w-[.8rem] h-[.8rem] rounded-full"
                    style={{ background: '#' + color }}
                  ></div>
                </button>
              ))}
            </div>
          </div>
          {settingsOpen && (
            <div className="w-full">
              <SectionHeader index={3} title={'audio'} />
              <div className="w-full spotify">
                <iframe
                  src={`https://open.spotify.com/embed/playlist/366HUOYV2wFydL13biOEm4?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        {/* <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`w-35 h-35 p-10 bg-offwhite shadow-primary flex items-center justify-center mt-10 transition-transform duration-300`}
        >
          <Icon
            name={settingsOpen ? 'Close' : 'Settings'}
            viewBox={settingsOpen ? '0 0 22 22' : '0 0 15 15'}
          />
        </button> */}
      </div>
      {/* close zone */}
      {router.pathname !== '/' &&
        !router.pathname.includes('/capabilities/') && (
          <Link href="/" className="w-screen h-screen fixed z-2 left-0 top-0">
          </Link>
        )}
      {/* loader */}
      <div className="loader w-screen h-screen fixed z-2 left-0 top-0 bg-white transition-opacity duration-300 flex items-center justify-center">
        <div className="uppercase flex items-center">
          Loading Studio<span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
      {/* screen videos */}
      <video
        className="w-1 opacity-0 absolute"
        crossOrigin="Anonymous"
        ref={chairRightRef}
        autoPlay
        playsInline
        loop
        muted
        src="/videos/malu_screen_400.mp4"
      />
      <video
        className="w-1 opacity-0 absolute"
        crossOrigin="Anonymous"
        ref={chairLeftRef}
        autoPlay
        playsInline
        loop
        muted
        src="/videos/jake_screen_400.mp4"
        // src="/videos/jake_screen_sol_400.mp4"
      />
    </>
  )
}

export default Scene
