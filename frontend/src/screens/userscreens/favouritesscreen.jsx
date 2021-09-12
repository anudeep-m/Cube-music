import React, { useEffect } from 'react'
import { Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Message from '../../components/message'
import SongPath from '../../components/songpath'
import PlayButton from '../../components/playbutton'
import { detailsFavAlbum } from '../../actions/favAlbumActions'
import LikeButton from '../../components/likebutton'
import AddToButton from '../../components/addtobutton'

const FavouritesScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading, error, favAlbum } = favAlbumDetails

  const removeFav = useSelector((state) => state.removeFav)
  const { success: successRemove } = removeFav

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(detailsFavAlbum())
  }, [dispatch, history, userInfo, successRemove])

  return (
    <div className='my-5'>
      <SongPath Stage1='Home' Stage2='Favourites' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          {favAlbum.favSongs.length === 0 ? (
            <Message variant='info'>No favourite songs</Message>
          ) : (
            <Table
              hover
              borderless
              responsive
              className='table-xl py-3 mb-5'
              style={{ fontSize: '0.9rem' }}
              variant='transparent'
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Song</th>
                  <th>Movie</th>
                  <th>Singers</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {favAlbum.favSongs.map((item) => (
                  <tr key={item._id}>
                    <td className='text-center'>
                      <PlayButton songName={item.songName} />
                    </td>
                    <td>
                      <Link
                        to={`/album/${item.movieTitle}/${item.songName}`}
                        className='linkname'
                      >
                        {item.songName}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/album/${item.movieTitle}`}
                        className='linkname'
                      >
                        {item.movieTitle}
                      </Link>
                    </td>
                    <td>{item.singers}</td>
                    <td>
                      <LikeButton songName={item.songName} />
                    </td>
                    <td>
                      <AddToButton songName={item.songName} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      )}
    </div>
  )
}

export default FavouritesScreen
