import './list.css';
import Swal from 'sweetalert2';
import { Header } from '../../components/header.component';
import { Search } from '../../components/search.component';
import { ListItem } from '../../components/list-item.component';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHabitsByClientId, deleteHabit } from '../../helpers/habits.helpers';

export const List = () => {
    const id = 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6';
    const navigate = useNavigate();
    
    // Fetch habits by client ID
    const habits = useMemo(() => fetchHabitsByClientId(id!), [id]);
    
    // State for holding the filtered habits
    const [filteredHabits, setFilteredHabits] = useState(habits);

    // Handle the search functionality
    const onSearchHabit = (habitName: string) => {
        if (habitName.trim() === '') {
            setFilteredHabits(habits);
        } else {
            const filtered = habits.filter(habit =>
                habit.name.toLowerCase().includes(habitName.toLowerCase())
            );

            if (filtered.length > 0) {
                setFilteredHabits(filtered);
            } else {
                Swal.fire(`No habits found for: ${habitName}`, '', 'error');
            }
        }
    };

    const onCreateHabit = () => {
        navigate('/habits/create', { replace: true });
    };

    // Update the onDeleteHabit to call deleteHabit and refresh the filtered list
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
                // Call the delete function
                deleteHabit(habitId, id);

                // Update filtered habits after deletion
                const updatedHabits = fetchHabitsByClientId(id!)
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
                        {filteredHabits.map(habit => (
                            <ListItem
                                key={habit.id}
                                habit={habit}
                                onDeleteHabit={onDeleteHabit}  // Use the updated delete function
                                onDetailHabit={onDetailHabit}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
