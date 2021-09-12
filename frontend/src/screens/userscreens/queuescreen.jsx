import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Message from '../../components/message'
import PlayButton from '../../components/playbutton'
import LikeButton from '../../components/likebutton'
import { removeSongFromQueue } from '../../actions/queueListActions'
import { addPLtoPLA, addSongToPL } from '../../actions/playListActions'

const QueueScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading: loadingFav, error: errorFav } = favAlbumDetails

  const queue = useSelector((state) => state.queue)
  const { queueList } = queue

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const removeFromQueueHandler = (songName) => {
    dispatch(removeSongFromQueue(songName))
  }

  const [playListTitle, setPlayListTitle] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const createPLHandler = () => {
    dispatch(addPLtoPLA(playListTitle))

    handleClose()
    queueList.map((item) => dispatch(addSongToPL(item.songName, playListTitle)))
  }

  return (
    <div className='my-5'>
      <Row className='d-flex justify-content-center'>
        <Col className='text-center'>
          <h4 className='text-center'>Queue</h4>
        </Col>
        <Col className='text-right'>
          <Button className='btn-secondary' onClick={handleShow}>
            <i className='fas fa-plus'> </i> Save as playlist
          </Button>
        </Col>
      </Row>

      {loadingFav ? (
        <Loader />
      ) : errorFav ? (
        <Message>{errorFav}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          {queueList.length === 0 ? (
            <Message variant='info'>Queue is empty</Message>
          ) : (
            <>
              <Table
                hover
                borderless
                responsive
                className='table-xl py-3 mb-5'
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
                  {queueList.map((item) => (
                    <tr key={item._id}>
                      <td className='text-center'>
                        <PlayButton
                          movieTitle={item.movieTitle}
                          songName={item.songName}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/album/Favourites/${item.songName}`}
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
                        <LikeButton
                          movieTitle={item.movieTitle}
                          songName={item.songName}
                        />
                      </td>
                      <td>
                        <OverlayTrigger
                          key='top'
                          placement='top'
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              Remove from queue
                            </Tooltip>
                          }
                        >
                          <Button
                            variant='secondary'
                            onClick={() =>
                              removeFromQueueHandler(item.songName)
                            }
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                  <Modal.Title>Create new playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='playListTitle'>
                      <Form.Label>Playlist name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter playlist name'
                        value={playListTitle}
                        style={{
                          color: 'rgba(0, 255, 255, 0.76)',
                          borderColor: 'rgba(0, 255, 255, 0.76)',
                        }}
                        onChange={(e) => setPlayListTitle(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => {
                      createPLHandler()
                    }}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Row>
      )}
    </div>
  )
}

export default QueueScreen
