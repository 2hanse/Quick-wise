export type ScheduleStatus = "completed" | "progress" | "upcoming";

interface Effect {
  id: string;
  highlight?: string;
  description?: string;
}

interface SwipeContent {
  id: string;
  type: string;
  effects?: Effect[];
  scenario?: Scenario;
  checklist?: Checklist;
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

interface DialogueLine {
  id: string;
  speaker: "A" | "B";
  text: string;
  isHighlight?: boolean;
}

interface Scenario {
  id: string;
  title: string;
  tags: string[];
  dialogue: DialogueLine[];
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

export {
  Effect,
  SwipeContent,
  Lecture,
  NextSchedule,
  TodaySchedule,
  DateInfo,
  CalendarData,
  DialogueLine,
  Scenario,
  ChecklistItem,
  Checklist,
};
