import React from 'react'
import tw from 'utilities/tw'

import MainButton from 'components/MainButton'

const classes = {
  container: tw(`flex flex-col gap-3 md:gap-5 lg:gap-6 justify-center items-center`),
  title: tw(`text-center text-secondary text-sm md:text-lg lg:text-2xl`),
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
