import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { loginUser } from '../../actions/userActions'
import FormContainer from '../../components/formcontainer'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <FormContainer>
      <h2 className='text-center py-3'>Sign In</h2>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <Form onSubmit={submitHandler} className='d-flex flex-column'>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label className='mx-2'>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.76)',
            }}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className='mx-2'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.596)',
            }}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varaint='primary' className='my-4'>
          Sign In
        </Button>
      </Form>

      <Row className='text-center my-2'>
        <Col>
          New User? ~{' '}
          <Link to={redirect ? `register?redirect=${redirect}` : `/register`}>
            Create an account
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
