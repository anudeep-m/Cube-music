import React, { useEffect } from 'react'
import { Image, ListGroup, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsSong } from '../../actions/albumactions'
import AddToButton from '../../components/addtobutton'
import LikeButton from '../../components/likebutton'
import Loader from '../../components/loader'
import Message from '../../components/message'
import PlayButton from '../../components/playbutton'
import SongPath from '../../components/songpath'

const SongScreen = ({ match }) => {
  const movieTitle = match.params.movieTitle
  const songName = match.params.songName

  const dispatch = useDispatch()

  const songDetails = useSelector((state) => state.songDetails)
  const { loading, error, song } = songDetails

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading: loadingFav, error: errorFav } = favAlbumDetails

  useEffect(() => {
    dispatch(detailsSong(movieTitle, songName))
  }, [dispatch, movieTitle, songName])

  return (
    <div className='my-5'>
      <SongPath Stage1='Home' Stage2={movieTitle} Stage3={songName} />
      {loading || loadingFav ? (
        <Loader />
      ) : error || errorFav ? (
        <Message>{error}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          <Col xs={10} sm={10} md={10} lg={3} className='text-left my-0'>
            <ListGroup variant='flush' className='py-3 mb-5'>
              <Image
                src={song.moviePoster}
                alt={song.movieTitle}
                fluid
                style={{ height: 275, width: 275 }}
              />
            </ListGroup>
          </Col>

          <Col className='text-left align-items-center mx-5 my-2'>
            <Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              style={{ lineHeight: 2, fontSize: '1.2rem' }}
            >
              <Col>
                <h2>{song.songName}</h2>
              </Col>
              <Col>
                Movie :{' '}
                <Link to={`/album/${song.movieTitle}`} className='linkname'>
                  {song.movieTitle}
                </Link>
              </Col>
              <Col>Singers : {song.singers}</Col>
              <Col>Duration: {song.duration}</Col>
              <Row className='my-2'>
                <Col xs='1'>
                  <PlayButton
                    movieTitle={song.movieTitle}
                    songName={song.songName}
                  />
                </Col>
                <Col xs='1'>
                  <LikeButton
                    movieTitle={song.movieTitle}
                    songName={song.songName}
                  />
                </Col>
                <Col xs='1'>
                  <AddToButton
                    movieTitle={song.movieTitle}
                    songName={song.songName}
                  />
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default SongScreen
