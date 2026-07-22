---
name: init-backend
description: 백엔드 개발 전용 컨텍스트(아키텍처 규칙, Spring Boot, Kafka, DB, Redis 설정)를 읽고 준비하는 워크플로우
---

# ☕ Backend Development Context Initialization Workflow

이 스킬은 백엔드 기능 개발, 리팩토링, 버그 수정 등을 시작하기 직전 백엔드 필수 규칙과 컨텍스트를 로딩할 때 실행합니다.

## 1. 필수 읽기 대상 파일
- [READ_ME.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/READ_ME.md) (Backend 파트 및 절대 지켜야 하는 규칙)
- [current_state.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/current_state.md) (Backend 관련 마일스톤)
- [application.yml](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/backend/src/main/resources/application.yml)
- [docker-compose.yml](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/docker-compose.yml) (포트 및 연동 서비스)

## 2. 필수 검증 및 체크리스트
1. **아키텍처 레이어 원칙 준수 여부:**
   - Controller는 Service만 호출
   - Service는 Repository만 호출
   - Consumer는 Controller 호출 금지
2. **데이터베이스 역할 분담 원칙:**
   - Redis: Materialized View (조회전용)
   - MySQL: 정산전용
   - InfluxDB: 시계열 전용
3. **환경 설정 검증:**
   - `application.yml`의 MySQL(3306), Redis(6379), Kafka(9092), InfluxDB 설정 일치 여부 확인

## 3. 사용자 브리핑 포맷
```markdown
### ☕ 백엔드 개발 컨텍스트 로딩 완료
- **적용 규칙:** Layered Architecture 원칙 (Controller->Service->Repo) & DB 역할 분담 준수
- **현재 백엔드 상태:** [Spring Boot 설정 및 연동 상태 요약]
- **준비된 다음 작업:** [백엔드 구현/수정 태스크 내용]
```
