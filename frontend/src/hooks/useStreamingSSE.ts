import { useEffect } from 'react';
import { useStreamingStore } from '../stores/useStreamingStore';
import { connectStreamingSSE } from '../api/sse';

export function useStreamingSSE() {
  const { updateViewerCounts, addChatMessage, addDonation } = useStreamingStore();

  useEffect(() => {
    const disconnect = connectStreamingSSE(
      (viewerData) => {
        if (viewerData?.youtubeViewers !== undefined && viewerData?.chzzkViewers !== undefined) {
          updateViewerCounts(viewerData.youtubeViewers, viewerData.chzzkViewers);
        }
      },
      (chatData) => {
        if (chatData?.message) {
          addChatMessage({
            id: chatData.id || Date.now().toString(),
            platform: chatData.platform || 'youtube',
            username: chatData.username || 'User',
            message: chatData.message,
            timestamp: chatData.timestamp || new Date().toLocaleTimeString(),
            sentiment: chatData.sentiment || 'positive',
          });
        }
      },
      (donationData) => {
        if (donationData?.amount) {
          addDonation({
            id: donationData.id || Date.now().toString(),
            platform: donationData.platform || 'chzzk',
            donorName: donationData.donorName || 'Supporter',
            amount: donationData.amount,
            currency: donationData.currency || 'KRW',
            message: donationData.message || 'Donation',
            timestamp: donationData.timestamp || new Date().toLocaleTimeString(),
          });
        }
      }
    );

    return () => {
      disconnect();
    };
  }, [updateViewerCounts, addChatMessage, addDonation]);
}
