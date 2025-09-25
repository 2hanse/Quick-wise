import { Step } from "../types/onboarding";

const TIMINGS_DURATION = 300;
const STAGGER_DELAY = 200;
const ANIMATION_START_DELAY = 500;

const FEATURES_TEXTS = [
  { id: "point1", text: "일정에 맞는 맞춤 학습 콘텐츠" },
  { id: "point2", text: "바쁜 일상 속 자투리 시간 완벽 활용" },
  { id: "point3", text: "유명 강연을 내 상황에 맞게 큐레이션" },
];

const SLOGANS_TEXTS = {
  one: "오늘 일정에 맞춰,",
  two: "내게 꼭 필요한 코멘트를 !",
  sub: "성장이 습관이 되는 가장 쉬운 방법",
};

const DESCRIPTION = [
  { text: "구글 캘린더와 연동해서 TED, 세바시 등\n" },
  { text: "유명 강연을 당신의 일정에 맞춰 추천해드려요." },
];

const HEADER_TITLE = {
  onboarding2: "어떻게 작동하나요?",
  onboarding3: "구글 캘린더와",
  onboarding3_1: " 연결하세요",
};

const HEADER_SUBTEXT = {
  onboarding2: "3단계로 일정에 맞는 최적의\n학습 콘텐츠를 추천해드립니다.",
};

const ICON_SIZE = 20;

const STEPS: Step[] = [
  {
    id: 1,
    iconName: "calendar-outline",
    iconFamily: "Ionicons",
    title: "캘린더 일정 분석",
    subtitle: "구글 캘린더 연동",
    description:
      "회의, 프레젠테이션, 면접 등\n다양한 일정을 자동으로 분석합니다.",
    example: "오후 2시 투자 프레젠테이션",
    colorClass: "bg-blue-100 border-blue-200",
  },
  {
    id: 2,
    iconName: "psychology",
    iconFamily: "MaterialIcons",
    title: "맞춤 학습 추천",
    subtitle: "AI 기반 콘텐츠 매칭",
    description:
      "TED, 세바시 등 검증된 강연 중\n일정에 최적화된 콘텐츠를 선별합니다.",
    example: "사이먼 사이넥의 리더십 강연",
    colorClass: "bg-purple-100 border-purple-200",
  },
  {
    id: 3,
    iconName: "notifications-outline",
    iconFamily: "Ionicons",
    title: "스마트 알림",
    subtitle: "완벽한 타이밍",
    description: "일정 10분 전 핵심 인사이트와\n실전 적용 팁을 알려드립니다.",
    example: "핵심 메시지: '리더는 목적을 제시한다'",
    colorClass: "bg-pink-100 border-pink-200",
  },
];

const INTERLOCK_REASON = "연동이 필요한 이유";
const PRIVACY_PROTECTION = "개인정보 보호";

const REASON_ITEMS = {
  item1: {
    title: "실시간 일정 동기화",
    description:
      "캘린더의 모든 일정을 자동으로 분석하여 시간 사용 패턴을 파악합니다.",
  },
  item2: {
    title: "정확한 분석 결과",
    description:
      "회의, 업무, 개인 시간을 구분하여 더욱 세밀한 시간 분석을 제공합니다.",
  },
};

const PROTECT_TEXT = "안전하게 보호됩니다";

const PRIVACY_TEXT =
  "캘린더 데이터는 분석 목적으로만 사용되며, 암호화되어 저장됩니다. 언제든지 연동을 해제할 수 있고, 개인 정보는 절대 외부에 공유되지 않습니다.";

const GOOGLE_BUTTON = {
  googleSignIn: "Sign in with Google",
};

export {
  TIMINGS_DURATION,
  STAGGER_DELAY,
  ANIMATION_START_DELAY,
  FEATURES_TEXTS,
  SLOGANS_TEXTS,
  DESCRIPTION,
  HEADER_TITLE,
  HEADER_SUBTEXT,
  ICON_SIZE,
  PROTECT_TEXT,
  STEPS,
  INTERLOCK_REASON,
  PRIVACY_PROTECTION,
  REASON_ITEMS,
  PRIVACY_TEXT,
  GOOGLE_BUTTON,
};
