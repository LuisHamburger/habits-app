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
        <li className="flex justify-between items-center border border-gray-800 my-1 p-2 rounded">
            <span>{habit.name}</span>
            <div className="flex space-x-2">
                <button
                    className="bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md"
                    type="button"
                    onClick={() => onDetailHabit(habit.id)}
                    aria-label={`View ${habit.name}`}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                    className="bg-transparent border border-red-600 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md"
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
