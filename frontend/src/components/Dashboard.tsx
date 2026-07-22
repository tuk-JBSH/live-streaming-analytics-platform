'use client';

import React, { useEffect } from 'react';
import { useStreamingStore } from '../stores/useStreamingStore';
import { useStreamingSSE } from '../hooks/useStreamingSSE';
import { StreamHeader } from './StreamHeader';
import { StatCard } from './StatCard';
import { ViewerCountChart } from '../chart/ViewerCountChart';
import { ChatFeed } from './ChatFeed';
import { DonationAlert } from './DonationAlert';
import { Users, DollarSign, MessageSquare, HeartHandshake, Database, Layers, Radio } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { summary, themeMode } = useStreamingStore();
  const isDark = themeMode === 'dark';

  // Activate real-time backend SSE event stream
  useStreamingSSE();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
      } font-sans flex flex-col antialiased selection:bg-indigo-600 selection:text-white`}
    >
      {/* Top Header */}
      <StreamHeader />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1500px] w-full mx-auto space-y-5">
        {/* Top 4 Stat Cards Container */}
        <div id="stat-cards-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="stat-card-viewers"
            title="실시간 동시 시청자"
            value={summary.totalViewers.toLocaleString() + ' 명'}
            subtitle={`유튜브: ${summary.youtubeViewers.toLocaleString()}명 | 치지직: ${summary.chzzkViewers.toLocaleString()}명`}
            icon={Users}
            accentColor="indigo"
            tag="PEAK"
          />

          <StatCard
            id="stat-card-donation"
            title="누적 후원 정산금"
            value={`${summary.totalDonation.toLocaleString()} 원`}
            subtitle="MySQL Settlement DB 기록 중"
            icon={DollarSign}
            accentColor="amber"
            tag="REALTIME"
          />

          <StatCard
            id="stat-card-messages"
            title="수집된 메시지"
            value={summary.totalChats.toLocaleString() + ' 건'}
            subtitle="Kafka Topic: stream-chats"
            icon={MessageSquare}
            accentColor="emerald"
            tag="KAFKA"
          />

          <StatCard
            id="stat-card-sentiment"
            title="시청자 긍정 감정 비율"
            value={`${summary.positiveSentimentRatio}%`}
            subtitle="실시간 NLP 감정 파이프라인"
            icon={HeartHandshake}
            accentColor="rose"
            tag="POSITIVE"
          />
        </div>

        {/* Central Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2 space-y-5">
            <ViewerCountChart />
            <DonationAlert />
          </div>

          <div className="lg:col-span-1 h-full">
            <ChatFeed />
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div
          id="telemetry-footer-bar"
          className={`p-4 border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          } rounded-none flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium shadow-xs`}
        >
          <div className="flex items-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Redis (In-Memory View):{' '}
              <strong className="text-slate-900 dark:text-slate-100">Active</strong>
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Kafka Message Bus:{' '}
              <strong className="text-slate-900 dark:text-slate-100">Connected (3 Topics)</strong>
            </span>
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              SSE & WebSocket Bridge:{' '}
              <strong className="text-slate-900 dark:text-slate-100">Ready</strong>
            </span>
          </div>

          <div className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            Live Analytics Engine v1.0.0
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090d16] py-3 text-center text-xs text-slate-400 font-medium">
        Live Streaming Data Analysis Platform &copy; 2026. Minimal White Modern Theme.
      </footer>
    </div>
  );
};
