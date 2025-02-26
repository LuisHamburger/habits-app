import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export type SearchProps = {
    onSearchHabit: (habitName: string) => void;
    onCreateHabit: () => void;
}

export const Search = ({onCreateHabit, onSearchHabit}: SearchProps) => {

    const [habitName, setHabitName] = useState('');

    const onInputChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setHabitName(target.value);
    }

    return (
        <div className="flex space-x-2 w-full">
            <input
                type="text"
                className="w-full border border-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Habit's name"
                aria-label="Habit's name"
                onChange={onInputChange}
            />
            <button 
                className="bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md"
                type="button"
                onClick={() => onSearchHabit(habitName)}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button 
                className="bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md"
                type="button"
                onClick={() => onCreateHabit()}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}
