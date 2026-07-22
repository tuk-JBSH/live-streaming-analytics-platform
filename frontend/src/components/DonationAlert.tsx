'use client';

import React from 'react';
import { useStreamingStore } from '../stores/useStreamingStore';
import { Coins, Zap, ShieldCheck } from 'lucide-react';

export const DonationAlert: React.FC = () => {
  const { recentDonations, themeMode } = useStreamingStore();
  const isDark = themeMode === 'dark';

  return (
    <div
      className={`p-5 border shadow-2xs ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } rounded-none flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-tight">실시간 후원 / 정산 파이프라인</h3>
            <p className="text-[10px] text-slate-500 font-mono">MySQL Event-Driven Engine</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          ACID Verified
        </span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {recentDonations.map((donation) => (
          <div
            key={donation.id}
            className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
                  {donation.donorName}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                  [{donation.platform}]
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5 font-medium">
                {donation.message}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-black text-amber-700 dark:text-amber-400 font-mono">
                +{donation.amount.toLocaleString()}{' '}
                <span className="text-xs font-normal text-amber-600">{donation.currency}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{donation.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
