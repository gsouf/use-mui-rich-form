import React from 'react'

import { useMyHook } from 'use-mui-rich-form'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
