import { Habit, HabitTrackingEntry, HabitDetail, HabitEntryNote } from '../../../shared/types/habit.type';
import { format } from 'date-fns';
import { HabitTrackingEntryStatus } from '../../../shared/enums/habit-tracking-entry-status.enum';
import { v4 } from 'uuid';
import { HabitStatus } from '../../../shared/enums/habit-status.enum';
import { Localstorage } from '../../../shared/enums/localstorage.enum';

const getLocalStorageData = <T>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const setLocalStorageData = <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const fetchHabitsByClientId = (clientId: string): Habit[] => {
    const habits: Habit[] = getLocalStorageData(Localstorage.HABITS, []);
    return habits.filter(habit => habit.clientId === clientId && habit.status === HabitStatus.ACTIVE);
};

export const fetchHabitDetailById = (habitId: string): HabitDetail | undefined => {
    const habits: Habit[] = getLocalStorageData(Localstorage.HABITS, []);
    const habit = habits.find(habit => habit.id === habitId && habit.status === HabitStatus.ACTIVE);

    if (!habit) return undefined;

    const trackingEntries = fetchHabitTrackingEntriesByHabitId(habitId);

    return {
        id: habit.id,
        clientId: habit.clientId,
        name: habit.name,
        status: habit.status,
        startDate: habit.startDate,
        finishDate: habit.finishDate,
        habitTrackingEntries: trackingEntries
    };
};

export const fetchHabitTrackingEntriesByHabitId = (habitId: string): HabitTrackingEntry[] => {
    const entries: HabitTrackingEntry[] = getLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES, []);
    return entries.filter(entry => entry.habitId === habitId);
};

export const filterTrackingEntriesByMonth = (entries: HabitTrackingEntry[], date: Date): HabitTrackingEntry[] =>
    entries.filter(entry => format(new Date(entry.date), 'yyyy-MM') === format(date, 'yyyy-MM'));


export const updateTrackingEntry = (habitId: string, date: Date, status: HabitTrackingEntryStatus): void => {
    const entries: HabitTrackingEntry[] = getLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES, []);
    const entryToUpdate = entries.find(entry => entry.habitId === habitId && new Date(entry.date).getTime() === new Date(date).getTime());

    if (entryToUpdate) {
        entryToUpdate.status = status;
    } else {
        entries.push({ date, habitId, status, id: v4() });
    }

    setLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES, entries);
};

export const updateTrackingEntryNote = (habitId: string, date: Date, note: string): void => {
    const entries: HabitTrackingEntry[] = getLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES, []);
    const entry = entries.find(entry => entry.habitId === habitId && new Date(entry.date).getTime() === new Date(date).getTime());

    const notes: HabitEntryNote[] = getLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES_NOTES, []);

    const existedNote = notes.find((value) => value.entryId === entry?.id);

    if (existedNote) {
        existedNote.note = note;
    } else {
        notes.push({
            entryId: entry!.id,
            id: v4(),
            note,
        })
    }

    setLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES_NOTES, notes);
};


export const fetchTrackingEntryNote = (entryId: string): HabitEntryNote | undefined => {
    const notes: HabitEntryNote[] = getLocalStorageData(Localstorage.HABIT_TRACKING_ENTRIES_NOTES, []);

    return notes.find((value) => value.entryId === entryId)
}

export const createHabit = (name: string, startDate: string, finishDate: string, clientId: string): void => {
    const habits: Habit[] = getLocalStorageData(Localstorage.HABITS, []);
    const startDataCOL = new Date(`${startDate}T05:00`);

    const finishDataCOL = new Date(`${finishDate}T05:00`);

    const habit: Habit = {
        id: v4(),
        name,
        startDate: startDataCOL,
        finishDate: finishDataCOL,
        clientId,
        status: HabitStatus.ACTIVE
    };
    habits.push(habit);
    setLocalStorageData(Localstorage.HABITS, habits);
};

export const deleteHabit = (habitId: string, clientId: string): void => {
    const habits: Habit[] = getLocalStorageData(Localstorage.HABITS, []);
    const habitToDelete = habits.find(habit => habit.id === habitId && habit.clientId === clientId);

    if (habitToDelete) {
        habitToDelete.status = HabitStatus.DELETED;
        setLocalStorageData(Localstorage.HABITS, habits);
    } else {
        console.error("Habit not found or client ID does not match.");
    }
};
