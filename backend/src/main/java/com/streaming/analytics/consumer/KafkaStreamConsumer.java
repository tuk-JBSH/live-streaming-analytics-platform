package com.streaming.analytics.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streaming.analytics.dto.StreamEventDto;
import com.streaming.analytics.service.StreamEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaStreamConsumer {

    private static final Logger log = LoggerFactory.getLogger(KafkaStreamConsumer.class);

    private final StreamEventService streamEventService;
    private final ObjectMapper objectMapper;

    public KafkaStreamConsumer(StreamEventService streamEventService, ObjectMapper objectMapper) {
        this.streamEventService = streamEventService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "stream-viewers", groupId = "analytics-group")
    public void consumeViewerUpdate(String message) {
        try {
            log.info("Kafka Consumed [stream-viewers]: {}", message);
            StreamEventDto.ViewerUpdate update = objectMapper.readValue(message, StreamEventDto.ViewerUpdate.class);
            streamEventService.processViewerUpdate(update);
        } catch (Exception e) {
            log.error("Failed to parse viewer update message: {}", message, e);
        }
    }

    @KafkaListener(topics = "stream-chats", groupId = "analytics-group")
    public void consumeChatMessage(String message) {
        try {
            log.info("Kafka Consumed [stream-chats]: {}", message);
            StreamEventDto.ChatMessage chat = objectMapper.readValue(message, StreamEventDto.ChatMessage.class);
            streamEventService.processChatMessage(chat);
        } catch (Exception e) {
            log.error("Failed to parse chat message: {}", message, e);
        }
    }

    @KafkaListener(topics = "stream-donations", groupId = "analytics-group")
    public void consumeDonation(String message) {
        try {
            log.info("Kafka Consumed [stream-donations]: {}", message);
            StreamEventDto.DonationEvent donation = objectMapper.readValue(message, StreamEventDto.DonationEvent.class);
            streamEventService.processDonation(donation);
        } catch (Exception e) {
            log.error("Failed to parse donation message: {}", message, e);
        }
    }
}
