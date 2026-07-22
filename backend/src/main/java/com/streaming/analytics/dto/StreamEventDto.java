package com.streaming.analytics.dto;

import java.time.LocalDateTime;

public class StreamEventDto {

    public static class ViewerUpdate {
        private String streamId;
        private int youtubeViewers;
        private int chzzkViewers;
        private int totalViewers;
        private String timestamp;

        public ViewerUpdate() {}

        public ViewerUpdate(String streamId, int youtubeViewers, int chzzkViewers, String timestamp) {
            this.streamId = streamId;
            this.youtubeViewers = youtubeViewers;
            this.chzzkViewers = chzzkViewers;
            this.totalViewers = youtubeViewers + chzzkViewers;
            this.timestamp = timestamp;
        }

        public String getStreamId() { return streamId; }
        public int getYoutubeViewers() { return youtubeViewers; }
        public int getChzzkViewers() { return chzzkViewers; }
        public int getTotalViewers() { return totalViewers; }
        public String getTimestamp() { return timestamp; }

        public void setStreamId(String streamId) { this.streamId = streamId; }
        public void setYoutubeViewers(int youtubeViewers) { this.youtubeViewers = youtubeViewers; }
        public void setChzzkViewers(int chzzkViewers) { this.chzzkViewers = chzzkViewers; }
        public void setTotalViewers(int totalViewers) { this.totalViewers = totalViewers; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }

    public static class ChatMessage {
        private String id;
        private String platform;
        private String username;
        private String message;
        private String timestamp;
        private String sentiment;

        public ChatMessage() {}

        public ChatMessage(String id, String platform, String username, String message, String timestamp, String sentiment) {
            this.id = id;
            this.platform = platform;
            this.username = username;
            this.message = message;
            this.timestamp = timestamp;
            this.sentiment = sentiment;
        }

        public String getId() { return id; }
        public String getPlatform() { return platform; }
        public String getUsername() { return username; }
        public String getMessage() { return message; }
        public String getTimestamp() { return timestamp; }
        public String getSentiment() { return sentiment; }

        public void setId(String id) { this.id = id; }
        public void setPlatform(String platform) { this.platform = platform; }
        public void setUsername(String username) { this.username = username; }
        public void setMessage(String message) { this.message = message; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
        public void setSentiment(String sentiment) { this.sentiment = sentiment; }
    }

    public static class DonationEvent {
        private String id;
        private String platform;
        private String donorName;
        private double amount;
        private String currency;
        private String message;
        private String timestamp;

        public DonationEvent() {}

        public DonationEvent(String id, String platform, String donorName, double amount, String currency, String message, String timestamp) {
            this.id = id;
            this.platform = platform;
            this.donorName = donorName;
            this.amount = amount;
            this.currency = currency;
            this.message = message;
            this.timestamp = timestamp;
        }

        public String getId() { return id; }
        public String getPlatform() { return platform; }
        public String getDonorName() { return donorName; }
        public double getAmount() { return amount; }
        public String getCurrency() { return currency; }
        public String getMessage() { return message; }
        public String getTimestamp() { return timestamp; }

        public void setId(String id) { this.id = id; }
        public void setPlatform(String platform) { this.platform = platform; }
        public void setDonorName(String donorName) { this.donorName = donorName; }
        public void setAmount(double amount) { this.amount = amount; }
        public void setCurrency(String currency) { this.currency = currency; }
        public void setMessage(String message) { this.message = message; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }
}
