import './detail.css';
import { DetailHeader } from '../../components/detail-header.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { fetchHabitDetailById, updateTrackingEntry } from '../../helpers/habits.helper';
import { addMonths, subMonths, isSameMonth } from 'date-fns';
import { HabitTrackingEntry } from '../../../../shared/types/habit.type';
import { DetailItem } from '../../components/detail-item.component';
import { HabitTrackingEntryStatus } from '../../../../shared/enums/habit-tracking-entry-status.enum';
import { CURRENT_DATE, getFilteredTrackingEntries } from '../../helpers/detail.helper';


export const Detail = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(CURRENT_DATE);

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
        if (increment && isSameMonth(selectedDate, CURRENT_DATE)) return;
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