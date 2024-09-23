import React, { useEffect, useState } from 'react'
import MainButton from '../components/MainButton'
import tw from '../utilities/tw'
import ButtonBorder from 'components/ButtonBorder'
import { useNavigate } from 'react-router-dom'
import { absData, fingerData } from 'utilities/mockUpData'

const classes = {
  container: tw(`flex flex-col gap-6 md:gap-8`),
  subContainer: tw(`flex flex-col gap-4 md:gap-6 lg:gap-8`),
  contentSection: tw(`w-full p-6 md:p-8 lg:p-12 flex flex-col
    gap-3 lg:gap-5 border rounded-xl shadow-custom-1`),
  title: tw(`text-center text-secondary text-sm md:text-lg lg:text-2xl`),
  summary: tw(`flex flex-col gap-4 text-gray-500`),
  subSummary: tw(`flex gap-2 lg:gap-3 items-center text-sm md:text-lg lg:text-2xl flex-wrap`),
  list: tw(`flex gap-2 lg:gap-3 items-center flex-wrap text-gray-400 font-light`),
  restartBtn: tw(`w-full max-w-none md:min-w-[100%] lg:min-w-[100%]
    h-6 md:h-10 lg:h-12 px-2 md:px-4 flex justify-center
    bg-white text-2xs md:text-sm lg:text-lg
    text-brand-sub border-brand-sub rounded-lg
    hover:border-brand-hover hover:bg-hover hover:text-brand-hover
    active:border-brand-active active:bg-active active:text-brand-active`),
}

const Summary = () => {
  const navigate = useNavigate()
  const [noFingerPart, setNoFingerPart] = useState(false)
  const selectedAbsParts = localStorage.getItem('selectedAbsParts')
  const selectedFingerParts = localStorage.getItem('selectedFingerParts')

  useEffect(() => {
    const selectedFingerParts = localStorage.getItem('selectedFingerParts')
    const selectedAbsParts = localStorage.getItem('selectedAbsParts')

    if (selectedFingerParts) {
      const fingerPartsArray = JSON.parse(selectedFingerParts)
      if (fingerPartsArray.includes(4)) {
        setNoFingerPart(true)
      }
    }

    if (!selectedFingerParts && !selectedAbsParts) {
      navigate('/')
    }
  }, [navigate])

  const handleBackToHomepage = () => {
    localStorage.clear()
    navigate('/')
  }

  const parsedSelectedAbsParts = selectedAbsParts ? JSON.parse(selectedAbsParts) : []
  const filteredAbsData = parsedSelectedAbsParts.length
    ? absData.filter((part) => parsedSelectedAbsParts.includes(part.id))
    : []

  const parsedSelectedFingerParts = selectedFingerParts ? JSON.parse(selectedFingerParts) : []
  const filteredFingerData = parsedSelectedFingerParts.length
    ? fingerData.filter((part) => parsedSelectedFingerParts.includes(part.id))
    : []

  const noAbsPart = !parsedSelectedAbsParts || parsedSelectedAbsParts?.length === 0

  return (
    <div className={classes.container}>
      <MainButton href="/" text="Back" />

      <div className={classes.subContainer}>
        <div className={classes.contentSection}>
          <div className={classes.title}>
            {noFingerPart && noAbsPart ? 'ไม่ได้ระบุจุดที่ปวด' : 'จุดที่เลือกทั้งหมด'}
          </div>
          {noFingerPart && noAbsPart ? null : (
            <div className={classes.summary}>
              <div className={classes.subSummary}>
                <div>จุดที่ปวดหน้าท้อง: </div>
                {noAbsPart ? (
                  <div>-</div>
                ) : (
                  <div className={classes.list}>
                    {filteredAbsData.map((abs) => {
                      return <div key={abs.id}>{abs.part}</div>
                    })}
                  </div>
                )}
              </div>
              <div className={classes.subSummary}>
                <div>จุดที่ปวดนิ้วมือ: </div>
                {noFingerPart ? (
                  <div>-</div>
                ) : (
                  <div className={classes.list}>
                    {filteredFingerData.map((finger) => {
                      return <div key={finger.id}>{finger.part}</div>
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <ButtonBorder onClick={handleBackToHomepage} className={classes.restartBtn}>
          <div>กลับหน้าแรก</div>
        </ButtonBorder>
      </div>
    </div>
  )
}

export default Summary
