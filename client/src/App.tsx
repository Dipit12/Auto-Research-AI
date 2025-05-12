
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import HomePage from './components/HomePage'

function App(){
  return(
    <>
<SignedOut>
        
        <HomePage/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App