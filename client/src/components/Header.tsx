import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
function Header() {
    return (
      <header className="w-full px-6 py-4 flex justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-white text-lg font-semibold">Auto-Research AI</span>
        </div>
   <button className = "cursor-pointer"><SignInButton/></button>
        {/* Log In Button */}
       
      </header>
    );
  }
  
  export default Header;
  