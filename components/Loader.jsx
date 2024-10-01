"use client"

import { Suspense } from 'react'

const Loader = ({ children }) => {
  return (
    <div>
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}

export default Loader
