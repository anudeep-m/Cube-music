import React, { useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToFav,
  detailsFavAlbum,
  removefromFav,
} from '../actions/favAlbumActions'

const LikeButton = ({ movieTitle, songName }) => {
  const dispatch = useDispatch()

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { favAlbum } = favAlbumDetails

  const addFav = useSelector((state) => state.addFav)
  const { success: successAdd } = addFav

  const removeFav = useSelector((state) => state.removeFav)
  const { success: successRemove } = removeFav

  let songExists

  favAlbum.favSongs.map((favSong) => {
    if (songName === favSong.songName) {
      songExists = true
    }
    return songExists
  })
  const [like, setLike] = useState(songExists)

  useEffect(() => {
    dispatch(detailsFavAlbum())
  }, [dispatch, successAdd, successRemove])

  const likeSongHandler = () => {
    if (songExists) {
      setLike(false)
      dispatch(removefromFav(songName))
    } else {
      setLike(true)
      dispatch(addToFav(movieTitle, songName))
    }
  }
  return (
    <OverlayTrigger
      key='top'
      placement='top'
      overlay={
        <Tooltip id={`tooltip-top`}>
          {like ? 'Remove from favourites' : 'Add to favourites'}
        </Tooltip>
      }
    >
      <div className='btn' onClick={() => likeSongHandler()}>
        {like ? (
          <i className='fas fa-thumbs-up'></i>
        ) : (
          <i className='far fa-thumbs-up'></i>
        )}
      </div>
    </OverlayTrigger>
  )
}

export default LikeButton
