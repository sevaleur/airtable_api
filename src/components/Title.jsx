import React from 'react'

const Title = ({headline, children }) => {
  return (
    <>
        <h1 className='header'>
            { headline }
        </h1>
        { children }
    </>
  )
}

export default Title