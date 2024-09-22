import React, { useState } from 'react'

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  href?: string
  visible?: boolean
  className?: string
  hoverColor?: string
  disabled?: boolean
}

export const ButtonBorder: React.FC<ButtonProps> = ({
  onClick,
  children,
  visible = true,
  className = 'w-fit text-sm font-normal',
  hoverColor,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        border-[1px]
        flex
        justify-center
        items-center
        not-italic
        ${visible ? '' : 'hidden'}
        ${className}
      `}
      style={{
        backgroundColor: isHovered ? hoverColor : undefined,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ButtonBorder
