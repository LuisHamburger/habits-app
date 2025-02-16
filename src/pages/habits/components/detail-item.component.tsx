import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HabitTrackingEntry } from '../../../shared/types/habit.type';
import { format } from "date-fns";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";

export type DetailItemProps = {
    habitTrackingEntry: HabitTrackingEntry;
    onUpdateHabitTrackingEntryStatus: (date: Date, habitTrackingEntryStatus: HabitTrackingEntryStatus) => void;
}

export const DetailItem = ({ habitTrackingEntry, onUpdateHabitTrackingEntryStatus }: DetailItemProps) => {
    const dateFormatted = format(habitTrackingEntry.date, 'dd');

    const renderDetailBox = () => {
        switch (habitTrackingEntry.status) {
            case HabitTrackingEntryStatus.COMPLETED:
                return (
                    <>
                        <p className="mt-2">{dateFormatted}</p>
                        <p className="fs-1 mb-3"><FontAwesomeIcon icon={faCheck} /></p>
                    </>
                );

            case HabitTrackingEntryStatus.INCOMPLETE:
                return (
                    <>
                        <p className="mt-2">{dateFormatted}</p>
                        <p className="fs-1 mb-3"><FontAwesomeIcon icon={faX} /></p>
                    </>
                );

            case HabitTrackingEntryStatus.PENDING:
                return (
                    <>
                        <p className="mt-2">{dateFormatted}</p>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <button className="btn c-btn-outline-green me-2" type="button">
                                <FontAwesomeIcon icon={faCheck} onClick={() => onUpdateHabitTrackingEntryStatus(habitTrackingEntry.date, HabitTrackingEntryStatus.COMPLETED)} />
                            </button>
                            <button className="btn c-btn-outline-green" type="button">
                                <FontAwesomeIcon icon={faX} onClick={() => onUpdateHabitTrackingEntryStatus(habitTrackingEntry.date, HabitTrackingEntryStatus.INCOMPLETE)}/>
                            </button>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return <>{renderDetailBox()}</>;
};