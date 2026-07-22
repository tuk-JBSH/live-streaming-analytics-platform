# 📐 UI Naming & CSS Class Specification Guide

본 문서는 프론트엔드 개발 시 커스텀 CSS 클래스, HTML 고유 ID, 네이밍 컨벤션 및 역할을 명확히 규정하여 개발 중 혼동을 방지하고 일관성을 유지하기 위한 디자인/HTML 규격 명세서입니다.

---

## 🎨 1. Global CSS Classes (`src/app/globals.css`)

| Class / Variant | 적용 위치 | 역할 및 세부 스타일 규격 |
| :--- | :--- | :--- |
| **`html.dark` / `@custom-variant dark`** | `<html>` 최상위 태그 | 다크 모드 활성화 시 전체 대시보드 캔버스 및 하위 컴포넌트의 다크 테마 전환을 제어하는 최상위 선택자 |
| **`.custom-scrollbar`** | 채팅, 후원 피드 스크롤 영역 | 4px 가로폭의 슬림 커스텀 스크롤바. 라이트모드(`f1f5f9` / `cbd5e1`), 다크모드(`0f172a` / `334155`) |
| **`.sharp-card`** | 카드 및 차트 컨테이너 | 둥글지 않고 칼같이 각진 픽셀 모던 카드 스타일 규격 (`rounded-none` 기본 연동) |

---

## 🏷️ 2. HTML Unique Element IDs & Roles

자동화 테스트, SEO 및 DOM 접근 유지를 위한 주요 HTML 요소의 고유 ID 규격입니다.

| Element ID | 관련 컴포넌트 | 역할 및 설명 |
| :--- | :--- | :--- |
| **`#stream-header`** | `StreamHeader.tsx` | 대시보드 최상단 고정 헤더 영역 |
| **`#theme-toggle-btn`** | `StreamHeader.tsx` | 라이트 모드 ↔ 다크 모드 전환 스위치 버튼 |
| **`#sim-refresh-btn`** | `StreamHeader.tsx` | 시청자 수 더미 데이터 수집 시뮬레이션 갱신 버튼 |
| **`#live-status-btn`** | `StreamHeader.tsx` | 분석 시작 / 분석 중단 토글 버튼 |
| **`#stat-cards-container`**| `Dashboard.tsx` | 상단 핵심 지표 4종 메트릭 카드 그리드 컨테이너 |
| **`#stat-card-viewers`** | `StatCard.tsx` | 실시간 동시 시청자 수 카드 |
| **`#stat-card-donation`** | `StatCard.tsx` | 누적 후원 정산금 카드 |
| **`#stat-card-messages`** | `StatCard.tsx` | 수집 메시지 건수 카드 |
| **`#stat-card-sentiment`** | `StatCard.tsx` | 시청자 긍정 감정 비율 카드 |
| **`#viewer-chart-card`** | `ViewerCountChart.tsx` | 실시간 플랫폼 통합 동시 시청자 추이 시계열 차트 카드 |
| **`#chat-feed-card`** | `ChatFeed.tsx` | 통합 실시간 채팅 수집 및 필터링 피드 카드 |
| **`#chat-input-field`** | `ChatFeed.tsx` | 채팅 모뮬레이션 메시지 입력 폼 필드 |
| **`#donation-feed-card`** | `DonationAlert.tsx` | 실시간 후원 및 MySQL 정산 이벤트 릴레이 피드 카드 |
| **`#telemetry-footer-bar`**| `Dashboard.tsx` | 하단 Redis, Kafka, SSE 인프라 텔레메트리 상태 표시 바 |

---

## 🎨 3. Design System Color Palette Standard

| 목적 / 메트릭 | Light Theme | Dark Theme | 대표 사용 위치 |
| :--- | :--- | :--- | :--- |
| **YouTube Platform** | `#dc2626` (Red-600) | `#ef4444` (Red-500) | 유튜브 시청자 차트 라인, YT 채팅 뱃지 |
| **CHZZK Platform** | `#059669` (Emerald-600)| `#10b981` (Emerald-500)| 치지직 시청자 차트 라인, CH 채팅 뱃지 |
| **Donation / Settlement**| `#d97706` (Amber-600) | `#f59e0b` (Amber-500) | 후원 카드, 정산 금고 메트릭 |
| **Sentiment Positive** | `#e11d48` (Rose-600) | `#f43f5e` (Rose-500) | 긍정 감정 분석 비율 뱃지 |
| **Base Background** | `#f8fafc` (Slate-50) | `#090d16` (Deep Dark) | 메인 대시보드 캔버스 배경 |
| **Card Background** | `#ffffff` (Pure White) | `#0f172a` (Slate-900) | 각진 카드 및 모듈 컨테이너 배경 |
