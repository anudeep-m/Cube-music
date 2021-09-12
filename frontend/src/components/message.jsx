import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert
      variant={variant}
      className='py-3 my-3 d-flex justify-content-center'
    >
      {children}
    </Alert>
  )
}
Message.defaultProps = {
  variant: 'danger',
}

export default Message
