# History Part 1

## 2026-07-03T21:29+09:00 (KST)
- **주요 변경점**: Phase 1 백엔드 기반 및 인프라 세팅 완료.
  - JDK 21 및 Spring Boot 4.1.0 (가상 스레드 활성화) 스캐폴딩.

  - `docker-compose.yml` (MySQL, Redis, Kafka KRaft 모드) 추가.
  - Spring Boot 내 `DummyKafkaRunner`와 `DummyKafkaConsumer` 작성하여 더미 데이터 송수신 테스트 로직 구현.
  - *비고*: Docker 환경 부재로 인해 로컬 컨테이너 직접 구동은 대기 상태임.
- **관련 태그**: #setup #springboot #kafka #docker #redis #mysql

## 2026-07-22T19:44+09:00 (KST)
- **주요 변경점**: 세션 시작 전 문서 로딩 워크플로우 쪼개기 및 전문 스킬 유닛 생성.
  - `.agent/skills/` 디렉토리에 쪼개진 워크플로우 스킬 6종 생성 (`init-task`, `init-backend`, `init-frontend`, `init-infra`, `init-project`, `finish-task`).
  - `brain/WORKFLOW_COMMANDS.md` 명령어 매뉴얼 및 가이드 문서 작성.
- **관련 태그**: #workflow #skills #brain #documentation

## 2026-07-22T19:53+09:00 (KST)
- **주요 변경점**: Phase 4 프론트엔드 플랫폼 구축 및 스캐폴딩 완료.
  - Next.js (TypeScript, App Router) 프로젝트 생성 및 `READ_ME.md` 지정 7대 디렉토리 구조 (`components`, `hooks`, `stores`, `chart`, `api`, `types`, `app`) 100% 준수.
  - Zustand 실시간 스트리밍 스토어 (`useStreamingStore.ts`) 및 Recharts 시계열 동시 시청자 차트 (`ViewerCountChart.tsx`) 구현.
  - 유튜브 vs 치지직 실시간 수집 채팅 피드, 정산 이벤트 알림 및 모듈레이션 UI 대시보드 (`Dashboard.tsx`) 완성.
  - `npm run build` 프로덕션 빌드 성공 검증 완료.
- **관련 태그**: #frontend #nextjs #zustand #recharts #dashboard #ui

## 2026-07-22T20:08+09:00 (KST)
- **주요 변경점**: UI Naming & CSS Class 표준 명세서 문서화 및 코드 반영.
  - `frontend/UI_NAMING_GUIDE.md` 문서 작성 (글로벌 CSS 유틸리티, HTML unique ID 규격, 컬러 스펙트럼 표정리).
  - 프론트엔드 핵심 컴포넌트(`StreamHeader`, `StatCard`, `Dashboard`, `ViewerCountChart`)에 고유 ID 표기 반영.
- **관련 태그**: #frontend #css #ui-naming #documentation #seo

## 2026-07-22T20:18+09:00 (KST)
- **주요 변경점**: 백엔드 SSE 컨트롤러, Kafka Consumer, Redis In-Memory View 및 MySQL 정산 서비스 연동 구축.
  - `StreamEventController.java`: SSE 실시간 이벤트 전송 엔드포인트 (`/api/v1/stream/events`) 및 시뮬레이션 REST API 3종 개발 (Layered Architecture 규칙 준수).
  - `KafkaStreamConsumer.java`: Kafka 3개 토픽 (`stream-chats`, `stream-viewers`, `stream-donations`) 수신 및 서비스 층 연결 (Consumer 규칙 준수).
  - `StreamEventService.java`: Redis Materialized View 갱신 및 SseEmitter 브로드캐스팅.
  - `DonationEntity.java` & `DonationRepository.java`: MySQL ACID 정산 트랜잭션 기록소 구축.
  - `frontend/src/api/sse.ts` & `useStreamingSSE.ts`: 프론트엔드-백엔드 실시간 SSE 수신 모듈 100% 바인딩.
- **관련 태그**: #backend #sse #kafka #redis #mysql #springboot #frontend-integration

## 2026-07-22T20:28+09:00 (KST)
- **주요 변경점**: 전체 프로젝트 문서 스펙 동기화 (Spring Boot 4.1.0+ & JDK 21 Virtual Threads 전면 명시).
  - `READ_ME.md`, `current_state.md`, `history_part1.md` 전체 문서 검토 및 Spring Boot 4.1.0+ 버전 사양 통합 완료.
- **관련 태그**: #documentation #springboot #jdk21 #sync

## 2026-07-22T20:34+09:00 (KST)
- **주요 변경점**: READ_ME.md 문서 전면 개편.
  - 빠른 실행 방법 (백엔드 `.\gradlew.bat bootRun`, 프론트엔드 `npm run dev`, 인프라 `docker-compose up -d`) 명시.
  - 현재까지 완공된 Backend Core (Spring Boot 4.1.0, SSE `/api/v1/stream/events`, Kafka 3개 토픽 컨슈머, Redis/MySQL 정산, 스마트 오프라인 폴백 및 2초 더미 파이프라인 생성기) & Frontend UI (Next.js 16, Zustand, Recharts, 화이트 모던 테마 & 다크모드 토글 스위치) 구현 스펙 완벽 정리.
- **관련 태그**: #readme #documentation #quickstart #specs

## 2026-07-22T20:36+09:00 (KST)
- **주요 변경점**: 초기 원본 기술 명세 보존 문서 ARCHITECTURE_SPEC.md 신설.
  - 목적, 아키텍처 텍스트 맵, 원칙(CQRS, Event Driven), 절대 지켜야 하는 규칙 4가지 및 backend/frontend 19개 지정 폴더 구조 원본 100% 보존 저장.
- **관련 태그**: #architecture #tech-spec #documentation #rules

## 2026-07-22T20:47+09:00 (KST)
- **주요 변경점**: Git 저장소 초기화 및 풀스택/DevOps 2인 맞춤형 브랜치 구조 구축 완료.
  - 루트 `.gitignore` 작성 (`node_modules`, `.next`, `build`, `.env*` 등 민감정보 및 빌드 아티팩트 100% 차단).
  - 기존 프로젝트 코드를 4단계 논리적 분할 커밋으로 이력 정리 (`documentation`, `infra & brain`, `backend`, `frontend`).
  - 브랜치 구조 세팅 완료:
    - 앱 풀스택 (사용자): `main`, `dev`, `frontend`, `backend`
    - 인프라/클라우드 (팀원): `infra/docker`, `infra/k8s`, `infra/cloud`
- **관련 태그**: #git #repository #branching-strategy #monorepo #devops








