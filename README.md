# 📱 QuickWise

> **"일정 10분 전, 딱 필요한 콘텐츠가 알림으로 도착합니다"**  
> QuickWise는 Google Calendar 일정에 맞는 강연 영상을 찾아 Gemini로 요약하고, 준비 카드를 만들어 일정 10분 전에 알려 주는 Android 애플리케이션입니다.

<br/>

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-OAuth_&_APIs-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/)

---

**📅 개발 기간**: 2025.09 ~ 2025.12 (핵심 기능 약 4주, 이후 알림 모듈 구조 전환·버그 수정)  
**🧑‍💻 개발 인원**: 1인 (기획, 디자인, 개발)  

<br/>

## 🔧 핵심 구현

- **Google OAuth 2.0:** 모바일 `serverAuthCode`를 서버에서 Refresh Token으로 교환해 토큰 갱신을 서버에서 관리
- **AI 파이프라인 재시도·비용 통제:** 실패 원인을 할당량 초과·일시 오류·미지원 카테고리로 나눠 재시도를 제한하고(앱 최대 3회), 요약에 넣는 자막을 10,000자로 제한
- **콘텐츠 출처 한정:** 세바시 채널의 5분 이상 영상만 검색
- **알림 예약:** Kotlin 네이티브 모듈에서 AlarmManager `setExactAndAllowWhileIdle`로 일정 10분 전 알림을 예약해 Doze 상태에서도 실행 허용

<br/>

---

<br/>

# 📱 주요 화면

<br/>

## 홈 화면 - 다음 일정 + AI 추천 콘텐츠

<div style="display: flex; gap: 10px;">
  <img src="./mobile/assets/readme/home_tip.png" alt="홈 화면 - TIP" style="width:250px;"/>
  <img src="./mobile/assets/readme/home_scenario.png" alt="홈 화면 - SCENARIO" style="width:250px;"/>
  <img src="./mobile/assets/readme/home_checkList.png" alt="홈 화면 - CHECKLIST" style="width:250px;"/>
</div>

- **원형 타이머**: 남은 시간에 따라 색상 변화 (🟢 초록 → 🟠 주황 → 🔴 빨강)
- **AI 준비 카드 3종**: 일정에 맞춘 TIP, SCENARIO, CHECKLIST (좌우 스와이프)

<br/>

## 캘린더 화면 - Google Calendar 동기화

<img src="./mobile/assets/readme/calendar.png" alt="캘린더 이미지" style="width:250px;" />

- 카테고리별 색상 구분 (회의/발표/면접/학습)
- 일정 클릭 시 해당 일정의 AI 콘텐츠 화면으로 바로 이동

<br/>

## 알림 시스템 - 일정 10분 전 정확한 알림

<img src="./mobile/assets/readme/notification.png" alt="알림 이미지" style="width:250px;" />

- **Kotlin Native Module**(AlarmManager `setExactAndAllowWhileIdle`)로 일정 10분 전 알림 예약
- 알림 클릭 시 해당 일정 콘텐츠로 바로 이동 (Deep Link)
- 앱이 종료된 상태에서도 AlarmManager가 예약된 알림을 실행

<br/>

---

<br/>

# 📑 목차

### 📖 프로젝트 개요

- [문제 정의 및 해결](#문제-정의-및-해결)
- [시스템 아키텍처](#시스템-아키텍처)
- [기술 스택 및 선정 이유](#기술-스택-및-선정-이유)

### 🎨 UX 설계

- [UX 설계 원칙](#ux-설계-원칙)
- [인터랙션 디자인](#인터랙션-디자인)

### 🔧 기술 구현

- [핵심 기능 및 트러블 슈팅](#핵심-기능-및-트러블-슈팅-deep-dive)
  - [Google OAuth 2.0 구현](#1-google-oauth-20-완전-구현--refresh-token-전략)
  - [AI 파이프라인 재시도·비용 통제](#2-ai-파이프라인-재시도비용-통제)
  - [정확한 알림 예약 (Kotlin)](#3-정확한-알림-예약-kotlin-native-module)
  - [콘텐츠 큐레이션 전략](#4-콘텐츠-큐레이션-전략-세바시)

### 📚 부가 정보

- [실행 가이드](#실행-가이드-run-guide)
- [향후 계획](#향후-계획)

<br/>

---

<br/>

# 📖 프로젝트 개요

<br/>

## 문제 정의 및 해결

### 🚨 문제 (Pain Point)

**1️⃣ 자투리 시간 낭비**  
일정 사이 자투리 시간을 SNS에 흘려보내기 쉬움. "뭔가 배워야지"라는 생각이 들어도 무엇을 해야 할지 막연함.

**2️⃣ 내 일정에 맞는 콘텐츠 찾기 어려움**  
YouTube에 수천 개의 영상이 있지만, **지금 내 발표에 바로 쓸 수 있는 콘텐츠**를 찾으려면 검색만 반복. 클릭베이트 제목, 광고성 콘텐츠로 인해 정보 탐색 피로도 증가.

<br/>

### ✅ QuickWise의 해결

| 문제                 | 해결 방법                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| **자투리 시간 낭비** | 다음 일정까지 남은 시간을 뽀모도로 타이머로 시각화하여 학습 시간으로 전환 |
| **정보 탐색 피로**   | Gemini가 일정 제목에서 검색어를 뽑아 강연을 찾고 자막을 요약. 직접 검색 불필요 |
| **낮은 콘텐츠 품질** | 세바시(검증된 강연 플랫폼)에서만 검색. 전문가의 실전 경험만 추천          |

<br/>

---

<br/>

## 시스템 아키텍처

<img src="./mobile/assets/readme/architecture.png" alt="아키텍처"/>

<br/>

### 전체 데이터 플로우

```
1. 사용자 로그인 (Google OAuth)
   ↓
2. Google Calendar 일정 동기화
   ↓
3. 키워드 규칙으로 회의·발표 일정 분류 → Gemini가 검색어 추출 → 세바시 채널 검색
   ↓
4. 영상 자막(최대 10,000자) 추출 → Gemini로 요약
   ↓
5. 콘텐츠 카드 3종 생성 (TIP, SCENARIO, CHECKLIST)
   ↓
6. 일정 10분 전 AlarmManager로 알림 예약
   ↓
7. 사용자가 알림 클릭 → 해당 일정 콘텐츠 화면으로 이동
```

<br/>

### 설계 철학

**"확장성"과 "데이터 흐름의 안정성"**을 최우선으로 고려했습니다.

- **Client**: React Native (TypeScript) + Zustand + Kotlin Native Module
- **Server**: Node.js/Express + Auth Middleware + AI Pipeline
- **Database**: MongoDB
- **External APIs**: Google OAuth, Gemini API, YouTube Data API v3

<br/>

---

<br/>

## 기술 스택 및 선정 이유

| 구분         | 기술 스택                                                                                                                                                                        | 선정 근거 (Technical Decision)                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Client**   | ![React Native](https://img.shields.io/badge/React%20Native-61DAFB?logo=react&logoColor=white) <br/> ![Expo](https://img.shields.io/badge/Expo-000000?logo=expo&logoColor=white) | 크로스 플랫폼 개발 효율성 및 Development Build를 통한 네이티브 모듈 통합 용이                   |
|              | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)                                                                                    | API 응답 데이터의 타입 안전성 보장 및 런타임 오류 방지                                          |
|              | ![Zustand](https://img.shields.io/badge/Zustand-181717?logo=zustand&logoColor=white)                                                                                             | Redux 대비 보일러플레이트가 적고 Hook 기반으로 직관적인 상태 관리 가능                          |
|              | ![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white)                                                                                                | **(핵심)** Doze 상태에서도 일정 10분 전 알림을 예약하기 위해 AlarmManager 직접 구현 |
| **Server**   | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) <br/> ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)  | JSON 기반의 REST API 빠른 구축 및 비동기 처리 효율성                                            |
|              | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)                                                                                             | AI 콘텐츠(카드 타입별 상이한 필드)의 유연한 스키마 처리에 적합                                  |
| **AI / API** | ![Gemini](https://img.shields.io/badge/Gemini-000000?logo=google&logoColor=white)                                                                                                | 무료 티어로 개발할 수 있고 한국어 자막 요약에 사용                         |
|              | ![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?logo=google&logoColor=white)                                                                                  | Google Calendar 연동을 위한 필수 인증, 보안성 높은 Token 관리 필요                              |

<br/>

---

<br/>

# 🎨 UX 설계

<br/>

## UX 설계 원칙

QuickWise는 **"자투리 시간을 학습 시간으로 전환"**하는 것이 핵심입니다.  
다음 세 가지 원칙을 기준으로 UX를 설계했습니다.

<br/>

### 1️⃣ **즉시성 (Immediacy)**

> "앱을 열면 바로 다음 일정과 준비 카드 확인"

- 홈 화면 진입 즉시 **다음 일정**과 **AI 추천 콘텐츠 3개** 표시
- 별도의 검색이나 필터링 없이 **바로 읽기 시작**
- 로딩 상태는 스켈레톤 UI로 부드럽게 처리

<br/>

### 2️⃣ **시각적 명확성 (Visual Clarity)**

> "남은 시간을 색상으로 직관적으로 전달"

- **뽀모도로 원형 타이머**: 남은 시간에 따라 색상 변화
  - 🟢 초록 (60분 이상): 여유 있음
  - 🟠 주황 (30-60분): 준비 필요
  - 🔴 빨강 (30분 이하): 긴급

<br/>

### 3️⃣ **비간섭적 알림 (Non-intrusive Notification)**

> "필요한 순간에만, 정확한 시간에"

- **일정 10분 전 1회만** 알림 발송
- 알림 클릭 시 **바로 해당 일정의 콘텐츠 화면**으로 이동
- 사용자가 알림을 무시해도 홈 화면에서 언제든 확인 가능

<br/>

---

<br/>

## 인터랙션 디자인

| 인터랙션          | UX 목표                                | 구현 방식                           | 효과                         |
| ----------------- | -------------------------------------- | ----------------------------------- | ---------------------------- |
| **색상 변화**     | 긴급도를 무의식적으로 전달             | 초록 → 주황 → 빨강 (시간 기반)      | 색상만으로 행동 유도         |
| **카드 스와이프** | 스크롤 없이 한 손으로 모든 콘텐츠 탐색 | FlatList horizontal + pagingEnabled | 자연스러운 전환              |
| **스켈레톤 UI**   | 체감 로딩 시간 단축                    | 애니메이션 pulse 효과               | "곧 뭔가 나온다" 기대감      |
| **Deep Link**     | 알림 클릭 1번으로 필요한 정보 획득     | Intent + eventId 전달               | 해당 일정 화면으로 바로 이동 |

**핵심 철학:** 사용자는 "왜 이렇게 동작하는지" 생각하지 않고 **자연스럽게 사용**

<br/>

---

<br/>

# 🔧 기술 구현

<br/>

## 핵심 기능 및 트러블 슈팅 (Deep Dive)

💡 **각 항목을 클릭하면 기술적 고민과 해결 과정을 자세히 볼 수 있습니다.**

<br/>

### 1. Google OAuth 2.0 완전 구현 & Refresh Token 전략

<details>
<summary><strong>🔥 Issue: 모바일 환경에서 재로그인 반복 문제 해결 (Click)</strong></summary>

<br/>

**문제 상황:**

앱을 재실행할 때마다 로그인이 풀리는 현상 발생. Access Token(1시간 유효) 만료 시 자동 갱신이 되지 않아 사용자가 매번 재로그인해야 했습니다.

<br/>

**원인 파악:**

모바일 SDK에서는 `serverAuthCode`를 명시적으로 요청하지 않으면 Refresh Token을 발급해주지 않습니다. 초기 구현에서 이 부분을 누락하여 Access Token 만료 후 갱신할 방법이 없었습니다.

<br/>

**해결 방법:**

**1단계: serverAuthCode 획득 및 백엔드 전달**

```typescript
// mobile/src/services/authService.ts
const googleTokens: GoogleTokens = {
  accessToken: tokens.accessToken,
  idToken: tokens.idToken || "",
  serverAuthCode: userData.serverAuthCode || undefined, // ✅ 핵심: serverAuthCode 추가
};
```

**왜 효과적인가?**

- serverAuthCode는 **일회용 인증 코드**로, 백엔드에서 이를 Google OAuth Token Endpoint와 교환하여 Refresh Token을 획득할 수 있습니다.
- 클라이언트에 Refresh Token을 저장하지 않고 **서버에서 안전하게 관리**할 수 있습니다.

<br/>

**2단계: 백엔드에서 Refresh Token 교환**

```typescript
// backend/src/services/auth/tokenExchange.ts
const exchangeAuthCodeForTokens = async (authCode: string) => {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code: authCode, // serverAuthCode 사용
    grant_type: "authorization_code",
  });

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token, // ✅ Refresh Token 획득!
  };
};
```

**왜 효과적인가?**

- Google OAuth Token Endpoint를 직접 호출하여 **서버에서만** Refresh Token을 보관합니다.
- 클라이언트 유출 위험이 없고, 토큰 갱신 로직을 백엔드에서 중앙 관리할 수 있습니다.

<br/>

**3단계: DB 저장 및 자동 갱신**

```typescript
// backend/src/routes/authRoutes.ts
if (serverAuthCode) {
  const tokenResponse = await exchangeAuthCodeForTokens(serverAuthCode);
  refreshTokenFromGoogle = tokenResponse.refresh_token;
}

user.googleAccessToken = googleAccessToken;
user.googleRefreshToken = refreshTokenFromGoogle; // ✅ DB에 저장
user.tokenExpiresAt = tokenExpiresAt;
await user.save();
```

**왜 효과적인가?**

- User 모델에 `googleRefreshToken` 필드를 추가하여 영구 보관합니다.
- Access Token 만료 시 미들웨어에서 자동으로 갱신하므로 사용자는 재로그인 불필요합니다.

<br/>

**개선 효과:**

- Access Token이 만료되면 서버가 저장된 Refresh Token으로 갱신하도록 바꿔, 앱을 다시 실행할 때마다 로그인이 풀리던 흐름을 고쳤습니다.

<br/>

**배운 점:**

OAuth는 웹과 모바일에서 구현 방식이 완전히 다릅니다. 모바일에서는:

- SHA-1 인증서 지문 등록 필수
- serverAuthCode를 백엔드로 전달하여 Refresh Token 교환
- skipRedirectCheck 설정과 보안 검증의 균형

**공식 문서를 정독**한 후에야 이 차이를 이해하고 정확히 구현할 수 있었습니다.

</details>

<br/>

### 2. AI 파이프라인 재시도·비용 통제

<details>
<summary><strong>💸 Issue: 재시도 상한이 없어 Gemini 무료 할당량이 빠르게 소진된 문제 (Click)</strong></summary>

<br/>

**문제 상황:**

검색 결과가 없거나 처리에 실패하면 Gemini 호출이 반복돼 무료 할당량이 빠르게 소진됐습니다. 실패 원인을 구분하지 않아, 다시 시도해도 성공할 수 없는 경우까지 재시도했습니다.

<br/>

**해결 방법:**

**1단계: 실패 원인 분류와 재시도 거부**

실패를 할당량 초과(`quota_exceeded`)·일시 오류(`temporary_error`)·미지원 카테고리(`unsupported_category`)로 나눠 일정에 기록했습니다. 서버 재시도 API는 할당량 초과면 429, 미지원 카테고리면 400으로 거부하고, 앱은 최대 3회까지만 재시도 버튼을 보여 줍니다.

<br/>

**2단계: 처리 대상과 입력 크기 제한**

```typescript
// backend/src/constants/ai.ts (발췌)
YOUTUBE: {
  CHANNEL_ID: "UCgheNMc3gGHLsT-RISdCzDQ", // 세바시 채널만 검색
  MIN_DURATION_SECONDS: 300,              // 5분 이상 영상
  TOP_VIDEOS_COUNT: 1,                    // 요약에 쓰는 영상 1개
},
PROCESSING: {
  TRANSCRIPT_MAX_LENGTH: 10000,           // 요약에 넣는 자막 최대 길이
},
SUPPORTED_CATEGORIES: ["meeting", "presentation"],
```

- AI 처리 대상을 회의·발표 일정으로 한정하고, 요약에 넣는 자막을 10,000자로 잘라 호출마다 입력 크기를 제한했습니다.

<br/>

**배운 점:**

**"일단 작동하게 만들자"는 외부 API 사용 시 위험**합니다. 재시도 전략을 처음부터 설계하지 않으면:

- 한 번 할당량을 소진하면 그 달은 서비스 사용 불가
- Fallback 대안 없이 전체 기능 중단

외부 API는 **"실패 시나리오"를 먼저 설계**하고, 그 다음에 성공 시나리오를 구현해야 합니다.

</details>

<br/>

### 3. 정확한 알림 예약 (Kotlin Native Module)

<details>
<summary><strong>⏰ Issue: Doze 상태 알림 지연 대응과 Kotlin AlarmManager 직접 구현 (Click)</strong></summary>

<br/>

**문제 상황:**

"일정 10분 전 알림"이 핵심 기능인데, Android Doze·배터리 최적화 상태에서는 일반 알림 예약이 지연될 수 있었습니다.

<br/>

**원인 파악:**

Expo Notifications는 편리하지만 다음과 같은 한계가 있습니다:

- Android Doze 모드에서 알림 지연 또는 누락
- 배터리 최적화 설정 시 백그라운드 작업 제한

<br/>

**해결 방법:**

**Kotlin으로 Native Module 직접 구현**

```kotlin
// mobile/modules/notification-scheduler/android/.../NotificationSchedulerModule.kt
class NotificationSchedulerModule : Module() {
    override fun definition() = ModuleDefinition {
        AsyncFunction("scheduleNotification") {
            eventId: String, timestamp: Double, title: String, body: String, promise: Promise ->

            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val triggerTime = timestamp.toLong()

            // ✅ 핵심: setExactAndAllowWhileIdle 사용
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setExactAndAllowWhileIdle(
                    AlarmManager.RTC_WAKEUP,
                    triggerTime,
                    pendingIntent
                )
            } else {
                alarmManager.setExact(
                    AlarmManager.RTC_WAKEUP,
                    triggerTime,
                    pendingIntent
                )
            }

            promise.resolve("Notification scheduled")
        }
    }
}
```

**왜 효과적인가?**

- `setExactAndAllowWhileIdle()`: Doze 모드에서도 알람 실행 허용
- `RTC_WAKEUP`: 기기를 깨워 알람 실행
- Native Module: Expo 제약 없이 Android API 직접 제어

<br/>

**개선 효과:**

- `setExactAndAllowWhileIdle()`로 Doze 상태에서도 알람 실행을 허용하도록 예약 방식을 바꿨습니다.
- 네이티브 모듈이라 Expo Go로는 실행할 수 없고 Development Build가 필요합니다.

<br/>

**배운 점:**

크로스 플랫폼 프레임워크는 편리하지만, 핵심 기능에 한계가 있다면 **네이티브로 내려가는 것을 두려워하지 말아야** 합니다.

"일정 10분 전"이라는 핵심 기능이 제대로 작동하지 않으면 앱의 존재 이유가 사라집니다. Kotlin을 처음 다뤘지만, Android 공식 문서를 정독하며 AlarmManager API를 익히고 React Native Bridge를 구현했습니다. 이후 `expo prebuild`가 `android/`를 다시 만들 때 손으로 넣은 코드가 사라지자 Expo Modules API 로컬 모듈로 옮겼고, 다른 환경에서 모듈을 못 찾던 원인이 루트 `.gitignore`의 `android/` 규칙이 모듈 안 Kotlin 파일까지 무시한 것임을 찾아 `/android/`로 좁혔습니다.

**사용자 경험은 타협의 대상이 아닙니다.**

</details>

<br/>

### 4. 콘텐츠 큐레이션 전략 (세바시)

<details>
<summary><strong>🎯 Why 세바시? 클릭베이트 제거와 품질 보장 (Click)</strong></summary>

<br/>

**문제 상황:**

YouTube 전체에서 검색하면 수천 개의 영상이 나오지만:

- ❌ 클릭베이트 제목 (조회수 유도)
- ❌ 광고성 콘텐츠 (제품 홍보)
- ❌ 너무 일반적이거나 이론적인 내용
- ❌ 실전 적용 어려움

**문제의 핵심**: 정보 과잉 시대에 **"양질의 콘텐츠"를 찾는 게 더 어렵습니다.**

<br/>

**해결 방법:**

**세바시(세상을 바꾸는 시간 15분)만 검색**

```typescript
// backend/src/constants/ai.ts (발췌)
YOUTUBE: {
  CHANNEL_NAME: "세바시",
  CHANNEL_ID: "UCgheNMc3gGHLsT-RISdCzDQ", // ✅ 세바시 채널만 검색
  MIN_DURATION_SECONDS: 300,              // 5분 이상
  TOP_VIDEOS_COUNT: 1,                    // 요약에 쓰는 영상 1개
},
```

**왜 효과적인가?**

- 검색 범위를 한 채널로 한정해 광고성·클릭베이트성 영상이 섞이는 것을 줄였습니다.
- 5분 이상 영상만 대상으로 하고, 요약에는 상위 1개 영상만 씁니다.

<br/>

**QuickWise의 차별화:**

```
일반 검색:
키워드 → YouTube 전체 검색 → 결과 목록
문제: 광고성·클릭베이트성 영상이 섞임

QuickWise:
Gemini 검색어 추출 → 세바시 채널 검색(5분 이상) → 자막 요약 → 준비 카드 3종
```

<br/>

**개선 효과:**

- 검색 출처를 한 채널로 좁혀 결과의 편차를 줄였습니다.

<br/>

**배운 점:**

AI 시대에 "콘텐츠 추천"만으로는 부족합니다. **"어디서" 추천하는지가 더 중요**합니다.

QuickWise는 단순 AI 추천이 아니라 **큐레이션 + AI** 전략입니다. 정보 과잉 시대에는 "양"보다 "질"이 핵심입니다.

</details>

<br/>
<br/>

# 📚 부가 정보

<br/>

## 실행 가이드 (Run Guide)

### 사전 요구사항

- Node.js 18+
- Android Studio (에뮬레이터)
- Google Cloud Console 프로젝트 (OAuth Client ID)
- MongoDB (로컬 또는 Atlas)

<br/>

### 1. 설치 (Installation)

```bash
# 프로젝트 클론
git clone https://github.com/2hanse/Quick-wise.git
cd Quick-wise

# 워크스페이스 의존성 설치
npm install
```

<br/>

### 2. 환경 변수 설정 (.env)

**Backend (.env)**

```env
MONGODB_URI=mongodb://localhost:27017/quickwise
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
GEMINI_API_KEY=xxxxx
YOUTUBE_API_KEY=xxxxx
JWT_SECRET=your_jwt_secret_min_32_characters
PORT=3000
```

**Mobile (.env)**

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=xxxxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=xxxxx.apps.googleusercontent.com
NODE_ENV=development
```

<br/>

### 3. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. OAuth 2.0 클라이언트 ID 생성 (Web + Android)
3. Android SHA-1 인증서 지문 등록:

```bash
cd mobile/android/app
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android
```

4. Google Calendar API, YouTube Data API v3 활성화

<br/>

### 4. 실행 (Run)

**Backend 실행:**

```bash
cd backend
npm run dev  # nodemon으로 개발 모드 실행
```

**Mobile 실행 (Development Build 필요):**

```bash
cd mobile
npx expo run:android
```

**주의**: Expo Go로 실행 불가 (Kotlin Native Module 포함)

<br/>

### 문제 해결

**"OAuth 리다이렉트 안 됨"**  
→ SHA-1 등록 + `AndroidManifest.xml` 확인

**"Gemini API 할당량 초과"**  
→ Gemini 무료 티어 할당량 확인

**"MongoDB 연결 실패"**  
→ `MONGODB_URI` 확인 및 MongoDB 실행 상태 체크

<br/>

## 향후 계획

### Phase 1: 기능 확장 (1개월)

- [ ] 콘텐츠 소스 확장 (세바시 → TED, EO, 체인지그라운드)
- [ ] 자투리 시간 감지 (일정 간 공백 자동 인식 + 시간대별 추천)
- [ ] 카테고리 확장 (면접, 네트워킹, 운동, 학습)

### Phase 2: 안정화 (1개월)

- [ ] Jest 단위 테스트 (AI 파이프라인, OAuth)
- [ ] Sentry 에러 모니터링
- [ ] 성능 최적화 (AsyncStorage → SQLite)

### Phase 3: 배포 및 성장 (1개월)

- [ ] Google Play Store 출시 + 베타 테스터 피드백 (10-20명)
- [ ] Google Analytics 연동 (DAU, 알림 클릭률, 콘텐츠 만족도)
- [ ] iOS 확장 (Swift 네이티브 알림 모듈)

<br/>

**핵심 전략:** Android 버전을 먼저 완성하고 실제 사용자 피드백 기반으로 iOS 확장

<br/>

## 👤 개발자

**Hanse Lee**

- GitHub: [@2hanse](https://github.com/2hanse)
- Email: leehanse.dev@gmail.com

---
