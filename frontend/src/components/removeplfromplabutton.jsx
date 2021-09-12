import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removePLfromPLA } from '../actions/playListActions'

const RemovePlayListFromPlayListAlbumButton = ({ playListTitle }) => {
  const dispatch = useDispatch()

  const removePLHandler = () => {
    dispatch(removePLfromPLA(playListTitle))
  }

  return (
    <OverlayTrigger
      key='top'
      placement='top'
      overlay={<Tooltip id={`tooltip-top`}>Delete playlist</Tooltip>}
    >
      <div className='btn' onClick={() => removePLHandler()}>
        <i className='fas fa-trash'></i>
      </div>
    </OverlayTrigger>
  )
}

export default RemovePlayListFromPlayListAlbumButton
