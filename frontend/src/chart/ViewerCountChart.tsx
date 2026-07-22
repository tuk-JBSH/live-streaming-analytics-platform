'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useStreamingStore } from '../stores/useStreamingStore';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export const ViewerCountChart: React.FC = () => {
  const { viewerHistory, summary, themeMode } = useStreamingStore();
  const [activeTab, setActiveTab] = useState<'chart' | 'distribution'>('chart');
  const isDark = themeMode === 'dark';

  const youtubePct = Math.round((summary.youtubeViewers / (summary.totalViewers || 1)) * 100);
  const chzzkPct = 100 - youtubePct;

  return (
    <div
      id="viewer-chart-card"
      className={`p-5 border shadow-2xs ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } rounded-none flex flex-col justify-between`}
    >
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 animate-ping" />
            <h3 className="text-sm font-extrabold tracking-tight">
              실시간 플랫폼 통합 동시 시청자 분석
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Topic: stream-viewers | InfluxDB Time-Series Ingestion
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1 font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'chart'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs border border-slate-300 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> 시계열 추이
            </button>
            <button
              onClick={() => setActiveTab('distribution')}
              className={`px-3 py-1 font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'distribution'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs border border-slate-300 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" /> 점유율 분배
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'chart' ? (
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={viewerHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorYoutube" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorChzzk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="time" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#cbd5e1',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  fontSize: '12px',
                  borderRadius: '0px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="youtubeViewers"
                name="유튜브 (YouTube)"
                stroke="#dc2626"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorYoutube)"
              />
              <Area
                type="monotone"
                dataKey="chzzkViewers"
                name="치지직 (CHZZK)"
                stroke="#059669"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorChzzk)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-72 flex flex-col justify-center px-4 space-y-6">
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-600" /> YouTube 점유율 ({youtubePct}%)
              </span>
              <span className="font-mono">{summary.youtubeViewers.toLocaleString()} 명</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-3 border border-slate-200 dark:border-slate-800">
              <div
                className="bg-red-600 h-full transition-all duration-300"
                style={{ width: `${youtubePct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-600" /> CHZZK 점유율 ({chzzkPct}%)
              </span>
              <span className="font-mono">{summary.chzzkViewers.toLocaleString()} 명</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-3 border border-slate-200 dark:border-slate-800">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${chzzkPct}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Legend Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
            <span className="w-2 h-2 bg-red-600" /> YouTube ({summary.youtubeViewers}명)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 bg-emerald-600" /> CHZZK ({summary.chzzkViewers}명)
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> 2s Poll Interval
        </div>
      </div>
    </div>
  );
};
