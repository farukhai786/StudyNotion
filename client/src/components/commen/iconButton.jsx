import React from 'react'

export default function IconButton({
  text,
  onClick,
  children,
  disabled = false,
  outLink = false,
  customClasses = '',
  type = 'button',
}) {

  if (outLink) {
    return (
      <a
        href={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 ${customClasses}`}
      >
        {text}
        {children}
      </a>
    )
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex items-center gap-2 ${customClasses} `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}

