import { Habit, HabitTrackingEntry, HabitDetail } from '../../../shared/types/habit.type';
import { format } from 'date-fns';
import { HabitTrackingEntryStatus } from '../../../shared/enums/habit-tracking-entry-status.enum';
import { v4 } from 'uuid';
import { HabitStatus } from '../../../shared/enums/habit-status.enum';

// Helper function to get data from localStorage
const getLocalStorageData = <T>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

// Helper function to save data to localStorage
const setLocalStorageData = <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Fetch habits by client ID from localStorage
export const fetchHabitsByClientId = (clientId: string): Habit[] => {
    const habits: Habit[] = getLocalStorageData('habits', []);
    return habits.filter(habit => habit.clientId === clientId && habit.status === HabitStatus.ACTIVE);
};

// Get detailed information about a specific habit by ID
export const fetchHabitDetailById = (habitId: string): HabitDetail | undefined => {
    const habits: Habit[] = getLocalStorageData('habits', []);
    const habit = habits.find(habit => habit.id === habitId && habit.status === HabitStatus.ACTIVE);
    
    if (!habit) return undefined;

    const trackingEntries = fetchHabitTrackingEntriesByHabitId(habitId);

    return {
        id: habit.id,
        clientId: habit.clientId,
        name: habit.name,
        status: habit.status,
        habitTrackingEntries: trackingEntries
    };
};

// Get habit tracking entries by habit ID
export const fetchHabitTrackingEntriesByHabitId = (habitId: string): HabitTrackingEntry[] => {
    const entries: HabitTrackingEntry[] = getLocalStorageData('habitTrackingEntries', []);
    return entries.filter(entry => entry.habitId === habitId);
};

// Filter habit tracking entries by month
export const filterTrackingEntriesByMonth = (entries: HabitTrackingEntry[], date: Date): HabitTrackingEntry[] => 
    entries.filter(entry => format(new Date(entry.date), 'yyyy-MM') === format(date, 'yyyy-MM'));

// Update a specific habit tracking entry
export const updateTrackingEntry = (habitId: string, date: Date, status: HabitTrackingEntryStatus): void => {
    const entries: HabitTrackingEntry[] = getLocalStorageData('habitTrackingEntries', []);
    const entryToUpdate = entries.find(entry => entry.habitId === habitId && new Date(entry.date).getTime() === date.getTime());

    if (entryToUpdate) {
        entryToUpdate.status = status;
    } else {
        entries.push({ date, habitId, status });
    }

    setLocalStorageData('habitTrackingEntries', entries);
};

// Create a new habit
export const createHabit = (name: string, clientId: string): void => {
    const habits: Habit[] = getLocalStorageData('habits', []);
    const habit: Habit = {
        id: v4(),
        name,
        clientId,
        status: HabitStatus.ACTIVE
    };
    habits.push(habit);
    setLocalStorageData('habits', habits);
};

// Delete a habit (mark as DELETED)
export const deleteHabit = (habitId: string, clientId: string): void => {
    const habits: Habit[] = getLocalStorageData('habits', []);
    const habitToDelete = habits.find(habit => habit.id === habitId && habit.clientId === clientId);

    if (habitToDelete) {
        habitToDelete.status = HabitStatus.DELETED;
        setLocalStorageData('habits', habits);
    } else {
        console.error("Habit not found or client ID does not match.");
    }
};
