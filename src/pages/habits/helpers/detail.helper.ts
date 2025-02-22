import { eachDayOfInterval, endOfMonth, getMonth, startOfMonth, getYear, isSameMonth } from "date-fns";
import { fetchHabitTrackingEntriesByHabitId, filterTrackingEntriesByMonth } from "./habits.helper";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { HabitDetail, HabitTrackingEntry } from "../../../shared/types/habit.type";

export const CURRENT_DATE = new Date();

export const getFilteredTrackingEntries = (habit: HabitDetail, date: Date) => {
    const allEntries = fetchHabitTrackingEntriesByHabitId(habit.id);
    const filteredEntries = filterTrackingEntriesByMonth(allEntries, date) ?? [];

    // Validar si el mes y el año seleccionados coinciden con el habit.startDate
    const isSameYearAndMonthStart = getYear(date) === getYear(habit.startDate) && getMonth(date) === getMonth(habit.startDate);
    const startOfSelectedMonth = isSameYearAndMonthStart ? habit.startDate : startOfMonth(date);

    // Validar si el mes y el año seleccionados coinciden con el habit.finishDate
    const isSameYearAndMonthFinish = getYear(date) === getYear(habit.finishDate) && getMonth(date) === getMonth(habit.finishDate);
    const endOfSelectedMonth = isSameMonth(date, CURRENT_DATE) ? CURRENT_DATE : endOfMonth(date);

    // Ajustar la fecha inicial y final si coincide con startDate y finishDate
    const startOfInterval = habit.startDate && isSameYearAndMonthStart ? habit.startDate : startOfSelectedMonth;
    const endOfInterval = habit.finishDate && isSameYearAndMonthFinish ? habit.finishDate : endOfSelectedMonth;

    // Crear el intervalo de días según el startDate y finishDate ajustados
    const daysInInterval = eachDayOfInterval({ start: startOfInterval, end: endOfInterval });

    // Crear un mapa de las entradas existentes por fecha
    const existingEntriesMap = new Map(filteredEntries.map(entry => [new Date(entry.date).toISOString(), entry]));

    // Actualizar las entradas con el estado correspondiente
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