import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Album from '../../components/album'
import { listAlbums } from '../../actions/albumactions'
import Loader from '../../components/loader'
import Message from '../../components/message'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const albumList = useSelector((state) => state.albumList)
  const { loading, error, albums } = albumList

  useEffect(() => {
    dispatch(listAlbums())
  }, [dispatch])

  return (
    <>
      <h4 className='text-center'>ALBUMS</h4>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className='d-flex justify-content-around'>
          {albums.map((album) => (
            <Col key={album._id} xs='10' sm='8' md='5' lg='4' xl='3'>
              <Album album={album} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
