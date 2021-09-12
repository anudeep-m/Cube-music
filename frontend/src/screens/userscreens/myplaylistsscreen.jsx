import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Message from '../../components/message'
import SongPath from '../../components/songpath'
import { addPLtoPLA, listPlayLists } from '../../actions/playListActions'
import RemovePlayListFromPlayListAlbumButton from '../../components/removeplfromplabutton'
import AddToQueueButton from '../../components/addtoqueuebutton'

const PlayListsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPlayLists = useSelector((state) => state.getPlayLists)
  const { loading, error, playLists } = getPlayLists

  const removePLFromPLAlbum = useSelector((state) => state.removePLFromPLAlbum)
  const { success: successRemove } = removePLFromPLAlbum

  const addPLToPLAlbum = useSelector((state) => state.addPLToPLAlbum)
  const { success: successAdd } = addPLToPLAlbum

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(listPlayLists())
  }, [dispatch, history, userInfo, successRemove, successAdd])

  const [playListTitle, setPlayListTitle] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const createPLHandler = () => {
    dispatch(addPLtoPLA(playListTitle))
    handleClose()
  }

  return (
    <div className='my-5'>
      <SongPath Stage1='Home' Stage2='Playlists' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          <Button className='btn-secondary' onClick={handleShow}>
            <i className='fas fa-plus'> </i> Create a new playlist
          </Button>

          {playLists.length !== 0 && (
            <Table
              hover
              borderless
              responsive
              className='table-xl py-3 mb-5'
              style={{ fontSize: '1rem' }}
              variant='transparent'
            >
              <thead>
                <tr>
                  <th>Playlist</th>
                  <th>Songs</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {playLists.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Link
                        to={`/Playlists/${item.playListTitle}`}
                        className='linkname'
                      >
                        {item.playListTitle}
                      </Link>
                    </td>

                    <td>{item.plSongs.length}</td>
                    <td>
                      <RemovePlayListFromPlayListAlbumButton
                        playListTitle={item.playListTitle}
                      />
                    </td>
                    <td>
                      <AddToQueueButton playListTitle={item.playListTitle} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      )}
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
    </div>
  )
}

export default PlayListsScreen
