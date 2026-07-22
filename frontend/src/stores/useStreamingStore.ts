import { create } from 'zustand';
import { ChatMessage, Donation, StreamSummary, ViewerDataPoint } from '../types/streaming';

interface StreamingState {
  summary: StreamSummary;
  viewerHistory: ViewerDataPoint[];
  chatFeed: ChatMessage[];
  recentDonations: Donation[];
  themeMode: 'light' | 'dark';
  
  // Actions
  addChatMessage: (chat: ChatMessage) => void;
  addDonation: (donation: Donation) => void;
  updateViewerCounts: (youtube: number, chzzk: number) => void;
  toggleLiveStatus: () => void;
  toggleTheme: () => void;
}

const initialViewerHistory: ViewerDataPoint[] = [
  { time: '19:40', youtubeViewers: 1240, chzzkViewers: 890, totalViewers: 2130 },
  { time: '19:42', youtubeViewers: 1350, chzzkViewers: 940, totalViewers: 2290 },
  { time: '19:44', youtubeViewers: 1420, chzzkViewers: 1020, totalViewers: 2440 },
  { time: '19:46', youtubeViewers: 1580, chzzkViewers: 1150, totalViewers: 2730 },
  { time: '19:48', youtubeViewers: 1710, chzzkViewers: 1290, totalViewers: 3000 },
  { time: '19:50', youtubeViewers: 1850, chzzkViewers: 1420, totalViewers: 3270 },
];

const initialChats: ChatMessage[] = [
  { id: '1', platform: 'youtube', username: '스트림팬1', message: '오늘 방송 화질 대박이네요!! 🔥', timestamp: '19:49:10', sentiment: 'positive' },
  { id: '2', platform: 'chzzk', username: '치지직러버', message: '치지직 시청자 수 올라간다 가자~', timestamp: '19:49:35', sentiment: 'positive' },
  { id: '3', platform: 'youtube', username: 'GamerX', message: '이 게임 소리 조금 작은 거 같아요 🔊', timestamp: '19:50:01', sentiment: 'neutral' },
  { id: '4', platform: 'chzzk', username: '코딩왕', message: 'Kafka랑 Redis 분석 속도 진짜 빠르다 🚀', timestamp: '19:50:15', sentiment: 'positive' },
];

const initialDonations: Donation[] = [
  { id: 'd1', platform: 'youtube', donorName: '열혈시청자A', amount: 50000, currency: 'KRW', message: '오늘 방송 화이팅입니다! 맛있는거 사드세요~', timestamp: '19:45:00' },
  { id: 'd2', platform: 'chzzk', donorName: '후원왕', amount: 10000, currency: 'KRW', message: '치즈 100개 쏩니다 🧀', timestamp: '19:48:20' },
];

export const useStreamingStore = create<StreamingState>((set) => ({
  summary: {
    streamId: 'live-stream-001',
    title: '🔴 [실시간] 라이브 스트리밍 통합 빅데이터 분석 대시보드',
    streamerName: 'DeepAnalyst_Live',
    isLive: true,
    totalViewers: 3270,
    youtubeViewers: 1850,
    chzzkViewers: 1420,
    totalDonation: 60000,
    totalChats: 14280,
    positiveSentimentRatio: 88,
  },
  viewerHistory: initialViewerHistory,
  chatFeed: initialChats,
  recentDonations: initialDonations,
  themeMode: 'light', // Default is White Modern Style

  addChatMessage: (chat) =>
    set((state) => ({
      chatFeed: [chat, ...state.chatFeed].slice(0, 50),
      summary: {
        ...state.summary,
        totalChats: state.summary.totalChats + 1,
      },
    })),

  addDonation: (donation) =>
    set((state) => ({
      recentDonations: [donation, ...state.recentDonations].slice(0, 20),
      summary: {
        ...state.summary,
        totalDonation: state.summary.totalDonation + donation.amount,
      },
    })),

  updateViewerCounts: (youtube, chzzk) =>
    set((state) => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const total = youtube + chzzk;

      const newHistory = [
        ...state.viewerHistory.slice(-15),
        { time: timeStr, youtubeViewers: youtube, chzzkViewers: chzzk, totalViewers: total },
      ];

      return {
        viewerHistory: newHistory,
        summary: {
          ...state.summary,
          youtubeViewers: youtube,
          chzzkViewers: chzzk,
          totalViewers: total,
        },
      };
    }),

  toggleLiveStatus: () =>
    set((state) => ({
      summary: { ...state.summary, isLive: !state.summary.isLive },
    })),

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
}));
