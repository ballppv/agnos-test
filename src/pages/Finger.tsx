import React, { useEffect, useState } from 'react'
import MainButton from 'components/MainButton'
import tw from 'utilities/tw'
import defaultFinger from 'assets/images/finger/default-finger.png'
import { fingerData } from 'utilities/mockUpData'
import FingerDiagram from 'components/Diagram/FingerDiagram'

const classes = {
  container: tw(`flex flex-col gap-6 md:gap-8`),
  subContainer: tw(`flex flex-col gap-4 md:gap-6 lg:gap-8`),
  contentSection: tw(`w-full px-8 pt-8 pb-2 lg:px-12 lg:pt-10 lg:pb-4 flex flex-col
    gap-3 lg:gap-5 border rounded-xl shadow-custom-1`),
  title: tw(`text-center text-secondary text-sm md:text-lg lg:text-2xl`),
  fingerVD: tw(`self-center`),
  nextBtn: tw(`w-full max-w-none md:min-w-[100%] lg:min-w-[100%]`),
  nextBtnDisabled: tw(
    `w-full max-w-none md:min-w-[100%] lg:min-w-[100%] opacity-50 cursor-not-allowed`,
  ),
}

const Finger = () => {
  const initialSelectedParts = () => {
    const savedParts = localStorage.getItem('selectedFingerParts')
    return savedParts ? JSON.parse(savedParts) : []
  }

  const [selectedParts, setSelectedParts] = useState<number[]>(initialSelectedParts)

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    const savedParts = localStorage.getItem('selectedFingerParts')
    if (savedParts) {
      setSelectedParts(JSON.parse(savedParts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedFingerParts', JSON.stringify(selectedParts))
    setIsButtonDisabled(selectedParts.length === 0)
  }, [selectedParts])

  return (
    <div className={classes.container}>
      <MainButton href="/abs" text="Back" />

      <div className={classes.subContainer}>
        <div className={classes.contentSection}>
          <div className={classes.title}>จุดไหนที่คุณปวดนิ้วมากที่สุด ?</div>
          <div className={classes.fingerVD}>
            <FingerDiagram
              data={fingerData}
              baseImage={defaultFinger}
              selectedParts={selectedParts}
              setSelectedParts={setSelectedParts}
            />
          </div>
        </div>

        <MainButton
          href="/summary"
          text="ต่อไป"
          styles={isButtonDisabled ? classes.nextBtnDisabled : classes.nextBtn}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  )
}

export default Finger
