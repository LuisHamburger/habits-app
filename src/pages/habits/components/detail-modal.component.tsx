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
    const btnClass = isActive ? `${status === HabitTrackingEntryStatus.COMPLETED ? 'bg-emerald-800' : 'bg-red-800'} text-white` : 'border-2 border-gray-500 text-gray-500';

    return (
        <button
            className={`btn ${btnClass} mx-2 p-4 rounded-full text-xl`}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-90">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg">
                <div className="modal-header text-center p-4 border-b">
                    <h5 className="text-lg font-bold">{format(habitTrackingEntry.date, 'yyyy-MM-dd')}</h5>
                </div>
                <div className="modal-body p-4">
                    <div className="form-group flex flex-col items-center">
                        <label htmlFor="habitNote" className="mb-2">¿Alguna anotación?</label>
                        <textarea
                            id="habitNote"
                            className="w-full p-2 border rounded mb-4"
                            rows={4}
                            placeholder="Escribe tu nota aquí..."
                            value={note}
                            onChange={onNoteChange}
                        />
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <label className="mb-2">{renderStatusMessage(trackingStatus)}</label>
                        <div className="flex justify-center mt-2">
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
                <div className="modal-footer flex justify-between p-4 border-t">
                    <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg" onClick={onClose}>
                        Cerrar
                    </button>
                    <button type="button" className="bg-green-500 text-white px-6 py-2 rounded-lg" onClick={onSave}>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
};
