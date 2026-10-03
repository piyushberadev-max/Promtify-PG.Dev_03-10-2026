import React, { useState } from 'react';
import { RESOURCES } from '../data/mockData';
import { ResourceItem } from '../types';

export const ResourcesView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [readingResource, setReadingResource] = useState<ResourceItem | null>(null);

  const categories = ['ALL', 'PDF / WEB', 'CHEAT SHEETS', 'INTERVIEWS', 'COMMUNITY'];

  const filtered = RESOURCES.filter((r) => {
    const matchesCat = selectedCat === 'ALL' || r.category === selectedCat;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Developer Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Engineering Resources &amp; Specifications
          </h1>
          <p className="text-sm md:text-base text-[#8A8A8A] mt-2 font-sans leading-relaxed">
            Curated whitepapers, CLI cheat sheets, and architectural rubrics written by staff engineers.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#70757B]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search whitepapers, GDB cheat sheets, RFCs, and rubrics..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#141414] border border-white/10 text-xs text-white placeholder:text-[#666] outline-none focus:border-white/30 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedCat === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#141414] text-[#8A8A8A] hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              onClick={() => setReadingResource(res)}
              className="p-6 rounded-xl bg-[#090909] border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-white text-[22px]">
                    {res.category === 'PDF / WEB' ? 'menu_book' : res.category === 'CHEAT SHEETS' ? 'terminal' : res.category === 'INTERVIEWS' ? 'assignment' : 'forum'}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-white/10 text-white font-medium">
                    {res.category}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{res.title}</h3>
                <p className="text-xs text-[#8A8A8A] leading-relaxed mb-4 font-sans">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                <span>{res.readTime || 'Verified'}</span>
                <span className="text-white hover:underline flex items-center gap-1">
                  <span>Read Spec</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Document Reader Modal */}
        {readingResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
            <div 
              className="w-full max-w-3xl rounded-2xl bg-[#0d0d0d] border border-white/20 p-6 md:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <div className="font-mono text-xs text-[#8A8A8A] uppercase mb-1">
                    {readingResource.category} &bull; {readingResource.readTime}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {readingResource.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setReadingResource(null)}
                  className="p-1 rounded text-[#8A8A8A] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 text-xs font-sans text-[#D9D9D9] leading-relaxed">
                <div className="p-4 rounded-xl bg-[#141414] border border-white/10 text-[#AFAFAF]">
                  {readingResource.description}
                </div>

                <div className="whitespace-pre-wrap font-mono text-xs bg-[#080808] p-4 rounded-xl border border-white/10 leading-6 text-white">
                  {readingResource.contentMarkdown || 'Document content loading...'}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#70757B]">_PG.Dev Architectural Archive</span>
                <button
                  type="button"
                  onClick={() => setReadingResource(null)}
                  className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-[#e2e2e2] transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
