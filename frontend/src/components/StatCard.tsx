'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useStreamingStore } from '../stores/useStreamingStore';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentColor: 'indigo' | 'amber' | 'emerald' | 'rose';
  tag?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor,
  tag,
}) => {
  const isDark = useStreamingStore((state) => state.themeMode === 'dark');

  const themeStyles = {
    indigo: {
      border: isDark ? 'border-slate-800' : 'border-slate-200',
      bg: isDark ? 'bg-slate-900' : 'bg-white',
      badge: isDark
        ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: isDark
        ? 'bg-indigo-950 text-indigo-400 border-indigo-800'
        : 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    amber: {
      border: isDark ? 'border-slate-800' : 'border-slate-200',
      bg: isDark ? 'bg-slate-900' : 'bg-white',
      badge: isDark
        ? 'bg-amber-950/60 text-amber-300 border-amber-800'
        : 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: isDark
        ? 'bg-amber-950 text-amber-400 border-amber-800'
        : 'bg-amber-50 text-amber-600 border-amber-200',
    },
    emerald: {
      border: isDark ? 'border-slate-800' : 'border-slate-200',
      bg: isDark ? 'bg-slate-900' : 'bg-white',
      badge: isDark
        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: isDark
        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    rose: {
      border: isDark ? 'border-slate-800' : 'border-slate-200',
      bg: isDark ? 'bg-slate-900' : 'bg-white',
      badge: isDark
        ? 'bg-rose-950/60 text-rose-300 border-rose-800'
        : 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: isDark
        ? 'bg-rose-950 text-rose-400 border-rose-800'
        : 'bg-rose-50 text-rose-600 border-rose-200',
    },
  };

  const currentTheme = themeStyles[accentColor];

  return (
    <div
      id={id}
      className={`p-5 border ${currentTheme.border} ${currentTheme.bg} rounded-none shadow-xs flex items-center justify-between transition-colors`}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</span>
          {tag && (
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 border ${currentTheme.badge}`}>
              {tag}
            </span>
          )}
        </div>
        <div className="text-2xl font-black mt-1.5 tracking-tight text-slate-900 dark:text-slate-50">
          {value}
        </div>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>

      <div className={`p-3 border ${currentTheme.iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
