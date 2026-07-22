---
name: finish-task
description: 완료된 작업을 요약하여 brain/current_state.md 및 brain/history_partX.md에 기록하고 저널링하는 마무리 워크플로우
---

# 🏁 Task Completion & Brain Journaling Workflow

이 스킬은 주요 단위 기능 개발 완료, 버그 수정 완료, 혹은 세션 종료 전 작업 결과를 뇌(/brain)에 기록할 때 실행합니다.

## 1. 대상 파일
- [current_state.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/current_state.md)
- [brain_index.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/brain_index.md)
- 최신 history 파트 파일 (예: [history_part1.md](file:///c:/Users/JSH/Desktop/Live-streaming-data-analysis-platform/brain/history_part1.md))

## 2. 저널링 절차
1. `brain/current_state.md`의 **탑 우선순위 태스크** 목록에서 완료된 항목을 업데이트합니다.
2. `brain/history_partX.md` 타임라인에 현재 시각, 작업 요약, 변경된 핵심 파일, 태그(#backend, #kafka, #docker 등)를 기록합니다.
3. 히스토리 파일 용량이 커질 경우 새로운 `history_part(N+1).md`를 분할 생성하고 `brain_index.md`에 파트 요약을 기록합니다.

## 3. 사용자 보고 포맷
```markdown
### 🏁 작업 완료 및 Brain 저널링 완료
- **완료된 작업:** [완료 내용]
- **업데이트된 파일:** [수정/생성된 코드 파일 목록]
- **Brain 기록 상태:** `current_state.md` 및 `history_partX.md` 업데이트 완료
```
