package com.streaming.analytics.controller;

import com.streaming.analytics.dto.StreamEventDto;
import com.streaming.analytics.service.StreamEventService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/stream")
@CrossOrigin(origins = "*")
public class StreamEventController {

    private final StreamEventService streamEventService;

    public StreamEventController(StreamEventService streamEventService) {
        this.streamEventService = streamEventService;
    }

    /**
     * SSE Real-time Streaming Event Endpoint
     */
    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeStreamEvents() {
        return streamEventService.subscribeEvents();
    }

    /**
     * REST API Simulation Endpoint for Viewer Counts
     */
    @PostMapping("/simulate/viewer")
    public ResponseEntity<String> simulateViewerCount(
            @RequestParam(defaultValue = "1500") int youtube,
            @RequestParam(defaultValue = "1200") int chzzk) {
        
        StreamEventDto.ViewerUpdate update = new StreamEventDto.ViewerUpdate(
                "live-001",
                youtube,
                chzzk,
                LocalDateTime.now().toString()
        );
        streamEventService.processViewerUpdate(update);
        return ResponseEntity.ok("Viewer count updated");
    }

    /**
     * REST API Simulation Endpoint for Chat
     */
    @PostMapping("/simulate/chat")
    public ResponseEntity<String> simulateChat(
            @RequestParam(defaultValue = "youtube") String platform,
            @RequestParam(defaultValue = "StreamUser") String username,
            @RequestParam(defaultValue = "Hello Stream!") String message) {

        StreamEventDto.ChatMessage chat = new StreamEventDto.ChatMessage(
                String.valueOf(System.currentTimeMillis()),
                platform,
                username,
                message,
                LocalDateTime.now().toString(),
                "positive"
        );
        streamEventService.processChatMessage(chat);
        return ResponseEntity.ok("Chat message broadcasted");
    }

    /**
     * REST API Simulation Endpoint for Donation
     */
    @PostMapping("/simulate/donation")
    public ResponseEntity<String> simulateDonation(
            @RequestParam(defaultValue = "chzzk") String platform,
            @RequestParam(defaultValue = "SupporterA") String donorName,
            @RequestParam(defaultValue = "10000") double amount,
            @RequestParam(defaultValue = "KRW") String currency,
            @RequestParam(defaultValue = "Keep up the good work!") String message) {

        StreamEventDto.DonationEvent donation = new StreamEventDto.DonationEvent(
                String.valueOf(System.currentTimeMillis()),
                platform,
                donorName,
                amount,
                currency,
                message,
                LocalDateTime.now().toString()
        );
        streamEventService.processDonation(donation);
        return ResponseEntity.ok("Donation settlement recorded");
    }
}
