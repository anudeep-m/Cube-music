import React, { useEffect } from 'react'
import { Image, ListGroup, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsAlbum } from '../../actions/albumactions'
import Loader from '../../components/loader'
import Message from '../../components/message'
import SongPath from '../../components/songpath'
import PlayButton from '../../components/playbutton'
import LikeButton from '../../components/likebutton'
import AddToButton from '../../components/addtobutton'
import AddToQueueButton from '../../components/addtoqueuebutton'

const AlbumScreen = ({ match }) => {
  const movieTitle = match.params.movieTitle

  const dispatch = useDispatch()

  const albumDetails = useSelector((state) => state.albumDetails)
  const { loading, error, album } = albumDetails

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading: loadingFav, error: errorFav } = favAlbumDetails

  useEffect(() => {
    dispatch(detailsAlbum(movieTitle))
  }, [dispatch, movieTitle])

  return (
    <div className='my-5'>
      <SongPath Stage1='Home' Stage2={movieTitle} />

      <Row className='d-flex justify-content-center' sm='12'>
        <Col sm='10'>
          <h3 className='text-center'>{movieTitle}</h3>
        </Col>
        <Col sm='1'>
          <AddToQueueButton albumTitle={movieTitle} />
        </Col>
      </Row>

      {loading || loadingFav ? (
        <Loader />
      ) : error || errorFav ? (
        <Message>{error}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          <Col xs={10} sm={10} md={10} lg={3} className='text-left my-0'>
            <ListGroup variant='flush' className='py-3 mb-5'>
              <Image
                src={album.moviePoster}
                alt={album.movieTitle}
                fluid
                style={{ height: 275, width: 275 }}
              />
            </ListGroup>
          </Col>

          <Col
            xs={10}
            sm={10}
            md={10}
            lg={9}
            className='text-left align-items-center my-auto'
          >
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
                  <th>Singers</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {album.songs.map((item) => (
                  <tr key={item._id}>
                    <td className='text-center'>
                      <PlayButton
                        movieTitle={item.movieTitle}
                        songName={item.songName}
                      />
                    </td>
                    <td>
                      <Link
                        to={`/album/${album.movieTitle}/${item.songName}`}
                        className='linkname'
                        style={{ fontSize: '1rem' }}
                      >
                        {item.songName}
                      </Link>
                    </td>
                    <td>{item.singers}</td>
                    <td>
                      <LikeButton
                        movieTitle={item.movieTitle}
                        songName={item.songName}
                      />
                    </td>
                    <td>
                      <AddToButton
                        movieTitle={item.movieTitle}
                        songName={item.songName}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default AlbumScreen
