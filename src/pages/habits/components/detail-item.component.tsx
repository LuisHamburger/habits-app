import { faCheck, faFaceFrown, faFaceSmile, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HabitTrackingEntry } from '../../../shared/types/habit.type';
import { getMonth, format } from "date-fns";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";

export type DetailItemProps = {
    habitTrackingEntry: HabitTrackingEntry
}

export const DetailItem = ({ habitTrackingEntry }: DetailItemProps) => {

    const successDetailBox = (habitTrackingEntry: HabitTrackingEntry) => {
        return <>
            <p className="mt-2">{getMonth(habitTrackingEntry.date)}</p>
            <p className="fs-1 mb-3"> <FontAwesomeIcon icon={faCheck} /> </p>
        </>
    }

    const failDetailBox = (habitTrackingEntry: HabitTrackingEntry) => {
        return <>
            <p className="mt-2">{getMonth(habitTrackingEntry.date)}</p>
            <p className="fs-1 mb-3"> <FontAwesomeIcon icon={faX} /> </p>
        </>
    }

    const pendingDetailBox = (habitTrackingEntry: HabitTrackingEntry) => {
        return <>
            <div className="col border border-dark text-center custom-max-width-150">
                <p className="mt-2">{format(habitTrackingEntry.date, 'LLLL')}</p>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-outline-green me-2" type="button"> <FontAwesomeIcon icon={faFaceSmile} /></button>
                    <button className="btn btn-outline-green" type="button"> <FontAwesomeIcon icon={faFaceFrown} /></button>
                </div>
            </div>
        </>
    }

    return (
        <>
            {habitTrackingEntry.status === HabitTrackingEntryStatus.PENDING ? pendingDetailBox(habitTrackingEntry) : habitTrackingEntry.status === HabitTrackingEntryStatus.COMPLETED ? successDetailBox(habitTrackingEntry) : failDetailBox(habitTrackingEntry)}
        </>
    )
}