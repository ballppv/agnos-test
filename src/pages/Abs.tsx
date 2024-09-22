import VoronoiDiagram from 'components/VoronoiDiagram'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import defaultAbs from '../assets/images/abs/default-abs.png'
import activeImage from '../assets/images/abs/ruq-active.png'

const Abs = () => {
  const navigate = useNavigate()

  const points = [
    { x: 100, y: 100 },
    { x: 200, y: 150 },
    { x: 300, y: 200 },
    { x: 400, y: 250 },
    { x: 500, y: 300 },
    { x: 600, y: 350 },
    { x: 700, y: 400 },
  ]

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <VoronoiDiagram points={points} baseImage={defaultAbs} activeImage={activeImage} />
    </div>
  )
}

export default Abs
