export interface ChatMessage {
  id: string;
  platform: 'youtube' | 'chzzk';
  username: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface Donation {
  id: string;
  platform: 'youtube' | 'chzzk';
  donorName: string;
  amount: number;
  currency: string;
  message: string;
  timestamp: string;
}

export interface ViewerDataPoint {
  time: string;
  youtubeViewers: number;
  chzzkViewers: number;
  totalViewers: number;
}

export interface StreamSummary {
  streamId: string;
  title: string;
  streamerName: string;
  isLive: boolean;
  totalViewers: number;
  youtubeViewers: number;
  chzzkViewers: number;
  totalDonation: number;
  totalChats: number;
  positiveSentimentRatio: number; // percentage (0 ~ 100)
}
