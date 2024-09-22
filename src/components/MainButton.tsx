import React from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'utilities/tw'

import ButtonBorder from '../components/ButtonBorder'

interface MainButtonProps {
  href?: string
  text: string
}

const classes = {
  container: tw(
    `w-full max-w-[400px] h-10 px-4 flex justify-center bg-white text-sm
    text-brand-sub border-brand-sub rounded-lg
    hover:border-brand-hover hover:bg-hover hover:text-brand-hover
    active:border-brand-active active:bg-active active:text-brand-active`,
  ),
}

const MainButton = ({ href, text }: MainButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (text === 'back') return navigate('/')

    navigate(`/${href}`)
  }

  return (
    <ButtonBorder onClick={() => handleClick()} className={classes.container}>
      <div>{text}</div>
    </ButtonBorder>
  )
}

export default MainButton
