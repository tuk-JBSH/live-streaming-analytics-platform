# 🚀 실시간 라이브 스트리밍 분석 플랫폼 (Live-Streaming Data Analysis Platform)

유튜브(YouTube) 및 치지직(CHZZK) 플랫폼의 실시간 라이브 스트리밍 데이터(동시 시청자 수, 수집 채팅, 후원 이벤트)를 실시간 분석하고 시각화하는 이벤트 기반(Event-Driven) 대시보드 플랫폼입니다.

> 📖 **원작 아키텍처 및 상세 기술 규격서:** [ARCHITECTURE_SPEC.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/ARCHITECTURE_SPEC.md)

---


## 💻 빠른 실행 방법 (Quick Start Guide)

### 1. 백엔드 실행 (Backend Service)
Spring Boot 4.1.0 기반으로 8080 포트에서 실행되며, 2초 주기 자동 더미 파이프라인 및 SSE 스트림을 제공합니다.
```powershell
cd backend
.\gradlew.bat bootRun
```
- **SSE 실시간 스트림 엔드포인트:** `http://localhost:8080/api/v1/stream/events`
- **시뮬레이션 REST API:** `POST /api/v1/stream/simulate/viewer`, `chat`, `donation`

### 2. 프론트엔드 실행 (Frontend Dashboard)
Next.js 16 및 Zustand 기반으로 3000 포트에서 실행됩니다.
```powershell
cd frontend
npm run dev
```
- **접속 주소:** `http://localhost:3000`
- **화면 구성:** 화이트 모던 스타일 (기본) 및 상단 다크모드 토글 스위치 제공

### 3. 로컬 인프라 구동 (Docker Desktop 필요 시)
```powershell
docker-compose up -d
```
- **MySQL 8.0:** `localhost:3306` (정산 DB)
- **Redis:** `localhost:6379` (In-Memory Materialized View)
- **Kafka (KRaft):** `localhost:9092` (메시지 버스)

---

## 🛠️ 현재까지 구현 완료된 핵심 스펙 (Implementation Specs)

### 1. Backend Core Architecture (Spring Boot 4.1.0 + JDK 21)
- **가상 스레드 (Virtual Threads):** High Throughput 이벤트를 대용량 처리할 수 있도록 Virtual Threads 활성화
- **실시간 SSE 컨트롤러 (`StreamEventController`):** Server-Sent Events 기반 실시간 데이터 브로드캐스팅 (`/api/v1/stream/events`)
- **Kafka 스트림 파이프라인 (`KafkaStreamConsumer` & `DummyDataGeneratorService`):**
  - 3개 주요 토픽 (`stream-chats`, `stream-viewers`, `stream-donations`)
  - 2초 주기의 다이내믹 더미 생성기 및 브로커 미구동 시 자동 SSE Direct Broadcast 폴백 엔진
- **데이터베이스 역할 분담:**
  - **Redis:** Materialized View (조회 전용 실시간 시청자 수, 최근 채팅 50개)
  - **MySQL:** `DonationEntity` & `DonationRepository` 기반 ACID 정산 트랜잭션 기록소

### 2. Frontend Modern Dashboard (Next.js 16 + Zustand + Tailwind CSS)
- **화이트 모던 테마 & 샤프 디자인:** 깔끔한 라이트모드 기본 캔버스 및 각진 픽셀 카드 구조 (`rounded-none`)
- **다크 모드 토글 (Dark/Light Mode Switch):** 상단 헤더 Sun ☀️ / Moon 🌙 아이콘 스위치를 통한 실시간 테마 전환
- **실시간 시계열 통합 차트 (`ViewerCountChart`):** Recharts 기반 유튜브 vs 치지직 시청자 수 추이 & 점유율(%) 프로그레스 탭
- **실시간 수집 채팅 피드 (`ChatFeed`):** YT/CH 플랫폼 필터링 탭, 긍정 감정 NLP 뱃지, 실시간 전송 모뮬레이션
- **후원 정산 릴레이 피드 (`DonationAlert`):** 슈퍼챗/치즈 정산 이벤트 릴레이
- **표준 UI 명세 준수:** [frontend/UI_NAMING_GUIDE.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/frontend/UI_NAMING_GUIDE.md) 고유 ID 및 CSS 유틸리티 규격 준수

### 3. Agent & Brain Workflow System
세션 시작 시 토픽별 컨텍스트를 분리해서 읽어 토큰을 절약하는 쪼개진 6대 스킬 명령어 구축 ([brain/WORKFLOW_COMMANDS.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/WORKFLOW_COMMANDS.md)):
- `/init-task`: 현재 진행 마일스톤 및 오늘 할일 파악
- `/init-backend`: 백엔드 레이어링 원칙 및 DB/Kafka 설정 로딩
- `/init-frontend`: 프론트엔드 UI 스택 및 SSE/WS 규격 로딩
- `/init-infra`: Docker Compose 및 인프라 포트 점검
- `/init-project`: 프로젝트 전체 비전 및 5대 절대 규칙 확인
- `/finish-task`: 작업 결과 `brain/current_state.md` 및 `history_partX.md` 저널링

---

## 🏗️ 시스템 아키텍처 및 절대 규칙

```
API / Producer
     ↓
Kafka (stream-viewers, stream-chats, stream-donations)
     ↓
Consumer (KafkaStreamConsumer)
     ↓
Redis (In-Memory View) / MySQL (정산 DB) / InfluxDB (시계열)
     ↓
SSE / WebSocket (StreamEventController)
     ↓
React / Next.js Dashboard (useStreamingSSE)
```

### 📌 절대 준수 규칙 5가지
1. **Controller는 Service만 호출** (Repository 직접 호출 금지)
2. **Service는 Repository만 호출**
3. **Consumer는 Controller 호출 금지** (이벤트 기반 바인딩)
4. **Redis는 Materialized View만 저장** (조회 전용)
5. **MySQL은 정산 전용, InfluxDB는 시계열 전용**