import { FiSearch } from 'react-icons/fi'; 
function SearchBar() {
    return (
        <div className="mx-auto max-w-3xl rounded-xl bg-[#1e1e2f] p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Generate Research Brief</h2>
            <div className="flex items-center gap-4 rounded-xl bg-[#12121c] px-4 py-3">
                <FiSearch className="text-gray-400 text-xl" />
                <input
                    type="text"
                    placeholder="Enter your topic or question..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                />
                <button className="rounded-lg bg-[#2e2e44] px-4 py-2 text-sm text-white hover:bg-[#3a3a55] transition">
                    Generate Brief
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
