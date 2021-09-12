import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import FormContainer from '../../components/formcontainer'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/constants'

const AccountScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  let { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdate } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      event.preventDefault()
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      )
    }
  }

  return (
    <FormContainer style={{ color: 'white' }}>
      <h4 className='text-center py-3'>Hello {name}</h4>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      {successUpdate && <Message variant='success'>Profile Updated</Message>}

      <Form onSubmit={submitHandler} className='d-flex flex-column'>
        <Form.Group controlId='name' className='my-1'>
          <Form.Label className='mx-2'>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              color: 'rgba(0, 255, 255, 0.76)',
              borderColor: 'rgba(0, 255, 255, 0.76)',
            }}
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
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AccountScreen
