import { faQuestion, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HabitTrackingEntry } from '../../../shared/types/habit.type';
import { format } from "date-fns";
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { useState, useCallback } from "react";
import { DetailModal } from "./detail-modal.component";

export type DetailItemProps = {
    habitTrackingEntry: HabitTrackingEntry;
    onUpdateHabitTrackingEntryStatus: (date: Date, habitTrackingEntryStatus: HabitTrackingEntryStatus) => void;
    onUpdateHabitTrackingEntryNote: (date: Date, note: string) => void;
};

const StatusIcon = ({ status }: { status: HabitTrackingEntryStatus }) => {
    const iconProps = {
        className: "fs-1 mb-3",
    };

    switch (status) {
        case HabitTrackingEntryStatus.COMPLETED:
            return <FontAwesomeIcon icon={faThumbsUp} className={`text-success ${iconProps.className}`} />;
        case HabitTrackingEntryStatus.INCOMPLETE:
            return <FontAwesomeIcon icon={faThumbsDown} className={`text-danger ${iconProps.className}`} />;
        case HabitTrackingEntryStatus.PENDING:
            return <FontAwesomeIcon icon={faQuestion} className={iconProps.className} />;
        default:
            return null;
    }
};

export const DetailItem = ({ habitTrackingEntry, onUpdateHabitTrackingEntryStatus, onUpdateHabitTrackingEntryNote }: DetailItemProps) => {
    const dateFormatted = format(habitTrackingEntry.date, 'dd');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = useCallback(() => setShowModal(prev => !prev), []);

    return (
        <div>
            <p className="mt-2">{dateFormatted}</p>

            <div className="d-flex justify-content-center" onClick={toggleModal}>
                <StatusIcon status={habitTrackingEntry.status} />
            </div>

            {showModal && (
                <DetailModal
                    habitTrackingEntry={habitTrackingEntry}
                    onClose={toggleModal}
                    onUpdateHabitTrackingEntryStatus={onUpdateHabitTrackingEntryStatus}
                    onUpdateHabitTrackingEntryNote={onUpdateHabitTrackingEntryNote}
                />
            )}
        </div>
    );
};
