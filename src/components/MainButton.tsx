import React from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'utilities/tw'

import ButtonBorder from '../components/ButtonBorder'

interface MainButtonProps {
  href: string
  text: string
  styles?: string
  disabled?: boolean
}

const classes = {
  container: tw(
    `w-1/3 min-w-16 max-w-[60px] md:max-w-[120px] lg:max-w-[160px] h-6 md:h-10
    lg:h-12 px-2 md:px-4 flex justify-center bg-white text-2xs md:text-sm lg:text-lg
    text-brand-sub border-brand-sub rounded-lg
    hover:border-brand-hover hover:bg-hover hover:text-brand-hover
    active:border-brand-active active:bg-active active:text-brand-active`,
  ),
}

const MainButton = ({ href, text, styles, disabled }: MainButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <ButtonBorder
      onClick={() => handleClick()}
      className={tw(classes.container, styles)}
      disabled={disabled}
    >
      <div>{text}</div>
    </ButtonBorder>
  )
}

export default MainButton
