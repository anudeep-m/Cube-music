import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeSongFromPL } from '../actions/playListActions'

const RemoveSongFromPlayListButton = ({ songName, playListTitle }) => {
  const dispatch = useDispatch()

  const removeSongHandler = () => {
    dispatch(removeSongFromPL(songName, playListTitle))
  }

  return (
    <OverlayTrigger
      key='top'
      placement='top'
      overlay={<Tooltip id={`tooltip-top`}>Delete song from playlist</Tooltip>}
    >
      <div className='btn' onClick={() => removeSongHandler()}>
        <i className='fas fa-minus-circle'></i>
      </div>
    </OverlayTrigger>
  )
}

export default RemoveSongFromPlayListButton
