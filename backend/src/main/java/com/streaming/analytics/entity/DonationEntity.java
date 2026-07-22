package com.streaming.analytics.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
public class DonationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventId;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = false)
    private String donorName;

    @Column(nullable = false)
    private double amount;

    private String currency;

    @Column(length = 1000)
    private String message;

    private LocalDateTime createdAt;

    public DonationEntity() {}

    public DonationEntity(String eventId, String platform, String donorName, double amount, String currency, String message) {
        this.eventId = eventId;
        this.platform = platform;
        this.donorName = donorName;
        this.amount = amount;
        this.currency = currency;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getEventId() { return eventId; }
    public String getPlatform() { return platform; }
    public String getDonorName() { return donorName; }
    public double getAmount() { return amount; }
    public String getCurrency() { return currency; }
    public String getMessage() { return message; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setEventId(String eventId) { this.eventId = eventId; }
    public void setPlatform(String platform) { this.platform = platform; }
    public void setDonorName(String donorName) { this.donorName = donorName; }
    public void setAmount(double amount) { this.amount = amount; }
    public void setCurrency(String currency) { this.currency = currency; }
    public void setMessage(String message) { this.message = message; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
