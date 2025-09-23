import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './components/auth.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Auth />
    </div>
  )
}

export default App
