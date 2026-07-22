# 프로젝트 아키텍처 및 기술 명세서 (Architecture & Tech Spec)

## 실시간 라이브 스트리밍 분석 플랫폼

### 목적
- 유튜브/치지직 채팅 수집
- 실시간 분석
- 시청자 통계
- 후원 정산

---

### 아키텍처

```
API
 ↓
Kafka
 ↓
Consumer
 ↓
Redis
 ↓
SSE/WebSocket
 ↓
React

MySQL
InfluxDB
```

---

### 기술스택

#### Backend
- Spring Boot 4.1.0 (JDK 21, Virtual Threads)
- Kafka
- Redis
- MySQL
- InfluxDB

#### Frontend
- React
- Next.js
- Zustand
- Tailwind Css

---

### 원칙
- CQRS
- Event Driven
- Redis는 조회전용
- MySQL은 정산전용
- InfluxDB는 시계열 전용

---

## **절대 지켜야 하는 규칙**

- Controller는 Service만 호출
- Service는 Repository만 호출
- Consumer는 Controller 호출 금지
- Redis는 Materialized View만 저장

---

## 폴더 구조 명세

### backend
```
controller
service
consumer
producer
entity
repository
dto
config
redis
kafka
websocket
sse
```

### frontend
```
components
hooks
stores
pages
api
chart
types
```
