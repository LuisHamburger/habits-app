import { eachDayOfInterval, endOfMonth, getMonth, startOfMonth } from "date-fns";
import { fetchHabitTrackingEntriesByHabitId, filterTrackingEntriesByMonth } from "./habits.helper";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { HabitDetail, HabitTrackingEntry } from "../../../shared/types/habit.type";

export const CURRENT_DATE = new Date();

export const getFilteredTrackingEntries = (habit: HabitDetail, date: Date) => {
    const allEntries = fetchHabitTrackingEntriesByHabitId(habit.id);
    const filteredEntries = filterTrackingEntriesByMonth(allEntries, date) ?? [];

    const startOfSelectedMonth = startOfMonth(date);
    const endOfSelectedMonth = isSameMonth(date, CURRENT_DATE) ? CURRENT_DATE : endOfMonth(date);
    const daysInInterval = eachDayOfInterval({ start: startOfSelectedMonth, end: endOfSelectedMonth });

    const existingEntriesMap = new Map(filteredEntries.map(entry => [new Date(entry.date).toISOString(), entry]));

    const updatedEntries = daysInInterval.map(day => {
        const isoDate = day.toISOString();
        if (existingEntriesMap.has(isoDate)) {
            return existingEntriesMap.get(isoDate)!;
        } else {
            return {
                date: day,
                status: HabitTrackingEntryStatus.PENDING,
            } as HabitTrackingEntry;
        }
    });

    return updatedEntries;
};

export const isSameMonth = (firstDate: Date, secondDate: Date) => {
    return getMonth(firstDate) === getMonth(secondDate);
}