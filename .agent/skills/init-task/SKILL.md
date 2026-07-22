---
name: init-task
description: 현재 진행 중인 태스크 및 마일스톤 상태를 동기화하고 오늘 할 일을 파악하는 워크플로우
---

# 🔄 Current Task Initialization & Sync Workflow

이 스킬은 세션 시작 시 또는 현재 진행 중인 작업 상태와 탑 우선순위 태스크를 동기화할 때 실행합니다.

## 1. 필수 읽기 대상 파일
- [current_state.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/current_state.md)
- [brain_index.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/brain_index.md)

## 2. 점검 및 동기화 절차
1. `brain/current_state.md`를 열어 **현재 활성화된 마일스톤 (Active Milestone)**을 확인합니다.
2. **탑 우선순위 태스크 (Top Priority Tasks)** 목록 중 '진행 중' 또는 '미완료' 항목을 추출합니다.
3. 가장 최근 히스토리가 필요한 경우 `brain_index.md`에서 해당 파트 마크다운(예: `history_part1.md`)을 참조합니다.

## 3. 사용자 브리핑 포맷
```markdown
### 📌 현재 작업 상태 동기화 완료
- **진행 중인 마일스톤:** [Phase X: 마일스톤 이름]
- **최우선 진행 태스크:** 
  1. [태스크 1]
  2. [태스크 2]
- **다음 추천 작업:** [추천 작업 브리핑]
```
