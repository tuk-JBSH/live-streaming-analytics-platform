---
name: init-project
description: 프로젝트 전체 개요(READ_ME, Project.md/PDF, 전체 아키텍처)를 로딩하는 종합 워크플로우
---

# 🚀 Project Overview & Architecture Initialization Workflow

이 스킬은 전체 프로젝트 사양을 파악하거나 신규 기능을 종합적으로 설계할 때 실행합니다.

## 1. 필수 읽기 대상 파일
- [READ_ME.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/READ_ME.md)
- [current_state.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/current_state.md)
- [docker-compose.yml](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/docker-compose.yml)

## 2. 점검 및 로딩 항목
1. **플랫폼 전체 비전:** 라이브 스트리밍(유튜브/치지직) 데이터 실시간 분석, 통계, 후원 정산
2. **아키텍처 파이프라인:** API → Kafka → Consumer → Redis/InfluxDB/MySQL → SSE/WebSocket → React
3. **절대 규칙 5가지:**
   - Controller는 Service만 호출
   - Service는 Repository만 호출
   - Consumer는 Controller 호출 금지
   - Redis는 Materialized View만 저장

## 3. 사용자 브리핑 포맷
```markdown
### 🚀 프로젝트 전체 개요 로딩 완료
- **프로젝트 명:** 실시간 라이브 스트리밍 분석 플랫폼
- **현재 마일스톤:** [전체 마일스톤 중 진행 단계]
- **주요 파이프라인:** API -> Kafka -> Consumer -> DB/Redis -> UI
```
