import React from 'react'
import MainButton from 'components/MainButton'
import tw from 'utilities/tw'
import VoronoiDiagram from 'components/Diagram'
import { absData } from 'utilities/mockUpData'
import defaultAbs from 'assets/images/abs/default-abs.png'
// import allOverPart from '../assets/images/abs/all-over-highlight.png'

const classes = {
  container: tw(`flex flex-col gap-5`),
  absVD: tw(`self-center`),
}

const Abs = () => {
  return (
    <div className={classes.container}>
      <MainButton text="Back" styles="max-w-[200px]" />
      {/* <ClickableBaseImage baseImage={baseImage} partImages={partImages} detailImages={textImages} /> */}
      <div className={classes.absVD}>
        <VoronoiDiagram data={absData} baseImage={defaultAbs} />
      </div>
    </div>
  )
}

export default Abs
