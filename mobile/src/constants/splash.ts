import { FeatureBoxItem } from "../types/splash";

const APP_NAME = "QuickWise" as const;
const TYPEWRITER_SPEED = 120 as const;
const CURSOR_BLINK_DURATION = 500;
const STEP_ADVICE_COMPLETE = 4;

const ANIMATION_DURATION = {
  description: 800,
  box: 600,
  loading: 600,
  pulse: 1200,
};

const STEP_TIMINGS = {
  description: 1500,
  scheduleBox: 1800,
  scenarioBox: 2100,
  adviceBox: 2400,
  loading: 2700,
  complete: 3700,
};

const DESCRIPTION_TEXTS = {
  title: "당신의 일정이 성장의 기회가 됩니다.",
  subtitle:
    "TED, 세바시 등 전문 강사들의 강연을 \n내 상황에 맞게 적용해드려요.",
  loading: "당신만의 성장 코치를 준비하고 있어요...",
};

const FEATURE_BOXES: FeatureBoxItem[] = [
  { id: "schedule", icon: "📅", label: "일정 연동" },
  { id: "scenario", icon: "🚀", label: "실행 시나리오" },
  { id: "advice", icon: "🎯", label: "맞춤 조언" },
];

const DOTS = [{ id: "pulse-a" }, { id: "pulse-b" }, { id: "pulse-c" }];

export {
  APP_NAME,
  TYPEWRITER_SPEED,
  CURSOR_BLINK_DURATION,
  STEP_ADVICE_COMPLETE,
  ANIMATION_DURATION,
  STEP_TIMINGS,
  DESCRIPTION_TEXTS,
  FEATURE_BOXES,
  DOTS,
};
