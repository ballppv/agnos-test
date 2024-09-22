import React from 'react'
import MainButton from '../components/MainButton'
import tw from '../utilities/tw'
import AbsDiagram from '../components/Diagram/AbsDiagram'
import { absData } from '../utilities/mockUpData'
import defaultAbs from '../assets/images/abs/default-abs.png'

const classes = {
  container: tw(`flex flex-col gap-6 md:gap-8`),
  subContainer: tw(`flex flex-col gap-4 md:gap-6 lg:gap-8`),
  contentSection: tw(`w-full px-8 pt-8 pb-2 lg:px-12 lg:pt-10 lg:pb-4 flex flex-col
    gap-3 lg:gap-5 border rounded-xl shadow-custom-1`),
  title: tw(`text-center text-secondary text-sm md:text-lg lg:text-2xl`),
  absVD: tw(`self-center`),
  nextBtn: tw(`w-full max-w-none md:min-w-[100%] lg:min-w-[100%]`),
}

const Abs = () => {
  return (
    <div className={classes.container}>
      <MainButton href="/" text="Back" />

      <div className={classes.subContainer}>
        <div className={classes.contentSection}>
          <div className={classes.title}>จุดไหนที่คุณปวดท้องมากที่สุด ?</div>
          <div className={classes.absVD}>
            <AbsDiagram data={absData} baseImage={defaultAbs} />
          </div>
        </div>

        <MainButton href="/finger" text="ต่อไป" styles={classes.nextBtn} />
      </div>
    </div>
  )
}

export default Abs
