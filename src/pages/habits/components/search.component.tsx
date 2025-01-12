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
        <div className="input-group">
            <input
                type="text"
                className="form-control border border-dark"
                placeholder="Habit's name"
                aria-label="Habit's name"
                onChange={onInputChange}
            />
            <button className="btn btn-outline-green fs-1" type="button" id="button-addon2" onClick={() => onSearchHabit(habitName)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button className="btn btn-outline-green fs-1" type="button" id="button-addon2" onClick={() => onCreateHabit()}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
}