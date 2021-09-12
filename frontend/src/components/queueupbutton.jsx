import React, { useState } from 'react'
import { Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/loader'
import Message from '../components/message'
import PlayButton from '../components/playbutton'
import LikeButton from '../components/likebutton'
import { useDispatch, useSelector } from 'react-redux'
import { removeSongFromQueue } from '../actions/queueListActions'

const QueueUpButton = () => {
  const dispatch = useDispatch()
  const removeFromQueueHandler = (songName) => {
    dispatch(removeSongFromQueue(songName))
  }

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading: loadingFav, error: errorFav } = favAlbumDetails

  const [show, setShow] = useState(false)

  const queue = useSelector((state) => state.queue)
  const { queueList } = queue

  return (
    <>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={<Tooltip id={`tooltip-top`}>Queue</Tooltip>}
      >
        <div className='btn' onClick={() => setShow(true)}>
          <i className='fas fa-chevron-up'></i>
        </div>
      </OverlayTrigger>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size='xl'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title id='example-custom-modal-styling-title'>
            <h4 className='text-center'>Queue</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='my-5'>
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
                          <tr key={item.songName}>
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
                                <div
                                  className='btn'
                                  onClick={() =>
                                    removeFromQueueHandler(item.songName)
                                  }
                                >
                                  <i className='fas fa-minus-circle'></i>
                                </div>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Row>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default QueueUpButton
