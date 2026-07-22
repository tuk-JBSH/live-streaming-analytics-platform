// Server-Sent Events (SSE) Client module for streaming data
export function connectStreamingSSE(
  onViewerUpdate?: (data: any) => void,
  onChatMessage?: (data: any) => void,
  onDonation?: (data: any) => void
) {
  const sseUrl = 'http://localhost:8080/api/v1/stream/events';
  console.log('[SSE] Connecting to Backend:', sseUrl);

  const eventSource = new EventSource(sseUrl);

  eventSource.addEventListener('INIT_CONNECTED', (event) => {
    console.log('[SSE] Connected Event:', event.data);
  });

  eventSource.addEventListener('VIEWER_UPDATE', (event) => {
    try {
      const data = JSON.parse(event.data);
      onViewerUpdate?.(data);
    } catch (e) {
      console.error('[SSE] Failed to parse VIEWER_UPDATE:', e);
    }
  });

  eventSource.addEventListener('CHAT_MESSAGE', (event) => {
    try {
      const data = JSON.parse(event.data);
      onChatMessage?.(data);
    } catch (e) {
      console.error('[SSE] Failed to parse CHAT_MESSAGE:', e);
    }
  });

  eventSource.addEventListener('DONATION_SETTLEMENT', (event) => {
    try {
      const data = JSON.parse(event.data);
      onDonation?.(data);
    } catch (e) {
      console.error('[SSE] Failed to parse DONATION_SETTLEMENT:', e);
    }
  });

  eventSource.onerror = (error) => {
    console.warn('[SSE] EventSource connection error (Backend may be offline):', error);
  };

  return () => {
    eventSource.close();
  };
}
