// GenerateBrief.jsx
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function GenerateBrief() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSummaryData(null);

    try {
      const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.success) {
        setSummaryData(data.summary);
      } else {
        setError('Failed to generate summary');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  const parseMarkdownSummary = (markdown) => {
    const sections = markdown.split(/^## /gm).slice(1);
    return sections.map(section => {
      const [titleLine, ...contentLines] = section.split('\n');
      return {
        title: titleLine.trim(),
        content: contentLines.join('\n').trim(),
      };
    });
  };

  const cards = summaryData ? parseMarkdownSummary(summaryData) : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="rounded-xl bg-[#1e1e2f] p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Generate Research Brief</h2>
        <div className="flex items-center gap-4 rounded-xl bg-[#12121c] px-4 py-3">
          <FiSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Enter your topic or question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <button
            onClick={handleGenerate}
            className="rounded-lg bg-[#2e2e44] px-4 py-2 text-sm text-white hover:bg-[#3a3a55] transition"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Brief'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Results */}
      <div className="grid gap-4 mt-6">
        {cards.map((card, index) => (
          <div key={index} className="border p-4 rounded shadow-md bg-white">
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{card.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenerateBrief;
