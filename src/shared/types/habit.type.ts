import { HabitTrackingEntryStatus } from "../enums/habit-tracking-entry-status.enum";

export type Habit = {
    name: string;
    id: string;
    clientId: string;
}

export type HabitTrackingEntry = {
    habitId: string;
    date: Date;
    status: HabitTrackingEntryStatus;
}

export type HabitDetail = Habit & {
    habitTrackingEntries: HabitTrackingEntry[];
}