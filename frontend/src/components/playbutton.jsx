import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addSongToQueueImmediately } from '../actions/queueListActions'

const PlayButton = ({ movieTitle, songName }) => {
  const dispatch = useDispatch()

  const songplayHandler = () => {
    dispatch(addSongToQueueImmediately(movieTitle, songName))
  }

  return (
    <>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={<Tooltip id={`tooltip-top`}>Play now</Tooltip>}
      >
        <Button
          className='btn-secondary p-0'
          style={{ borderRadius: 50 }}
          onClick={songplayHandler}
        >
          <i className='fas fa-play-circle fa-1x m-1'></i>
        </Button>
      </OverlayTrigger>
    </>
  )
}

export default PlayButton
