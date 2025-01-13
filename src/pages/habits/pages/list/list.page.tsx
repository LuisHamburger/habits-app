import './list.css';
import Swal from 'sweetalert2';
import { Header } from '../../components/header.component';
import { Search } from '../../components/search.component';
import { ListItem } from '../../components/list-item.componen';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHabitsByClientId } from '../../helpers/habits.helpers';

export const List = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    
    const habits = useMemo( () => fetchHabitsByClientId( id! ), [ id ]);

    const onSearchHabit = (habitName: string) => {
        Swal.fire(`Any Item Found - ${habitName}`, "", "error")
    }

    const onCreateHabit = () => {
        navigate('/habits/create', {replace: true});
    }

    const onDeleteHabit = (habitId: string) => {
        Swal.fire(`Habit: ${habitId} deleted`, "", "info");
    }

    const onDetailHabit = (habitId: string) => {
        navigate(`/habits/detail/${habitId}`, {replace: true});
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">
            <Header />

            <div className="row my-4 w-100">
                <Search onSearchHabit={onSearchHabit} onCreateHabit={onCreateHabit} />
            </div>

            <div className="row mt-4 w-100">
                <div className="col-12">
                    <ul className="list-group">
                        {habits.map(habit => (
                            <ListItem
                                key={habit.id}
                                habit={habit}
                                onDeleteHabit={onDeleteHabit}
                                onDetailHabit={onDetailHabit}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};