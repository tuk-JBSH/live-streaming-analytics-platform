# 🛠️ 프로젝트 전용 읽기 및 작업 시작 워크플로우 명령어 매뉴얼

작업 시작 전 불필요하게 전체 문서를 다 읽지 않고, **작업 목적(백엔드/프론트엔드/현재태스크/인프라 등)에 맞는 쪼개진 컨텍스트만 정교하게 읽어 토큰을 절약하고 빠르게 시작**할 수 있도록 설계된 워크플로우 명령어 모음입니다.

---

## 📋 명령어 모음 요약

| 명령어 / 키워드 | 목적 및 용도 | 읽는 대상 파일 목록 |
| :--- | :--- | :--- |
| **`/init-task`**<br>(`현재 작업 정의`, `태스크 동기화`) | 현재 마일스톤 및 오늘 할 탑 우선순위 태스크 파악 | `brain/current_state.md`<br>`brain/brain_index.md` |
| **`/init-backend`**<br>(`백엔드 시작`, `백엔드 워크플로우`) | 백엔드 개발 시작 전 규칙, 레이어링, DB/Kafka 설정 로딩 | `READ_ME.md` (Backend)<br>`brain/current_state.md`<br>`backend/application.yml`<br>`docker-compose.yml` |
| **`/init-frontend`**<br>(`프론트엔드 시작`, `프론트 워크플로우`) | 프론트엔드 UI, React/Next.js/Zustand, SSE/WS 규격 로딩 | `READ_ME.md` (Frontend)<br>`brain/current_state.md` |
| **`/init-infra`**<br>(`인프라 시작`, `도커 설정 읽기`) | Kafka, Redis, MySQL, InfluxDB 및 Docker 포트/상태 점검 | `docker-compose.yml`<br>`READ_ME.md` (원칙)<br>`backend/application.yml` |
| **`/init-project`**<br>(`프로젝트 개요`, `전체 사양 읽기`) | 전체 프로젝트 아키텍처, 비전 및 절대 규칙 5가지 파악 | `READ_ME.md`<br>`brain/current_state.md`<br>`docker-compose.yml` |
| **`/learn-code`**<br>(`코드 학습`, `클론코딩 가이드`) | 프론트/백엔드 추천 학습 순서, 20자 역할 요약 및 실무 팁 로딩 | `CODE_LEARNING_GUIDE.md`<br>`backend_portfolio_tips_final.md` |
| **`/finish-task`**<br>(`작업 완료`, `기록 마무리`) | 작업 완료 후 `brain` 기록 및 마일스톤 상태 갱신 | `brain/current_state.md`<br>`brain/history_partX.md` |


---

## 💡 사용 방법

### 1. 명령어 입력 시 (슬래시 명령어 또는 자연어)
채팅창에 아래와 같이 요청하면 에이전트가 해당 워크플로우를 즉시 실행합니다:
- *"백엔드 시작해줘"* 또는 `init-backend`
- *"현재 작업 정의 읽고 상태 알려줘"* 또는 `init-task`
- *"프론트엔드 워크플로우 시작"* 또는 `init-frontend`
- *"인프라 설정 점검해줘"* 또는 `init-infra`
- *"오늘 작업 끝났으니 기록해줘"* 또는 `finish-task`

### 2. 에이전트 자동 동작 방식
에이전트는 각 명령어 실행 요청을 받으면 지정된 파일만 선택적으로 조회하여 필요한 규칙(Layered Architecture, CQRS, DB 역할 분담 등)을 복습하고 준비된 브리핑 결과를 제시합니다.
