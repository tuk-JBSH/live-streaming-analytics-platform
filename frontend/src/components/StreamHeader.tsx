'use client';

import React from 'react';
import { useStreamingStore } from '../stores/useStreamingStore';
import { Radio, RefreshCw, Cpu, Wifi, Sun, Moon } from 'lucide-react';

export const StreamHeader: React.FC = () => {
  const { summary, toggleLiveStatus, updateViewerCounts, themeMode, toggleTheme } = useStreamingStore();
  const isDark = themeMode === 'dark';

  const handleSimulateUpdate = () => {
    const nextYoutube = Math.floor(summary.youtubeViewers + (Math.random() * 260 - 130));
    const nextChzzk = Math.floor(summary.chzzkViewers + (Math.random() * 240 - 120));
    updateViewerCounts(Math.max(100, nextYoutube), Math.max(100, nextChzzk));
  };

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <header
      id="stream-header"
      className={`w-full border-b sticky top-0 z-50 transition-colors duration-200 ${
        isDark
          ? 'bg-[#0f172a]/95 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
      } px-6 py-3`}
    >
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Brand & Stream Status */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-slate-900 text-white dark:bg-indigo-600 rounded-none flex items-center justify-center font-black text-xs tracking-tighter border border-slate-700">
            LIVE
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-none uppercase flex items-center gap-1 border ${
                  summary.isLive
                    ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                <Radio className="w-3 h-3" />
                {summary.isLive ? 'LIVE ANALYZING' : 'PAUSED'}
              </span>

              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-600" /> Kafka Latency: 12ms
              </span>
            </div>

            <h1 className="text-base font-black tracking-tight mt-0.5 flex items-center gap-2">
              {summary.title}
            </h1>
          </div>
        </div>

        {/* Right: Theme Toggle & Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium">
            <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-slate-500 dark:text-slate-400">Stream Engine:</span>
            <strong className="text-slate-900 dark:text-slate-100">Kafka KRaft Active</strong>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={handleToggleTheme}
            className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer select-none ${
              isDark
                ? 'border-amber-500/50 bg-slate-800 text-amber-400 hover:bg-slate-700'
                : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-2xs'
            }`}
            title="다크모드 / 라이트모드 전환"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-amber-300">라이트 모드</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline text-slate-800">다크 모드</span>
              </>
            )}
          </button>

          <button
            id="sim-refresh-btn"
            onClick={handleSimulateUpdate}
            className="px-3 py-2 text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            데이터 갱신
          </button>

          <button
            id="live-status-btn"
            onClick={toggleLiveStatus}
            className={`px-4 py-2 text-xs font-black transition-colors cursor-pointer ${
              summary.isLive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {summary.isLive ? '중단' : '시작'}
          </button>
        </div>
      </div>
    </header>
  );
};
