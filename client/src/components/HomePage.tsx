import HomeCard from "./HomeCard";
import GettingStartedButton from "./GettingStartedButton";
import Header from "./Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-8 py-20">
            
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                    Auto-Research <span className="text-purple-400">AI</span>
                </h1>
                <h3 className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl">
                    Generate concise, research-backed summaries from real-time sources in a click.
                </h3>
                <GettingStartedButton />
                
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HomeCard 
                        number="1" 
                        heading="Real-Time Research" 
                        description="Access up-to-date information from verified academic and news sources." 
                    />
                    <HomeCard 
                        number="2" 
                        heading="Concise Summaries" 
                        description="Get to the point with AI-generated briefs that capture essential information." 
                    />
                    <HomeCard 
                        number="3" 
                        heading="Cited Sources" 
                        description="Every piece of information is linked back to its original source." 
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
