package com.streaming.analytics.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DummyKafkaConsumer {

    @KafkaListener(topics = "live.chat.raw", groupId = "analytics-group")
    public void consumeRawChat(String message) {
        // 가상 스레드 환경에서 동작하는지 스레드 이름도 함께 출력해볼 수 있습니다.
        log.info("[Consumer Thread: {}] Received raw chat: {}", Thread.currentThread().getName(), message);
    }
}
