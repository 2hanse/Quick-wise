import { AICardSource } from "./ai";

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
  studySchedules: number;
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

export type { ScheduleStatus };

export {
  CommentContentProps,
  ScenarioContentProps,
  ChecklistContentItem,
  ChecklistContentProps,
  SwipeContent,
  Lecture,
  NextSchedule,
  TodaySchedule,
  DateInfo,
  CalendarData,
  Scenario,
  ChecklistItem,
  Checklist,
  MainScreenProps,
};
