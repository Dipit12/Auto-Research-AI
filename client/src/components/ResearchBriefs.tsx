function ResearchBriefs({ title, content, tags, date }) {
    return (
        <div className="rounded-xl bg-[#1e1e2f] p-6 shadow-md">
            <div className="text-lg font-semibold text-white mb-2">{title}</div>
            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#2e2e44] text-xs text-white px-3 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-400 text-sm mb-4">{content}</p>
            <div className="flex justify-between items-center text-sm">
                <button className="text-purple-400 hover:underline">View Summary →</button>
                <span className="text-gray-500">{date}</span>
            </div>
        </div>
    );
}

export default ResearchBriefs;
