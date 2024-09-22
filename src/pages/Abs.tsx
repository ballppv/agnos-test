import React from 'react'
import MainButton from 'components/MainButton'
import tw from 'utilities/tw'
import VoronoiDiagram from 'components/Diagram'
import { absData } from 'utilities/mockUpData'
import defaultAbs from 'assets/images/abs/default-abs.png'

const classes = {
  container: tw(`flex flex-col gap-12`),
  subContainer: tw(`flex flex-col gap-5`),
  absVD: tw(`self-center`),
}

const Abs = () => {
  return (
    <div className={classes.container}>
      <MainButton text="Back" styles="max-w-[200px]" />
      <div className={classes.subContainer}>
        <div className={classes.absVD}>
          <VoronoiDiagram data={absData} baseImage={defaultAbs} />
        </div>
      </div>
    </div>
  )
}

export default Abs
