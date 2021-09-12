import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Player from './player'

const PlayerBar = () => {
  const [currentSongIDX, setCurrentSongIDX] = useState(0)
  const [nextSongIDX, setNextSongIDX] = useState(currentSongIDX + 1)

  const queue = useSelector((state) => state.queue)
  const { queueList } = queue

  useEffect(() => {
    setNextSongIDX(() => {
      if (currentSongIDX + 1 > queueList.length - 1) {
        return 0
      } else {
        return currentSongIDX + 1
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIDX])

  return (
    <>
      <Navbar bg='dark' variant='dark' fixed='bottom' className='py-2 px-1'>
        <Container className='d-flex justify-content-between mx-1'>
          {queueList.length === 0 ? (
            <h5 className='p-2 text-center'>Queue is empty</h5>
          ) : queueList.length === 1 ? (
            <Player
              currentSongIDX={currentSongIDX}
              setCurrentSongIDX={setCurrentSongIDX}
            />
          ) : (
            <Player
              currentSongIDX={currentSongIDX}
              setCurrentSongIDX={setCurrentSongIDX}
              nextSongIDX={nextSongIDX}
            />
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default PlayerBar
