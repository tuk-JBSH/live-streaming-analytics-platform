package com.streaming.analytics.producer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streaming.analytics.dto.StreamEventDto;
import com.streaming.analytics.service.StreamEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
@EnableScheduling
public class DummyDataGeneratorService {

    private static final Logger log = LoggerFactory.getLogger(DummyDataGeneratorService.class);

    private final ObjectMapper objectMapper;
    private final StreamEventService streamEventService;
    private final Random random = new Random();

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    private int baseYoutube = 1800;
    private int baseChzzk = 1400;

    private static final String[] SAMPLE_CHATS = {
        "오늘 방송 화질 진짜 깔끔하네요!! 🔥",
        "치지직 동시 시청자 수 계속 올라간다!",
        "Kafka 파이프라인 처리 속도 12ms 실화냐 🚀",
        "후원 정산 시스템 잘 구축했네요 👏",
        "유튜브랑 치지직 양방향 스트리밍 대박",
        "Spring Boot 가상 스레드 덕분에 완전 빠름 ⚡",
        "대시보드 라이트 모드 디자인 완전 깔끔함!"
    };

    private static final String[] SAMPLE_USERS = {
        "스트림매니아", "치즈마스터", "코딩왕", "LiveFan99", "GamerX", "데이터분석가"
    };

    public DummyDataGeneratorService(ObjectMapper objectMapper, StreamEventService streamEventService) {
        this.objectMapper = objectMapper;
        this.streamEventService = streamEventService;
    }

    /**
     * Every 2 seconds generate live streaming data
     */
    @Scheduled(fixedRate = 2000)
    public void generateMockData() {
        String nowStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        // 1. Viewer Count Fluctuations
        baseYoutube += random.nextInt(60) - 28;
        baseChzzk += random.nextInt(50) - 23;
        baseYoutube = Math.max(500, baseYoutube);
        baseChzzk = Math.max(400, baseChzzk);

        StreamEventDto.ViewerUpdate viewerUpdate = new StreamEventDto.ViewerUpdate(
                "live-001", baseYoutube, baseChzzk, nowStr
        );

        sendOrProcess("stream-viewers", viewerUpdate, () -> streamEventService.processViewerUpdate(viewerUpdate));

        // 2. Chat Message (70% probability per tick)
        if (random.nextDouble() < 0.7) {
            String platform = random.nextBoolean() ? "youtube" : "chzzk";
            String username = SAMPLE_USERS[random.nextInt(SAMPLE_USERS.length)];
            String msg = SAMPLE_CHATS[random.nextInt(SAMPLE_CHATS.length)];
            
            StreamEventDto.ChatMessage chat = new StreamEventDto.ChatMessage(
                    String.valueOf(System.currentTimeMillis()),
                    platform, username, msg, nowStr, "positive"
            );

            sendOrProcess("stream-chats", chat, () -> streamEventService.processChatMessage(chat));
        }

        // 3. Donation Event (25% probability per tick)
        if (random.nextDouble() < 0.25) {
            String platform = random.nextBoolean() ? "youtube" : "chzzk";
            String donor = SAMPLE_USERS[random.nextInt(SAMPLE_USERS.length)] + "_후원자";
            int amount = (random.nextInt(10) + 1) * 10000;

            StreamEventDto.DonationEvent donation = new StreamEventDto.DonationEvent(
                    String.valueOf(System.currentTimeMillis()),
                    platform, donor, amount, "KRW", "방송 화이팅입니다! 응원합니다 🎉", nowStr
            );

            sendOrProcess("stream-donations", donation, () -> streamEventService.processDonation(donation));
        }
    }

    private void sendOrProcess(String topic, Object dto, Runnable fallbackProcess) {
        try {
            String json = objectMapper.writeValueAsString(dto);
            if (kafkaTemplate != null) {
                kafkaTemplate.send(topic, json);
                log.info("Mock Producer Published to Kafka [{}]: {}", topic, json);
            } else {
                // Fallback to direct SSE broadcast if local Kafka Broker is offline
                fallbackProcess.run();
            }
        } catch (Exception e) {
            log.warn("Mock Producer fallback to SSE direct broadcast due to: {}", e.getMessage());
            fallbackProcess.run();
        }
    }
}
