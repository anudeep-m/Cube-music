import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { songEdit, detailsSongFA } from '../../actions/albumactions'
import Loader from '../../components/loader'
import Message from '../../components/message'
import { SONG_EDIT_RESET } from '../../constants/constants'
import axios from 'axios'

const SongEditScreen = ({ match }) => {
  const movieId = match.params.movieId
  const songId = match.params.songId

  const [songName, setSongName] = useState('')
  const [songFile, setSongFile] = useState('')
  const [singers, setSingers] = useState('')
  const [duration, setDuration] = useState('')
  const [uploading, setUploading] = useState('')

  const dispatch = useDispatch()

  const songDetailsFA = useSelector((state) => state.songDetailsFA)
  const { loading, error, song } = songDetailsFA

  const editSong = useSelector((state) => state.editSong)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = editSong

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: SONG_EDIT_RESET })
      dispatch(detailsSongFA(movieId, songId))
    } else {
      if (!song || !song.songName || song._id !== songId) {
        dispatch(detailsSongFA(movieId, songId))
      } else {
        setSongName(song.songName)
        setSongFile(song.songFile)
        setSingers(song.singers)
        setDuration(song.duration)
      }
    }
  }, [dispatch, movieId, songId, song, successEdit])

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
    formData.append('audio/mp3', file)
    setUploading('true')

    try {
      const config = {
        headers: {
          'Content-Type': 'multiform/form-data',
        },
      }
      const mt = addUnderScore(song.movieTitle)
      const sn = addUnderScore(songName)

      const { data } = await axios.post(
        `${REACT_APP_SERVER_URL}/api/upload/${mt}/${sn}/songFile`,
        formData,
        config
      )
      setSongFile(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(songEdit(movieId, songId, songName, songFile, singers, duration))
  }

  return (
    <>
      <h3 className='text-center'>Edit Song</h3>
      <Link to={`/admin/album/${movieId}/edit`}>
        <Button>Go Back</Button>
      </Link>
      {loadingEdit && <Loader />}
      {errorEdit && <Message>{errorEdit}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row className='my-3'>
            <Col className='text-center'>
              <Col className='my-3'>
                <h3>{songName}</h3>
              </Col>
              <Col className='d-flex align-items-center justify-content-center my-3'>
                {!song.moviePoster ? (
                  <Loader />
                ) : (
                  <Image
                    src={song.moviePoster}
                    width='200'
                    height='200'
                    rounded
                  />
                )}
              </Col>
            </Col>
            <Col>
              <Form onSubmit={submitHandler} className='d-flex flex-column'>
                <Form.Group controlId='songName' className='mb-2'>
                  <Form.Label className='mx-2'>Song Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Song Name'
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    style={{
                      color: 'rgba(0, 255, 255, 0.76)',
                      borderColor: 'rgba(0, 255, 255, 0.76)',
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='songFile' className='my-2'>
                  <Form.Label className='mx-2'>Song File</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type='text'
                        placeholder='Enter Song File Path'
                        value={songFile}
                        onChange={(e) => setSongFile(e.target.value)}
                        style={{
                          color: 'rgba(0, 255, 255, 0.76)',
                          borderColor: 'rgba(0, 255, 255, 0.76)',
                        }}
                      ></Form.Control>
                    </Col>

                    <Col>
                      <Form.File
                        id='audio/mp3-file'
                        custom
                        onChange={uploadFileHandler}
                      >
                        {uploading && <Loader />}
                      </Form.File>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId='singers' className='my-2'>
                  <Form.Label className='mx-2'>Singers</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Singers names'
                    value={singers}
                    onChange={(e) => setSingers(e.target.value)}
                    style={{
                      color: 'rgba(0, 255, 255, 0.76)',
                      borderColor: 'rgba(0, 255, 255, 0.76)',
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='duration' className='my-2'>
                  <Form.Label className='mx-2'>Duration</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter duration of song'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{
                      color: 'rgba(0, 255, 255, 0.76)',
                      borderColor: 'rgba(0, 255, 255, 0.76)',
                    }}
                  ></Form.Control>
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
        </>
      )}
    </>
  )
}

export default SongEditScreen
