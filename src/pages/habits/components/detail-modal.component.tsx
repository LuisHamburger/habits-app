import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useState, useCallback } from 'react';
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { HabitTrackingEntry } from '../../../shared/types/habit.type';
import { fetchTrackingEntryNote } from "../helpers/habits.helper";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type DetailModalProps = {
    habitTrackingEntry: HabitTrackingEntry;
    onClose: () => void;
    onUpdateHabitTrackingEntryStatus: (date: Date, habitTrackingEntryStatus: HabitTrackingEntryStatus) => void;
    onUpdateHabitTrackingEntryNote: (date: Date, note: string) => void;
};

const StatusButton = ({ trackingStatus, status, icon, onClick }: { trackingStatus: HabitTrackingEntryStatus, status: HabitTrackingEntryStatus, icon: IconProp, onClick: () => void }) => {
    const isActive = trackingStatus === status;
    const btnClass = isActive ? `btn-${status === HabitTrackingEntryStatus.COMPLETED ? 'success' : 'danger'}` : 'btn-outline-dark';

    return (
        <button
            className={`btn ${btnClass} mx-2 fs-2`}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

const renderStatusMessage = (trackingStatus: HabitTrackingEntryStatus) => {
    switch (trackingStatus) {
        case HabitTrackingEntryStatus.PENDING:
            return '¿Lo lograste hoy?';
        case HabitTrackingEntryStatus.COMPLETED:
            return 'Felicidades 😊';
        case HabitTrackingEntryStatus.INCOMPLETE:
            return 'Será la próxima 😉';
        default:
            return '';
    }
};

export const DetailModal = ({ habitTrackingEntry, onClose, onUpdateHabitTrackingEntryStatus, onUpdateHabitTrackingEntryNote }: DetailModalProps) => {
    const entryNote = fetchTrackingEntryNote(habitTrackingEntry.id);
    const [note, setNote] = useState(entryNote?.note ?? '');
    const [trackingStatus, setTrackingStatus] = useState(habitTrackingEntry.status);

    const onNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const onTrackingStatusChange = useCallback((status: HabitTrackingEntryStatus) => {
        setTrackingStatus(status);
    }, []);

    const onSave = () => {
        onUpdateHabitTrackingEntryStatus(habitTrackingEntry.date, trackingStatus);
        onUpdateHabitTrackingEntryNote(habitTrackingEntry.date, note);
        onClose();
    };

    return (
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h5 className="modal-title">{format(habitTrackingEntry.date, 'yyyy-MM-dd')}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group d-flex justify-content-center align-items-center flex-column">
                            <label htmlFor="habitNote">¿Alguna anotación?</label>
                            <textarea
                                id="habitNote"
                                className="form-control"
                                rows={4}
                                placeholder="Escribe tu nota aquí..."
                                value={note}
                                onChange={onNoteChange}
                            />
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                            <label>{renderStatusMessage(trackingStatus)}</label>
                            <div className="mt-2">
                                <StatusButton
                                    trackingStatus={trackingStatus}
                                    status={HabitTrackingEntryStatus.COMPLETED}
                                    icon={faThumbsUp}
                                    onClick={() => onTrackingStatusChange(HabitTrackingEntryStatus.COMPLETED)}
                                />
                                <StatusButton
                                    trackingStatus={trackingStatus}
                                    status={HabitTrackingEntryStatus.INCOMPLETE}
                                    icon={faThumbsDown}
                                    onClick={() => onTrackingStatusChange(HabitTrackingEntryStatus.INCOMPLETE)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn c-btn-outline-gray" onClick={onClose}>
                            Cerrar
                        </button>
                        <button type="button" className="btn c-btn-outline-green" onClick={onSave}>
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
