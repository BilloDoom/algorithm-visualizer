import { useState } from 'react'
import AlgorithmList from './components/AlgorithmList'
import MainDisplay from './components/MainDisplay'
import EditorPanel from './components/EditorPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <AlgorithmList />
      <MainDisplay />
      <EditorPanel />
    </div>
  )
}

export default App
