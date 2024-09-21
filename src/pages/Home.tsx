import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const redirectTo = (pageName: string) => {
    navigate(`/${pageName}`)
  }

  return (
    <div>
      <button onClick={() => redirectTo('abs')}>Go to Abs</button>
      <button onClick={() => redirectTo('finger')}>Go to Finger</button>
    </div>
  )
}

export default Home
