import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { detailsAlbumFA, songAdd, songDelete } from '../../actions/albumactions'
import Loader from '../../components/loader'
import Message from '../../components/message'
import {
  SONG_ADD_RESET,
  SONG_DELETE_RESET,
  SONG_EDIT_RESET,
} from '../../constants/constants'

const SongsList = ({ history, albumSent }) => {
  const dispatch = useDispatch()

  const [album, setAlbum] = useState(albumSent)

  const albumDetailsFA = useSelector((state) => state.albumDetailsFA)
  const { loading, error, album: albumUpdated } = albumDetailsFA

  const addSong = useSelector((state) => state.addSong)
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    song: songAdded,
  } = addSong

  const deleteSong = useSelector((state) => state.deleteSong)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteSong

  const editSong = useSelector((state) => state.editSong)
  const { loading: loadingSongEdit, success: successSongEdit } = editSong

  useEffect(() => {
    if (successAdd) {
      dispatch({ type: SONG_ADD_RESET })
      dispatch(detailsAlbumFA(album._id))
      setAlbum(albumUpdated)
      history.push(`/admin/album/${album._id}/${songAdded._id}/edit`)
    }
    if (successDelete) {
      dispatch({ type: SONG_DELETE_RESET })
      dispatch(detailsAlbumFA(album._id))
      setAlbum(albumUpdated)
    }
    if (successSongEdit) {
      dispatch({ type: SONG_EDIT_RESET })
      dispatch(detailsAlbumFA(album._id))
      setAlbum(albumUpdated)
    }
  }, [
    dispatch,
    history,
    successAdd,
    songAdded,
    album,
    successDelete,
    albumUpdated,
    successSongEdit,
  ])

  const addSongHandler = (movieId) => {
    dispatch(songAdd(movieId))
  }

  const deleteSongHandler = (movieId, songId) => {
    if (window.confirm('Are you sure? ')) {
      dispatch(songDelete(movieId, songId))
    }
  }

  return (
    <>
      <h4 className='text-center'>Songs</h4>
      <div className='d-flex justify-content-end p-0'>
        <Button className='my-1' onClick={() => addSongHandler(album._id)}>
          <i className='fas fa-plus'></i>
          {'  '}Add Song
        </Button>
      </div>

      {errorAdd && <Message>{errorAdd}</Message>}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loading || loadingDelete || loadingAdd || loadingSongEdit ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table
          striped
          hover
          bordered
          responsive
          className='table-sm text-center'
        >
          <thead style={{ color: 'orange' }}>
            <tr>
              <th>SONG ID</th>
              <th>SONG NAME</th>
              <th>SINGERS</th>
              <th>DURATION</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {album.songs.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>
                  <Link
                    to={`/album/${item.movieTitle}/${item.songName}`}
                    className='text-decoration-none'
                  >
                    {item.songName}
                  </Link>
                </td>
                <td>{item.singers}</td>
                <td>{item.duration}</td>

                <td>
                  <LinkContainer
                    to={`/admin/album/${album._id}/${item._id}/edit`}
                  >
                    <Button className='btn-sm mx-1'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm mx-1'
                    variant='danger'
                    onClick={() => deleteSongHandler(album._id, item._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default SongsList
