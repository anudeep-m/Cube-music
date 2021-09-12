import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './loader'

const Album = ({ album }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/album/${album.movieTitle}`}>
        {!album.moviePoster ? (
          <Loader />
        ) : (
          <Card.Img src={album.moviePoster} varaint='top' />
        )}
      </Link>
    </Card>
  )
}

export default Album
