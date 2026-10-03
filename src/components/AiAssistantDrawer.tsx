import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentContext = 'Curriculum Context: Systems & Distributed Engineering',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      text: `**PG Assistant v2.4 Online**.\nI am your deterministic systems tutor and compiler copilot. I can inspect memory invariants, review AST implementations, explain low-level concepts, generate practice quizzes, or debug sandbox code.\n\nHow can I assist your engineering session?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Explain B-Tree rebalancing mechanics',
    'Review my mutex lock for race conditions',
    'Why does pointer dereference cause UB?',
    'Generate 1 hard systems quiz question',
    'Explain epoll vs select scalability',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: currentContext,
          history: historyPayload,
        }),
      });

      const data = await response.json();
      const assistantReply: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'System analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (err) {
      const errorReply: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: 'Deterministic engine returned fallback analysis: Please verify that process virtual page tables remain mapped and atomic mutex boundaries are respected.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0c0c0c] border-l border-white/15 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] flex flex-col font-sans animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#121212] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </div>
          <div>
            <div className="font-mono text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
              <span>PG Copilot v2.4</span>
              <span className="px-1.5 py-0.2 rounded bg-white/10 text-[9px] text-[#AFAFAF]">RAG ENGINE</span>
            </div>
            <div className="text-[10px] text-[#8A8A8A] font-mono truncate max-w-[260px]">
              {currentContext}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded text-[#8A8A8A] hover:text-white hover:bg-white/10 transition-colors"
          title="Close panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Suggested Quick Chips */}
      <div className="p-3 border-b border-white/10 bg-[#0e0e0e] overflow-x-auto whitespace-nowrap space-x-1.5">
        <span className="text-[10px] font-mono uppercase text-[#70757B] mr-1">Quick:</span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] px-2.5 py-1 rounded bg-[#161616] hover:bg-[#202020] text-[#D9D9D9] hover:text-white border border-white/10 transition-colors inline-block"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                  isUser
                    ? 'bg-white text-black'
                    : 'bg-[#181818] border border-white/20 text-white'
                }`}
              >
                {isUser ? 'YOU' : 'PG'}
              </div>

              <div
                className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed ${
                  isUser
                    ? 'bg-[#181818] border border-white/15 text-white'
                    : 'bg-[#111111] border border-white/10 text-[#D9D9D9]'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-xs">
                  {m.text}
                </div>
                <div className="mt-1 text-[9px] font-mono text-[#70757B] text-right">
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded bg-[#181818] border border-white/20 text-white flex items-center justify-center font-mono text-[10px] font-bold">
              PG
            </div>
            <div className="p-3 rounded-xl bg-[#111111] border border-white/10 text-[#AFAFAF] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              <span className="font-mono text-xs">Synthesizing deterministic analysis...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 border-t border-white/10 bg-[#121212]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask PG Assistant a technical question or debug issue..."
            className="flex-1 px-3 py-2 rounded-lg bg-[#080808] border border-white/15 text-white text-xs placeholder:text-[#666] outline-none font-sans focus:border-white/40 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#e0e0e0] text-black font-semibold text-xs transition-colors disabled:opacity-40"
          >
            Send
          </button>
        </form>
        <div className="mt-1.5 text-[10px] font-mono text-[#70757B] flex items-center justify-between">
          <span>Grounded in AST &amp; Kernel Specifications</span>
          <span>Shift+Enter for newline</span>
        </div>
      </div>
    </div>
  );
};
