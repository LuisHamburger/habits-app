import { faQuestion, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HabitTrackingEntry } from '../../../shared/types/habit.type';
import { format } from "date-fns";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { useState } from "react";
import { DetailModal } from "./detail-modal.component";

export type DetailItemProps = {
    habitTrackingEntry: HabitTrackingEntry;
    onUpdateHabitTrackingEntryStatus: (date: Date, habitTrackingEntryStatus: HabitTrackingEntryStatus) => void;
}

export const DetailItem = ({ habitTrackingEntry, onUpdateHabitTrackingEntryStatus }: DetailItemProps) => {
    const dateFormatted = format(habitTrackingEntry.date, 'dd');

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(prev => !prev);

    const getStatusIcon = () => {
        switch (habitTrackingEntry.status) {
            case HabitTrackingEntryStatus.COMPLETED:
                return <FontAwesomeIcon icon={faThumbsUp} className="fs-1 mb-3 text-success" />;
            case HabitTrackingEntryStatus.INCOMPLETE:
                return <FontAwesomeIcon icon={faThumbsDown} className="fs-1 mb-3 text-danger" />;
            case HabitTrackingEntryStatus.PENDING:
                return <FontAwesomeIcon icon={faQuestion} className="fs-1 mb-3" />;
            default:
                return null;
        }
    };

    return (
        <>
            <div>
                <p className="mt-2">{dateFormatted}</p>

                <div className="d-flex justify-content-center" onClick={toggleModal}>
                    {getStatusIcon()}
                </div>

                {showModal && (
                    <DetailModal
                        habitTrackingEntry={habitTrackingEntry}
                        onClose={toggleModal}
                        onUpdateHabitTrackingEntryStatus={onUpdateHabitTrackingEntryStatus}
                    />
                )}

            </div>
        </>
    );
};
