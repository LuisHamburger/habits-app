import './detail.css';
import { DetailHeader } from '../../components/detail-header.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { filterTrackingEntriesByMonth, fetchHabitDetailById, fetchHabitTrackingEntriesByHabitId, updateTrackingEntry } from '../../helpers/habits.helpers';
import { addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, getMonth } from 'date-fns';
import { HabitDetail, HabitTrackingEntry } from '../../../../shared/types/habit.type';
import { DetailItem } from '../../components/detail-item.component';
import { HabitTrackingEntryStatus } from '../../../../shared/enums/habit-tracking-entry-status.enum';

export const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [trackingEntries, setTrackingEntries] = useState<HabitTrackingEntry[]>([]);

    const habitDetail = useMemo(() => {
        if (id) {
            return fetchHabitDetailById(id);
        } else {
            navigate('/habits/list', { replace: true });
            return undefined;
        }
    }, [id, navigate]);

    useEffect(() => {
        setTrackingEntries(getFilteredTrackingEntries(habitDetail!, selectedDate));
    }, [habitDetail, selectedDate]);

    const handleDateChange = (increment: boolean) => {
        if (increment && isSameMonth(selectedDate, new Date())) return;
        setSelectedDate(increment ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1));
    };

    const handleUpdateTrackingEntryStatus = (date: Date, status: HabitTrackingEntryStatus) => {
        updateTrackingEntry(habitDetail!.id, date, status);
        setTrackingEntries(getFilteredTrackingEntries(habitDetail!, selectedDate));
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">
            {habitDetail && (
                <DetailHeader
                    habitName={habitDetail.name}
                    habitDate={selectedDate}
                    onPreviousDate={() => handleDateChange(false)}
                    onNextDate={() => handleDateChange(true)}
                />
            )}

            <div className="row w-100 mt-4 d-flex justify-content-evenly align-items-center">
                {trackingEntries.map(entry => (
                    <div key={new Date(entry.date).getTime()} className="col border border-dark text-center my-1 c-card-size">
                        <DetailItem
                            habitTrackingEntry={entry}
                            onUpdateHabitTrackingEntryStatus={handleUpdateTrackingEntryStatus}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const getFilteredTrackingEntries = (habit: HabitDetail, date: Date) => {
    const allEntries = fetchHabitTrackingEntriesByHabitId(habit.id);
    const filteredEntries = filterTrackingEntriesByMonth(allEntries, date) ?? [];

    const startOfSelectedMonth = startOfMonth(date);
    const endOfSelectedMonth = isSameMonth(date, new Date()) ? new Date() : endOfMonth(date);
    const daysInInterval = eachDayOfInterval({ start: startOfSelectedMonth, end: endOfSelectedMonth });

    console.log(filteredEntries)
    // Crear un mapa para las entradas existentes
    const existingEntriesMap = new Map(filteredEntries.map(entry => [new Date(entry.date).toISOString(), entry]));

    // Crear una nueva lista de entradas con estado pendiente para los días que no tienen entrada
    const updatedEntries = daysInInterval.map(day => {
        const isoDate = day.toISOString();
        if (existingEntriesMap.has(isoDate)) {
            return existingEntriesMap.get(isoDate)!; // Retorna la entrada existente
        } else {
            return {
                date: day,
                status: HabitTrackingEntryStatus.PENDING, // Estado pendiente
            } as HabitTrackingEntry;
        }
    });

    return updatedEntries;
};

const isSameMonth = (firstDate: Date, secondDate: Date) => {
    return getMonth(firstDate) === getMonth(secondDate);
}