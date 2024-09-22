import React from 'react'
import tw from 'utilities/tw'

import MainButton from 'components/MainButton'

const classes = {
  container: tw(`flex flex-col gap-5 justify-center items-center`),
  title: tw(`text-center text-brand-sub text-base`),
}

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>แบบทดสอบระบุตำแหน่งอาการปวดบริเวณหน้าท้องและนิ้วมือ</div>
      <MainButton href="abs" text="Start" />
    </div>
  )
}

export default Home
