# 현재 아키텍처 및 상태

## 핵심 라이브러리 스택
- Backend: Spring Boot 4.1.0+ (JDK 21, Virtual Threads), Kafka, Redis, MySQL, InfluxDB
- Frontend: React, Next.js 16, Zustand
- 인프라: Docker Compose (Phase 1), GKE (향후)


## 활성화된 마일스톤
- **Phase 1 (완료):** 백엔드 기반 및 인프라 (Spring Boot 4.1.0, MySQL/Redis/Kafka docker-compose 작성)
- **Git 저장소 구축 및 푸시 (완료):** 모노레포 `git init` 완료, 민감정보 `.gitignore` 적용, `main`/`dev`/`frontend`/`backend` 및 `infra/*` 7개 브랜치 구축 및 `origin` 원격 동기화 완료.
- **Phase 2 & 3 (완료 - 백엔드 코어 완공):** 
  - Spring Boot SSE 컨트롤러 (`StreamEventController`), Redis Materialized View 및 MySQL 정산 서비스 (`StreamEventService`, `DonationRepository`) 구축 완료.
  - Kafka Consumer (`KafkaStreamConsumer`) 3개 토픽 (`stream-chats`, `stream-viewers`, `stream-donations`) 수신 로직 구축 완료.
- **Phase 4 (완료):** React/Next.js 프론트엔드 대시보드 구축 및 백엔드 SSE 연동 (`useStreamingSSE.ts`) 완료.

## 탑 우선순위 태스크
1. `docker-compose.yml` (MySQL, Redis, Kafka) 컨테이너 구동 및 백엔드 Spring Boot 실행
2. 백엔드 REST 시뮬레이션 엔드포인트 (`/api/v1/stream/simulate/*`)를 통한 실시간 SSE 데이터 송수신 통합 테스트



