package com.streaming.analytics.service;

import com.streaming.analytics.dto.StreamEventDto;
import com.streaming.analytics.entity.DonationEntity;
import com.streaming.analytics.repository.DonationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class StreamEventService {

    private static final Logger log = LoggerFactory.getLogger(StreamEventService.class);

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @Autowired(required = false)
    private DonationRepository donationRepository;

    @Autowired(required = false)
    private StringRedisTemplate redisTemplate;

    public StreamEventService() {}

    public SseEmitter subscribeEvents() {
        SseEmitter emitter = new SseEmitter(180_000L); // 3 minutes timeout
        this.emitters.add(emitter);

        emitter.onCompletion(() -> this.emitters.remove(emitter));
        emitter.onTimeout(() -> this.emitters.remove(emitter));
        emitter.onError((e) -> this.emitters.remove(emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("INIT_CONNECTED")
                    .data("Connected to Live Analytics SSE Engine"));
        } catch (IOException e) {
            this.emitters.remove(emitter);
        }

        return emitter;
    }

    public void processViewerUpdate(StreamEventDto.ViewerUpdate update) {
        log.info("Processing Viewer Update - YT: {}, CH: {}", update.getYoutubeViewers(), update.getChzzkViewers());
        
        // Save to Redis Materialized View if Redis is available
        if (redisTemplate != null) {
            try {
                redisTemplate.opsForValue().set("viewers:youtube", String.valueOf(update.getYoutubeViewers()));
                redisTemplate.opsForValue().set("viewers:chzzk", String.valueOf(update.getChzzkViewers()));
                redisTemplate.opsForValue().set("viewers:total", String.valueOf(update.getTotalViewers()));
            } catch (Exception e) {
                log.warn("Redis operation skipped: {}", e.getMessage());
            }
        }

        broadcastEvent("VIEWER_UPDATE", update);
    }

    public void processChatMessage(StreamEventDto.ChatMessage chat) {
        log.info("Processing Chat - [{}] {}: {}", chat.getPlatform(), chat.getUsername(), chat.getMessage());
        broadcastEvent("CHAT_MESSAGE", chat);
    }

    public void processDonation(StreamEventDto.DonationEvent donation) {
        log.info("Processing Donation Settlement - [{}] {}: {} {}", donation.getPlatform(), donation.getDonorName(), donation.getAmount(), donation.getCurrency());
        
        // Record ACID Settlement in MySQL if DB is active
        if (donationRepository != null) {
            try {
                DonationEntity entity = new DonationEntity(
                        donation.getId(),
                        donation.getPlatform(),
                        donation.getDonorName(),
                        donation.getAmount(),
                        donation.getCurrency(),
                        donation.getMessage()
                );
                donationRepository.save(entity);
            } catch (Exception e) {
                log.warn("MySQL settlement save skipped (DB offline): {}", e.getMessage());
            }
        }

        broadcastEvent("DONATION_SETTLEMENT", donation);
    }

    private void broadcastEvent(String eventName, Object data) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name(eventName)
                        .data(data));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }
}
