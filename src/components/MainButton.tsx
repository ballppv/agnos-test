import React from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'utilities/tw'

import ButtonBorder from '../components/ButtonBorder'

interface MainButtonProps {
  href?: string
  text: string
  styles?: string
}

const classes = {
  container: tw(
    `w-1/3 min-w-16 max-w-[60px] md:max-w-[120px] h-6 md:h-10 px-2 md:px-4 flex justify-center bg-white text-2xs md:text-sm
    text-brand-sub border-brand-sub rounded-lg
    hover:border-brand-hover hover:bg-hover hover:text-brand-hover
    active:border-brand-active active:bg-active active:text-brand-active`,
  ),
}

const MainButton = ({ href, text, styles }: MainButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (text === 'Back') return navigate('/')

    navigate(`/${href}`)
  }

  return (
    <ButtonBorder onClick={() => handleClick()} className={tw(classes.container, styles)}>
      <div>{text}</div>
    </ButtonBorder>
  )
}

export default MainButton
