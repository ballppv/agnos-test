import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Abs from './pages/Abs.tsx'
import Finger from './pages/Finger.tsx'
import Home from './pages/Home.tsx'
import Summary from 'pages/Summary.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abs" element={<Abs />} />
        <Route path="/finger" element={<Finger />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  )
}

export default App
