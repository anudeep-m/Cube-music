import React, { useEffect, useState } from 'react'
import { Dropdown, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPLtoPLA,
  addSongToPL,
  listPlayLists,
} from '../actions/playListActions'
import { addSongToQueue } from '../actions/queueListActions'
import Menuv from '../pictures/menu-v.png'

const AddToButton = ({ movieTitle, songName }) => {
  const dispatch = useDispatch()
  const [playListTitle, setPlayListTitle] = useState('')

  const getPlayLists = useSelector((state) => state.getPlayLists)
  const { playLists } = getPlayLists

  const addSongIntoPL = useSelector((state) => state.addSongIntoPL)
  const { success: successAdd } = addSongIntoPL

  useEffect(() => {
    dispatch(listPlayLists())
  }, [dispatch, successAdd])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addtoButtonhandler = (songName, playListTitle) => {
    dispatch(addSongToPL(movieTitle, songName, playListTitle))
  }

  const createPLHandler = () => {
    dispatch(addPLtoPLA(playListTitle))
    handleClose()
    dispatch(addSongToPL(movieTitle, songName, playListTitle))
  }

  const addtoQueueHandler = () => {
    dispatch(addSongToQueue(movieTitle, songName))
  }

  return (
    <>
      <OverlayTrigger
        key='top'
        placement='top'
        overlay={<Tooltip id={`tooltip-top`}>Add to</Tooltip>}
      >
        <Dropdown style={{ position: 'absolute' }}>
          <Dropdown.Toggle
            variant='link'
            style={{ color: '#fff' }}
            bsPrefix='p-0'
          >
            <img src={Menuv} alt='Icon' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as='button' onClick={handleShow}>
              Create new playlist
            </Dropdown.Item>
            <Dropdown.Item as='button' onClick={addtoQueueHandler}>
              Add to Queue
            </Dropdown.Item>
            {playLists.map((playList) => (
              <Dropdown.Item
                as='button'
                key={playList._id}
                onClick={() =>
                  addtoButtonhandler(songName, playList.playListTitle)
                }
              >
                {playList.playListTitle}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </OverlayTrigger>

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
          <div className='btn' onClick={handleClose}>
            Close
          </div>
          <div
            className='btn'
            onClick={() => {
              createPLHandler()
            }}
          >
            Save Changes
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddToButton
