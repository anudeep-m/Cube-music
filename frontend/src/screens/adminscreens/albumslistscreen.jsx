import React, { useEffect } from 'react'
import { Table, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { albumAdd, albumDelete, listAlbums } from '../../actions/albumactions'
import { Link } from 'react-router-dom'
import { ALBUM_ADD_RESET } from '../../constants/constants'

const AlbumListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const albumList = useSelector((state) => state.albumList)
  const { loading, error, albums } = albumList

  const addAlbum = useSelector((state) => state.addAlbum)
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    album: albumAdded,
  } = addAlbum

  const deleteAlbum = useSelector((state) => state.deleteAlbum)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteAlbum

  useEffect(() => {
    dispatch({ type: ALBUM_ADD_RESET })
    dispatch(listAlbums())
    if (successAdd) {
      history.push(`/admin/album/${albumAdded._id}/edit`)
    }
  }, [dispatch, history, successAdd, successDelete, albumAdded])

  const addAlbumHandler = () => {
    dispatch(albumAdd())
  }

  const deleteAlbumHandler = (movieId) => {
    if (window.confirm('Are you sure? ')) {
      dispatch(albumDelete(movieId))
    }
  }
  return (
    <>
      <h2 className='py-2 text-center'>Albums</h2>
      <div className='d-flex justify-content-end p-0'>
        <Button className='my-1' onClick={addAlbumHandler}>
          <i className='fas fa-plus'></i>
          {'  '}Add Album
        </Button>
      </div>
      {loadingAdd && <Loader />}
      {errorAdd && <Message>{errorAdd}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loading ? (
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
              <th>ALBUM ID</th>
              <th>ALBUM POSTER</th>
              <th>ALBUM NAME</th>
              <th>SONGS</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {albums.map((album) => (
              <tr key={album._id}>
                <td>{album._id}</td>
                <td>
                  <Image src={album.moviePoster} width='60' height='60' />
                </td>
                <td>
                  <Link
                    to={`/album/${album.movieTitle}`}
                    className='text-decoration-none'
                  >
                    {album.movieTitle}
                  </Link>
                </td>
                <td>{album.songs.length}</td>

                <td>
                  <LinkContainer to={`/admin/album/${album._id}/edit`}>
                    <Button className='btn-sm mx-1'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm mx-1'
                    variant='danger'
                    onClick={() => deleteAlbumHandler(album._id)}
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

export default AlbumListScreen
