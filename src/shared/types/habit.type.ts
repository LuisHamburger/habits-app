import { HabitStatus } from "../enums/habit-status.enum";
import { HabitTrackingEntryStatus } from "../enums/habit-tracking-entry-status.enum";

export type Habit = {
    name: string;
    startDate: Date;
    finishDate: Date;
    id: string;
    clientId: string;
    status: HabitStatus;
}

export type HabitTrackingEntry = {
    id: string;
    habitId: string;
    date: Date;
    status: HabitTrackingEntryStatus;
}

export type HabitDetail = Habit & {
    habitTrackingEntries: HabitTrackingEntry[];
}

export type HabitEntryNote = {
    id: string;
    entryId: string;
    note: string;
}