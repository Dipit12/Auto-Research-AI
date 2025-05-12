import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function GettingStartedButton(){
    return(
        <div><button className = "rounded-xl text-white border-0 bg-indigo-500 p-2 border-2 border-indigo-500 cursor-pointer hover:not-focus:bg-indigo-700 "><SignInButton/></button></div>
    )
    
}

export default GettingStartedButton