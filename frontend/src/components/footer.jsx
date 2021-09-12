import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Cube Music</Col>
        </Row>
      </Container>
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
