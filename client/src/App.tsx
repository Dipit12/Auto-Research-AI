
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'

function App(){
  return(
    <>
<SignedOut>
        
        <HomePage/>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Dashboard/>
      </SignedIn>
    </>
  )
}

export default App