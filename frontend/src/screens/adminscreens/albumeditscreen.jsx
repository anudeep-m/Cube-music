import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Message from '../../components/message'
import { albumEdit, detailsAlbumFA } from '../../actions/albumactions'
import { ALBUM_EDIT_RESET } from '../../constants/constants'
import SongsList from './songlistcomponent'
import axios from 'axios'

const AlbumEditScreen = ({ history, match }) => {
  const movieId = match.params.movieId

  const [movieTitle, setMovieTitle] = useState('')
  const [moviePoster, setMoviePoster] = useState('')
  const [uploading, setUploading] = useState('')

  const dispatch = useDispatch()

  const albumDetailsFA = useSelector((state) => state.albumDetailsFA)
  const { loading, error, album } = albumDetailsFA

  const editAlbum = useSelector((state) => state.editAlbum)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = editAlbum

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: ALBUM_EDIT_RESET })
      dispatch(detailsAlbumFA(movieId))
    } else {
      if (album._id !== movieId) {
        dispatch(detailsAlbumFA(movieId))
      } else {
        setMovieTitle(album.movieTitle)
        setMoviePoster(album.moviePoster)
      }
    }
  }, [dispatch, movieId, album, successEdit])

  const addUnderScore = (movieTitle) => {
    const titleWords = movieTitle.split(' ')
    let updatedMT = ''

    for (let i = 0; i < titleWords.length; i++) {
      updatedMT += '_' + titleWords[i]
    }

    return updatedMT.slice(1)
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading('true')

    try {
      const config = {
        headers: {
          'Content-Type': 'multiform/form-data',
        },
      }
      const mt = addUnderScore(movieTitle)
      const { data } = await axios.post(
        `/api/upload/${mt}/moviePoster`,
        formData,
        config
      )
      setMoviePoster(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(albumEdit(movieId, movieTitle, moviePoster))
  }

  return (
    <>
      <h3 className='text-center'>Edit Album</h3>
      <Link to='/admin/albumslist'>
        <Button>Go Back</Button>
      </Link>
      {errorEdit && <Message>{errorEdit}</Message>}
      {loading || loadingEdit ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Col className='my-4'>
            <Col>
              <Row>
                <Col className='text-center'>
                  <Col>
                    <h3 className='text-center'>{movieTitle}</h3>
                  </Col>

                  <Col>
                    {!moviePoster ? (
                      <Loader />
                    ) : (
                      <Image
                        src={moviePoster}
                        width='200'
                        height='200'
                        rounded
                      />
                    )}
                  </Col>
                </Col>
                <Col>
                  <Form onSubmit={submitHandler} className='d-flex flex-column'>
                    <Form.Group controlId='movieTitle' className='my-2'>
                      <Form.Label className='mx-2'>Movie Title</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Movie Title'
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                        style={{
                          color: 'rgba(0, 255, 255, 0.76)',
                          borderColor: 'rgba(0, 255, 255, 0.76)',
                        }}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='moviePoster' className='my-2'>
                      <Form.Label className='mx-2'>Movie Poster</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control
                            type='text'
                            placeholder='Enter Movie Poster'
                            value={moviePoster}
                            onChange={(e) => setMoviePoster(e.target.value)}
                            style={{
                              color: 'rgba(0, 255, 255, 0.76)',
                              borderColor: 'rgba(0, 255, 255, 0.76)',
                            }}
                          ></Form.Control>
                        </Col>

                        <Col>
                          <Form.File
                            id='image-file'
                            custom
                            onChange={uploadFileHandler}
                          >
                            {uploading && <Loader />}
                          </Form.File>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button
                      type='submit'
                      variant='primary'
                      className='my-2 mx-auto'
                    >
                      Update
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Col>

            <Col className='my-4 py-4 border-top'>
              <SongsList history={history} albumSent={album} />
            </Col>
          </Col>
        </>
      )}
    </>
  )
}

export default AlbumEditScreen
