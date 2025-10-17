import React from 'react'

export const Button = ({caracter, onClick}) => {
  return (
    <>
    <button onClick={onClick}>{caracter}</button>
    </> 
  )
}
