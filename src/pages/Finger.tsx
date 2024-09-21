import React from 'react'
import { useNavigate } from 'react-router-dom'

const Finger = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div>
      <button onClick={handleBack}>Back</button>
    </div>
  )
}

export default Finger
