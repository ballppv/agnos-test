import React from 'react'
import { useNavigate } from 'react-router-dom'

const FingerPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div>
      <button onClick={handleBack}>Go to About Page</button>
    </div>
  )
}

export default FingerPage
