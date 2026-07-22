---
name: init-infra
description: 인프라 환경(Docker Compose, Kafka, Redis, MySQL, InfluxDB) 컨텍스트를 점검하고 읽는 워크플로우
---

# 🐳 Infrastructure & Docker Context Initialization Workflow

이 스킬은 인프라 환경 구축, Docker 서비스 변경, DB/Kafka 설정 점검 작업을 시작하기 전 컨텍스트를 로딩할 때 실행합니다.

## 1. 필수 읽기 대상 파일
- [docker-compose.yml](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/docker-compose.yml)
- [READ_ME.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/READ_ME.md) (원칙 파트: CQRS, Event Driven)
- [application.yml](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/backend/src/main/resources/application.yml)

## 2. 필수 검증 및 체크리스트
1. **Docker 컨테이너 구성 포트 및 서비스:**
   - MySQL: 3306
   - Redis: 6379
   - Kafka (KRaft 모드): 9092
   - InfluxDB
2. **데이터 흐름 및 파이프라인 원칙:**
   - API -> Kafka -> Consumer -> (Redis / InfluxDB / MySQL) -> SSE/WebSocket -> React

## 3. 사용자 브리핑 포맷
```markdown
### 🐳 인프라 컨텍스트 로딩 완료
- **컨테이너 서비스:** MySQL, Redis, Kafka(KRaft), InfluxDB
- **포트 및 바인딩 상태:** [Docker 포트 점검 요약]
- **준비된 인프라 태스크:** [인프라 및 연결 설정 작업]
```
