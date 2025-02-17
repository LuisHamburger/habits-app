import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Habit } from "../../../shared/types/habit.type";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export type ListItemProps = {
    habit: Habit;
    onDeleteHabit: (habitId: string) => void;
    onDetailHabit: (habitId: string) => void;
};

export const ListItem = ({ habit, onDeleteHabit, onDetailHabit }: ListItemProps) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center border border-dark my-1">
            <span>{habit.name}</span>
            <div>
                <button
                    className="btn c-btn-outline-green me-2"
                    type="button"
                    onClick={() => onDetailHabit(habit.id)}
                    aria-label={`View ${habit.name}`}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => onDeleteHabit(habit.id)}
                    aria-label={`Delete ${habit.name}`}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </li>
    );
};