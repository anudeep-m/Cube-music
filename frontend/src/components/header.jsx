import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import Icon from '../pictures/CuBeMusicicon.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>
              {' '}
              <img
                alt='Icon'
                style={{ height: 40, width: 40 }}
                src={Icon}
              />{' '}
              CubeMusic
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto text-justify'>
              <LinkContainer to='/'>
                <Nav.Link>Explore</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/favourites'>
                <Nav.Link>Favourites</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/playlists'>
                <Nav.Link>Playlists</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/account'>
                    <NavDropdown.Item>Account</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Sign-out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>Sign-in</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/albumslist'>
                    <NavDropdown.Item>Albums</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
