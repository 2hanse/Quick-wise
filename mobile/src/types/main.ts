import { AICardSource, AIContent } from "./ai";

type ScheduleStatus = "completed" | "progress" | "upcoming";

interface CommentContentProps {
  content: string;
  source: AICardSource;
}

interface ScenarioContentProps {
  situation: string;
  response: string;
  source: AICardSource;
}

interface ChecklistContentItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistContentProps {
  items: string[];
  source: AICardSource;
}

interface SwipeContent {
  id: string;
  type: string;
  scenario?: Scenario;
  checklist?: Checklist;
  content?: string;
  situation?: string;
  response?: string;
  items?: string[];
  source?: AICardSource;
  order?: number;
}

interface Lecture {
  title: string;
}

interface NextSchedule {
  startTime: string;
  title: string;
  location: string;
  lecture: Lecture;
  aiContent?: AIContent;
}

interface NextScheduleSectionProps {
  schedule: NextSchedule;
  isAILoading?: boolean;
}

interface TodaySchedule {
  id: string;
  time: string;
  title: string;
  status: ScheduleStatus;
  badge: string;
}

interface DateInfo {
  date: string;
  dayOfWeek: string;
  totalSchedules: number;
}

interface DateHeaderSectionProps {
  dateInfo: DateInfo;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

interface CalendarData {
  dateInfo: DateInfo;
  nextSchedule: NextSchedule;
  swipeContents: SwipeContent[];
  todaySchedules: TodaySchedule[];
}

interface Scenario {
  id: string;
  title: string;
  tags: string[];
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
  corePoint?: string;
}

interface MainScreenProps {
  onNavigateToCalendar: () => void;
}

interface ScheduleGuideSectionProps {
  swipeContents: SwipeContent[];
}

interface PomodoroTimerProps {
  schedule: NextSchedule;
}

export type { ScheduleStatus };

export {
  CommentContentProps,
  ScenarioContentProps,
  ChecklistContentItem,
  ChecklistContentProps,
  SwipeContent,
  Lecture,
  NextSchedule,
  NextScheduleSectionProps,
  TodaySchedule,
  DateInfo,
  DateHeaderSectionProps,
  CalendarData,
  Scenario,
  ChecklistItem,
  Checklist,
  MainScreenProps,
  ScheduleGuideSectionProps,
  PomodoroTimerProps,
};
