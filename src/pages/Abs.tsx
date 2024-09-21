import React from 'react'
import { useNavigate } from 'react-router-dom'

const Abs = () => {
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

export default Abs
