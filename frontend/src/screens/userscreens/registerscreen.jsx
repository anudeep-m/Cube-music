import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { registerUser } from '../../actions/userActions'
import FormContainer from '../../components/formcontainer'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(registerUser(name, email, password))
    }
  }

  return (
    <FormContainer style={{ color: 'white' }}>
      <h2 className='text-center py-3'>Sign Up</h2>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}

      <Form onSubmit={submitHandler} className='d-flex flex-column'>
        <Form.Group controlId='name' className='my-1'>
          <Form.Label className='mx-2'>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.76)',
            }}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-1'>
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

        <Form.Group controlId='password' className='my-1'>
          <Form.Label className='mx-2'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.76)',
            }}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-1'>
          <Form.Label className='mx-2'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.76)',
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varaint='primary' className='my-2'>
          Sign Up
        </Button>
      </Form>

      <Row className='text-center my-2'>
        <Col>
          Have an account? ~{' '}
          <Link to={redirect ? `login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
