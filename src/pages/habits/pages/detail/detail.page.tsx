import { DetailHeader } from '../../components/detail-header.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { fetchHabitDetailById, updateTrackingEntry } from '../../helpers/habits.helper';
import { addMonths, subMonths, isSameMonth } from 'date-fns';
import { HabitTrackingEntry } from '../../../../shared/types/habit.type';
import { DetailItem } from '../../components/detail-item.component';
import { HabitTrackingEntryStatus } from '../../../../shared/enums/habit-tracking-entry-status.enum';
import { CURRENT_DATE, getFilteredTrackingEntries } from '../../helpers/detail.helper';
import { Footer } from '../../components/footer.component';

export const Detail = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(CURRENT_DATE);

    const [trackingEntries, setTrackingEntries] = useState<HabitTrackingEntry[]>([]);

    const habitDetail = useMemo(() => {
        const habit = fetchHabitDetailById(id!);
        return habit;
    }, [id]);

    useEffect(() => {
        if (!habitDetail) {
            navigate('/habits/list', { replace: true });
        }
    }, [habitDetail, navigate]);

    useEffect(() => {
        setTrackingEntries(habitDetail && selectedDate ? getFilteredTrackingEntries(habitDetail!, selectedDate) : []);
    }, [habitDetail, selectedDate]);


    const onDateChange = (increment: boolean) => {
        if (increment && isSameMonth(selectedDate, CURRENT_DATE)) return;
        setSelectedDate(increment ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1));
    };

    const onUpdateTrackingEntryStatus = (date: Date, status: HabitTrackingEntryStatus) => {
        updateTrackingEntry(habitDetail!.id, date, status);
        setTrackingEntries(getFilteredTrackingEntries(habitDetail!, selectedDate));
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">
            {habitDetail && (
                <DetailHeader
                    habitName={habitDetail.name}
                    habitDate={selectedDate}
                    habitStartDate={habitDetail.startDate}
                    habitFinishDate={habitDetail.finishDate}
                    onPreviousDate={() => onDateChange(false)}
                    onNextDate={() => onDateChange(true)}
                />
            )}

            <div className="row w-100 c-detail-entries-box-size mt-4 d-flex justify-content-between overflow-scroll">
                {trackingEntries.map(entry => (
                    <div key={new Date(entry.date).getTime()} className="col border border-dark text-center my-1 c-card-size rounded">
                        <DetailItem
                            habitTrackingEntry={entry}
                            onUpdateHabitTrackingEntryStatus={onUpdateTrackingEntryStatus}
                        />
                    </div>
                ))}
            </div>

            <Footer showBackArrow={true} showLogout={false} backArrowNavigateTo='/habits/list' />

        </div>
    );
};