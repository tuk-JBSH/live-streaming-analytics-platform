---
name: init-frontend
description: 프론트엔드 개발 전용 컨텍스트(React, Next.js, Zustand, SSE/WebSocket 연동, UI 컴포넌트)를 읽고 준비하는 워크플로우
---

# 🎨 Frontend Development Context Initialization Workflow

이 스킬은 프론트엔드 UI 개발, 상태관리 설계, 실시간 데이터 연동(SSE/WebSocket) 작업을 시작하기 전 컨텍스트를 로딩할 때 실행합니다.

## 1. 필수 읽기 대상 파일
- [READ_ME.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/READ_ME.md) (Frontend 파트, 기술 스택, 폴더 구조)
- [current_state.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/current_state.md) (Phase 4, 5 마일스톤)

## 2. 필수 검증 및 체크리스트
1. **기술 스택 준수:**
   - React / Next.js / Zustand (전역 상태 관리)
   - 차트 및 라이브 스트리밍 시각화 UI
2. **실시간 파이프라인 수신 구조 파악:**
   - SSE (Server-Sent Events) 및 WebSocket을 통한 실시간 데이터 수신 구조
3. **폴더 구조 원칙:**
   - `components`, `hooks`, `stores`, `pages`, `api`, `chart`, `types` 명세 준수

## 3. 사용자 브리핑 포맷
```markdown
### 🎨 프론트엔드 개발 컨텍스트 로딩 완료
- **적용 기술 스택:** Next.js / React / Zustand / SSE / WebSocket
- **현재 프론트엔드 상태:** [프론트엔드 구축 현황 및 API 연동 준비 상태]
- **준비된 다음 작업:** [프론트엔드 개발 태스크]
```
