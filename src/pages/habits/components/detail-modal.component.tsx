import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useState } from 'react';
import { HabitTrackingEntryStatus } from "../../../shared/enums/habit-tracking-entry-status.enum";
import { HabitTrackingEntry } from "../../../shared/types/habit.type";

type DetailModalProps = {
    habitTrackingEntry: HabitTrackingEntry;
    onClose: () => void;
    onUpdateHabitTrackingEntryStatus: (date: Date, habitTrackingEntryStatus: HabitTrackingEntryStatus) => void;
};

export const DetailModal = ({ habitTrackingEntry, onClose, onUpdateHabitTrackingEntryStatus }: DetailModalProps) => {
    const [note, setNote] = useState('');
    const [trackingStatus, setTrackingStatus] = useState(habitTrackingEntry.status);

    const onNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const onTrackingStatusChange = (status: HabitTrackingEntryStatus) => setTrackingStatus(status);

    const onSave = () => {
        onUpdateHabitTrackingEntryStatus(habitTrackingEntry.date, trackingStatus);
        onClose();
    }

    const renderStatusMessage = () => {
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


    return (
        <>
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
                                <label>{renderStatusMessage()}</label>
                                <div className="mt-2">
                                    <button
                                        className={`btn ${trackingStatus === HabitTrackingEntryStatus.COMPLETED ? 'btn-success' : 'btn-outline-dark'} mx-2 fs-2`}
                                        onClick={() => onTrackingStatusChange(HabitTrackingEntryStatus.COMPLETED)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </button>
                                    <button
                                        className={`btn ${trackingStatus === HabitTrackingEntryStatus.INCOMPLETE ? 'btn-danger' : 'btn-outline-dark'} mx-2 fs-2`}
                                        onClick={() => onTrackingStatusChange(HabitTrackingEntryStatus.INCOMPLETE)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    </button>
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

        </>
    );
};
