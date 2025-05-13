import SearchBar from "./SearchBar";
import ResearchBriefs from "./ResearchBriefs";
import GenerateBrief from "./GenerateBrief";
function Dashboard() {
    return (
        <div className="flex h-screen bg-[#0e0e1a] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#11111f] p-6 flex flex-col justify-between">
                <div>
                    <div className="text-2xl font-bold mb-8">Auto-Research AI</div>
                    <nav className="space-y-4 text-gray-300 font-medium">
                        <div className="hover:text-white cursor-pointer">🏠 Dashboard</div>
                        <div className="hover:text-white cursor-pointer">📄 My Briefs</div>
                        <div className="hover:text-white cursor-pointer">⏳ History</div>
                        <div className="hover:text-white cursor-pointer">⚙️ Settings</div>
                    </nav>
                </div>
                <div className="text-sm text-gray-600">&lt;</div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
                <GenerateBrief />
                

                {/* Tabs */}
                <div className="mt-8 mb-4 flex gap-4">
                    <button className="px-4 py-2 bg-[#1e1e2f] text-white rounded-lg font-medium shadow-inner">Recent</button>
                    <button className="px-4 py-2 bg-[#12121c] text-gray-400 rounded-lg font-medium">Favorites</button>
                </div>

                {/* Brief Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ResearchBriefs title="Impact of Climate Change on..." tags={["Climate", "Marine Biology", "Research"]} date="Apr 15, 2025" content="Comprehensive analysis of recent studies on climate change effects on ocean biodiversity..." />
                    <ResearchBriefs title="Advances in Quantum..." tags={["Quantum Computing", "Technology", "Research"]} date="Apr 10, 2025" content="Overview of breakthrough applications in quantum computing and potential impacts on..." />
                    <ResearchBriefs title="Sustainable Urban Developme..." tags={["Urban Planning", "Sustainability", "Policy"]} date="Apr 5, 2025" content="Analysis of successful sustainable urban development projects and their implementation..." />
                    <ResearchBriefs title="Artificial Intelligence in..." tags={["AI", "Healthcare", "Technology"]} date="Mar 28, 2025" content="Review of AI-powered diagnostic tools and their accuracy compared to traditional medical..." />
                    <ResearchBriefs title="Microplastics in Food Chain..." tags={["Environmental Science", "Health", "Pollution"]} date="Mar 22, 2025" content="Summary of research on microplastic penetration into the food chain and potential..." />
                    <ResearchBriefs title="Renewable Energy Storage..." tags={["Renewable Energy", "Technology", "Innovation"]} date="Mar 15, 2025" content="Comparison of emerging technologies for efficient renewable energy storage and grid..." />
                </div>
                
            </main>
        </div>
    );
}

export default Dashboard;
