import { eachDayOfInterval, endOfMonth, getMonth, startOfMonth, getYear, isSameMonth, getDate } from "date-fns";
import { fetchHabitTrackingEntriesByHabitId, filterTrackingEntriesByMonth } from "./habits.helper";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { HabitDetail, HabitTrackingEntry } from "../../../shared/types/habit.type";

export const CURRENT_DATE = new Date();

export const getFilteredTrackingEntries = (habit: HabitDetail, date: Date): HabitTrackingEntry[] => {
    const allEntries = fetchHabitTrackingEntriesByHabitId(habit.id);
    const filteredEntries = filterTrackingEntriesByMonth(allEntries, date) ?? [];

    const habitStartDate = habit.startDate;
    const habitFinishDate = habit.finishDate;

    const isStartInSameMonth = getYear(date) === getYear(habitStartDate) && getMonth(date) === getMonth(habitStartDate);
    const isFinishInSameMonth = habitFinishDate && getYear(date) === getYear(habitFinishDate) && getMonth(date) === getMonth(habitFinishDate);

    const startOfSelectedMonth = isStartInSameMonth ? habitStartDate : startOfMonth(date);
    
    const isCurrentMonth = isSameMonth(date, CURRENT_DATE);

    const endOfInterval = isCurrentMonth && getDate(CURRENT_DATE) < getDate(habitFinishDate!)
        ? CURRENT_DATE
        : isFinishInSameMonth ? habitFinishDate : endOfMonth(date);

    const startOfInterval = isStartInSameMonth ? habitStartDate : startOfSelectedMonth;

    const daysInInterval = eachDayOfInterval({ start: startOfInterval, end: endOfInterval });

    const existingEntriesMap = new Map(filteredEntries.map(entry => [new Date(entry.date).toISOString(), entry]));

    const updatedEntries = daysInInterval.map(day => {
        const isoDate = day.toISOString();
        return existingEntriesMap.has(isoDate) 
            ? existingEntriesMap.get(isoDate)!
            : { date: day, status: HabitTrackingEntryStatus.PENDING } as HabitTrackingEntry;
    });

    return updatedEntries;
};
