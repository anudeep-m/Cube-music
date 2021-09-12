import React, { useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsAlbum } from '../actions/albumactions'
import { detailsPlayList } from '../actions/playListActions'
import { addSongToQueue } from '../actions/queueListActions'

const AddToQueueButton = ({
  albumTitle,
  playListTitle,
  movieTitle,
  songName,
}) => {
  const dispatch = useDispatch()

  const albumDetails = useSelector((state) => state.albumDetails)
  const { album } = albumDetails

  const getPlayListDetails = useSelector((state) => state.getPlayListDetails)
  const { playList } = getPlayListDetails

  useEffect(() => {
    if (albumTitle) {
      dispatch(detailsAlbum(albumTitle))
    }
    if (playListTitle) {
      dispatch(detailsPlayList(playListTitle))
    }
  }, [dispatch, playListTitle, albumTitle])

  const addtoQueueHandler = () => {
    if (albumTitle) {
      album.songs.map((item) =>
        dispatch(addSongToQueue(item.movieTitle, item.songName))
      )
    }

    if (playListTitle) {
      playList.plSongs.map((item) =>
        dispatch(addSongToQueue(item.movieTitle, item.songName))
      )
    }
    if (songName) {
      dispatch(addSongToQueue(movieTitle, songName))
    }
  }

  return (
    <OverlayTrigger
      key='top'
      placement='top'
      overlay={<Tooltip id={`tooltip-top`}>Add to queue</Tooltip>}
    >
      <div className='btn' onClick={() => addtoQueueHandler()}>
        <i className='fas fa-plus'></i>
      </div>
    </OverlayTrigger>
  )
}

export default AddToQueueButton
