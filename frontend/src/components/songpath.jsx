import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const SongPath = ({ Stage1, Stage2, Stage3 }) => {
  return (
    <Nav className='justify-content-left align-items-center mx-auto '>
      {Stage1 && (
        <Nav.Item>
          <LinkContainer to='/'>
            <Nav.Link className='p-0'>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}

      {Stage2 && <i className='fas fa-caret-right p-2 my-2'></i>}

      {Stage2 &&
        (Stage2 === 'Favourites' || Stage2 === 'Playlists' ? (
          <Nav.Item>
            <LinkContainer to={`/${Stage2}`}>
              <Nav.Link className='p-0'>{Stage2}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <LinkContainer to={`/album/${Stage2}`}>
              <Nav.Link className='p-0'>{Stage2}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ))}

      {Stage3 && <i className='fas fa-caret-right p-2 my-2'></i>}
      {Stage3 && (
        <Nav.Item>
          <LinkContainer to={`/album/${Stage2}/${Stage3}`}>
            <Nav.Link className='p-0'>{Stage3}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
    </Nav>
  )
}

export default SongPath
