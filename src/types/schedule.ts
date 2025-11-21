export interface TimeSlot {
  startTime: string;  // "20:00"
  endTime: string;    // "21:30"
  artist: string;     // "Yahav Nayer"
}

export interface DaySchedule {
  date: string;       // "Monday 24.11"
  slots: TimeSlot[];
}

export interface Stage {
  id: string;
  name: string;       // "Shliff"
  days: DaySchedule[];
}