package com.streaming.analytics.producer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DummyKafkaRunner implements CommandLineRunner {

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public void run(String... args) throws Exception {
        if (kafkaTemplate == null) {
            log.info("KafkaTemplate is not active (Kafka Broker is offline). Skipping initial DummyKafkaRunner.");
            return;
        }

        log.info("Starting to produce dummy messages to Kafka...");
        
        Thread.ofVirtual().start(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    String dummyMessage = String.format("{\"chatMessage\":\"Test Message %d\", \"timestamp\":\"%s\"}", i, System.currentTimeMillis());
                    kafkaTemplate.send("live.chat.raw", "dummy_streamer", dummyMessage);
                    log.info("Produced message: {}", dummyMessage);
                    Thread.sleep(2000);
                }
            } catch (Exception e) {
                log.warn("Dummy producer send skipped: {}", e.getMessage());
            }
        });
    }
}
