import Swal from 'sweetalert2';
import { Header } from '../../components/header.component';
import { Search } from '../../components/search.component';
import { ListItem } from '../../components/list-item.component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHabitsByClientId, deleteHabit } from '../../helpers/habits.helper';
import { getClientID } from '../../../../shared/helpers/client.helper';
import { Habit } from '../../../../shared/types/habit.type';
import { Footer } from '../../components/footer.component';

export const List = () => {
    const clientID = getClientID();
    const navigate = useNavigate();

    useEffect(() => {
        if (!clientID) {
            navigate('landing', { replace: true });
            Swal.fire('Inicia sesión', 'Hubo un error, por favor inicia sesión nuevamente.', 'warning');
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
        }
    };

    const onCreateHabit = () => {
        navigate('/habits/create', { replace: true });
    };

    const onDeleteHabit = (habitId: string) => {
        Swal.fire({
            title: '¿Seguro?',
            text: '¡Es irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHabit(habitId, clientID!);
                const updatedHabits = fetchHabitsByClientId(clientID!);
                setHabits(updatedHabits);
                setFilteredHabits(updatedHabits);
                Swal.fire('¡Eliminado!', 'El habito ha sido eliminado.', 'success');
            }
        });
    };

    const onDetailHabit = (habitId: string) => {
        navigate(`/habits/${habitId}`, { replace: true });
    };

    return (<>
        <Header />
        <div className="w-full min-h-screen flex flex-col items-center px-3">
            <div className="w-full my-4 flex justify-between">
                <Search onSearchHabit={onSearchHabit} onCreateHabit={onCreateHabit} />
            </div>

            <div className="w-full mt-2">
                <div className="w-full">
                    <ul className="list-none overflow-y-auto max-h-[calc(100vh-200px)]">
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
                            <li className="text-center py-4">¡No se han encontrado habitos!</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        <Footer showBackArrow={false} showLogout={true} backArrowNavigateTo='/habits/list' />
    </>
    );
};
