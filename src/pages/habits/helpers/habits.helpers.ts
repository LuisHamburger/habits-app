import { Habit, HabitTrackingEntry, HabitDetail } from '../../../shared/types/habit.type';
import { HabitTrackingEntryMock, HabitsMock } from "../data/data";
import { format } from 'date-fns';
import { HabitTrackingEntryStatus } from '../../../shared/enums/habit-tracking-entry-status.enum';
import { v4 } from 'uuid';
import { HabitStatus } from '../../../shared/enums/habit-status.enum';

// Obtiene los hábitos asociados a un ID de cliente específico
export const fetchHabitsByClientId = (clientId: string): Habit[] => 
    HabitsMock.filter(habit => habit.clientId === clientId && habit.status === HabitStatus.ACTIVE);

// Obtiene información detallada sobre un hábito específico por su ID
export const fetchHabitDetailById = (habitId: string): HabitDetail | undefined => {
    const habit = HabitsMock.find(habit => habit.id === habitId && habit.status === HabitStatus.ACTIVE);
    
    if (!habit) return undefined; // Retorna undefined explícitamente si no se encuentra el hábito

    const trackingEntries = fetchHabitTrackingEntriesByHabitId(habitId);

    return {
        id: habit.id,
        clientId: habit.clientId,
        name: habit.name,
        status: habit.status,
        habitTrackingEntries: trackingEntries
    };
}

// Función auxiliar para obtener las entradas de seguimiento de hábitos por ID de hábito
export const fetchHabitTrackingEntriesByHabitId = (habitId: string): HabitTrackingEntry[] => 
    HabitTrackingEntryMock.filter(entry => entry.habitId === habitId);

// Filtra las entradas de seguimiento de hábitos por mes
export const filterTrackingEntriesByMonth = (entries: HabitTrackingEntry[], date: Date): HabitTrackingEntry[] => 
    entries.filter(entry => format(entry.date, 'yyyy-MM') === format(date, 'yyyy-MM'));

// Actualiza una entrada de seguimiento de hábito específica
export const updateTrackingEntry = (habitId: string, date: Date, status: HabitTrackingEntryStatus): void => {
    const entryToUpdate = HabitTrackingEntryMock.find(entry => 
        entry.habitId === habitId && entry.date.getTime() === date.getTime()
    );

    if (entryToUpdate) {
        entryToUpdate.status = status; // Actualiza el estado
    } else {
        HabitTrackingEntryMock.push({ date, habitId, status }); // Agrega una nueva entrada si no se encuentra
    }
};

export const createHabit = (name: string, clientId: string): void => {
   const habit: Habit = {
       id: v4(),
       name,
       clientId,
       status: HabitStatus.ACTIVE
   }

   HabitsMock.push(habit);
};

export const deleteHabit = (habitId: string, clientId: string): void => {
    const habitToDelete = HabitsMock.find(habit => habit.id === habitId && habit.clientId === clientId);

    if (habitToDelete) {
        habitToDelete.status = HabitStatus.DELETED;  // Actualiza el estado a DELETED
    } else {
        console.error("Habit not found or client ID does not match.");
    }
};
