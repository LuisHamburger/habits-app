import './list.css';
import Swal from 'sweetalert2';
import { Header } from '../../components/header.component';
import { Search } from '../../components/search.component';
import { ListItem } from '../../components/list-item.component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHabitsByClientId, deleteHabit } from '../../helpers/habits.helper';
import { getClientID } from '../../../../shared/helpers/client.helper';
import { Habit } from '../../../../shared/types/habit.type';

export const List = () => {
    const clientID = getClientID();
    const navigate = useNavigate();

    useEffect(() => {
        if (!clientID) {
            navigate('landing', { replace: true });
            Swal.fire('Be logged', 'There is an error, please login again.', 'warning');
        }
    }, [clientID, navigate]);

    const [habits, setHabits] = useState<Habit[]>([]);
    const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);

    useEffect(() => {
        if (clientID) {
            const fetchedHabits = fetchHabitsByClientId(clientID);
            setHabits(fetchedHabits);
            setFilteredHabits(fetchedHabits);
        }
    }, [clientID]);

    const onSearchHabit = (habitName: string) => {
        const searchQuery = habitName.trim().toLowerCase();
        if (!searchQuery) {
            setFilteredHabits(habits);
        } else {
            const results = habits.filter(habit => habit.name.toLowerCase().includes(searchQuery));
            setFilteredHabits(results);
            if (results.length === 0) {
                Swal.fire(`No habits found for: ${habitName}`, '', 'error');
            }
        }
    };

    const onCreateHabit = () => {
        navigate('/habits/create', { replace: true });
    };

    const onDeleteHabit = (habitId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHabit(habitId, clientID!);
                const updatedHabits = fetchHabitsByClientId(clientID!);
                setHabits(updatedHabits);
                setFilteredHabits(updatedHabits);
                Swal.fire('Deleted!', 'Your habit has been deleted.', 'success');
            }
        });
    };

    const onDetailHabit = (habitId: string) => {
        navigate(`/habits/${habitId}`, { replace: true });
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">
            <Header />

            <div className="row my-4 w-100">
                <Search onSearchHabit={onSearchHabit} onCreateHabit={onCreateHabit} />
            </div>

            <div className="row mt-4 w-100">
                <div className="col-12">
                    <ul className="list-group">
                        {filteredHabits.length > 0 ? (
                            filteredHabits.map(habit => (
                                <ListItem
                                    key={habit.id}
                                    habit={habit}
                                    onDeleteHabit={onDeleteHabit}
                                    onDetailHabit={onDetailHabit}
                                />
                            ))
                        ) : (
                            <li className="list-group-item text-center">No habits found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
