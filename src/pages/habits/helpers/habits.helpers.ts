import { Habit, CalendarDay, HabitDetail } from '../../../shared/types/habit.type';
import { CalendarDayMock, HabitsMock } from "../data/data"

export const getHabitsByClientId = (clientId: string): Habit[] => {
    return HabitsMock.filter((habit) => habit.clientId === clientId)
}

export const getHabitDetailById = (habitId: string): HabitDetail[] | undefined => {
    const habit = HabitsMock.find((habit) => habit.id === habitId)

    if(!habit) return;

    const calendarDay: CalendarDay[] = CalendarDayMock.filter((cd) => cd.habitId === habitId);

    return calendarDay.map((cd) => { return {...cd, habitName: habit.name}})
}