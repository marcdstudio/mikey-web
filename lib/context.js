import { queries } from '@data'
import React, { createContext, useContext, useState } from 'react'

// Set our initial context states
const initialContext = {
  isPageTransition: false,
  sceneLoaded: false,
  isLoading: true,
}

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider = ({ children }) => {
  const [context, setContext] = useState(initialContext)

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

// Toggle page transition state
function useTogglePageTransition() {
  const {
    context: { isPageTransition },
    setContext,
  } = useContext(SiteContext)

  async function togglePageTransition(state) {
    setContext((prevState) => {
      return { ...prevState, isPageTransition: state }
    })
  }
  return togglePageTransition
}

// Toggle Mega Navigation states
function useSceneLoaded() {
  const {
    context: { sceneLoaded },
    setContext,
  } = useContext(SiteContext)

  async function toggleSceneLoaded(state) {
    setContext((prevState) => {
      return {
        ...prevState,
        sceneLoaded: state,
      }
    })
  }
  return toggleSceneLoaded
}

export {
  SiteContextProvider,
  useSiteContext,
  useTogglePageTransition,
  useSceneLoaded,
}
