'use client';

import React, { useState } from 'react';
import { useStreamingStore } from '../stores/useStreamingStore';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

export const ChatFeed: React.FC = () => {
  const { chatFeed, addChatMessage, themeMode } = useStreamingStore();
  const [inputMsg, setInputMsg] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'chzzk'>('all');
  const isDark = themeMode === 'dark';

  const filteredChats =
    selectedPlatform === 'all'
      ? chatFeed
      : chatFeed.filter((chat) => chat.platform === selectedPlatform);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    addChatMessage({
      id: Date.now().toString(),
      platform: selectedPlatform === 'chzzk' ? 'chzzk' : 'youtube',
      username: 'User_' + Math.floor(Math.random() * 900 + 100),
      message: inputMsg,
      timestamp: timeStr,
      sentiment: 'positive',
    });

    setInputMsg('');
  };

  return (
    <div
      className={`p-5 border shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } rounded-none h-full flex flex-col justify-between transition-colors`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-tight">통합 채팅 수집 스트림</h3>
            <p className="text-[10px] text-slate-500 font-mono">Topic: stream-chats</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-2 py-0.5 transition-colors ${
              selectedPlatform === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-2 py-0.5 transition-colors ${
              selectedPlatform === 'youtube'
                ? 'bg-red-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            YT
          </button>
          <button
            onClick={() => setSelectedPlatform('chzzk')}
            className={`px-2 py-0.5 transition-colors ${
              selectedPlatform === 'chzzk'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            CH
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 custom-scrollbar">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-2.5 border transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            } flex items-start justify-between gap-2`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-[9px] font-mono font-extrabold px-1 py-0.2 uppercase border ${
                    chat.platform === 'youtube'
                      ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800'
                  }`}
                >
                  {chat.platform === 'youtube' ? 'YT' : 'CH'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {chat.username}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{chat.timestamp}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed break-words font-medium">
                {chat.message}
              </p>
            </div>

            {chat.sentiment === 'positive' && (
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 border border-emerald-200 dark:border-emerald-800 shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                긍정
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendChat} className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="채팅 메시지 전송 모뮬레이션..."
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:border-indigo-600 placeholder-slate-400 font-medium"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 transition-colors shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
