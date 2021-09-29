import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Row className='text-center d-flex justify-content-around py-3' xs='12'>
        <Col xs='12' md='4'>
          {' '}
        </Col>
        <Col xs='12' md='4'>
          Copyright &copy; Cube Music
        </Col>
        <Col xs='12' md='4'>
          {' '}
          <Image
            src='/pictures/codedby.png'
            alt='owner'
            height='20'
            width='20'
            className='mx-1'
          />{' '}
          <a
            href='https://anudeep-m.netlify.app'
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            by Anudeep
          </a>
        </Col>
      </Row>
    </footer>
  )
}

const BottomPadder = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='py-5'></Col>
        </Row>
      </Container>
    </footer>
  )
}

export { Footer, BottomPadder }
