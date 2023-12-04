import { useState } from 'react'
import Root from "./components/Root";
import { WalletContextProvider } from "./context/wallet";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <WalletContextProvider>
    <Root />
  </WalletContextProvider>
  )
}

export default App
