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

export {
  Effect,
  SwipeContent,
  Lecture,
  NextSchedule,
  TodaySchedule,
  DateInfo,
  CalendarData,
};
