import React, { useEffect, useRef } from 'react'

const KeyPadEvents = ({ isPlaying, setIsPlaying }) => {
  const useKey = (key, cb) => {
    const callBackRef = useRef(cb)

    useEffect(() => {
      callBackRef.current = cb
    })

    useEffect(() => {
      const handle = (event) => {
        if (event.code === key) {
          callBackRef.current(event)
        }
      }
      document.addEventListener('keypress', handle)
      return () => document.removeEventListener('keypress', handle)
    }, [key])
  }
  const handleSpacebarEvent = () => {
    setIsPlaying(!isPlaying)
  }
  // const fifteenBackEvent = () => {
  //   backFifteen()
  // }
  // const fifteenFrontEvent = () => {
  //   frontFifteen()
  // }

  useKey('Space', handleSpacebarEvent)
  useKey('KeyP', handleSpacebarEvent)
  // useKey('KeyB', fifteenBackEvent)
  // useKey('KeyN', fifteenFrontEvent)
  // useKey('Numpad4', fifteenBackEvent)
  // useKey('Numpad6', fifteenFrontEvent)

  return <></>
}

export default KeyPadEvents
