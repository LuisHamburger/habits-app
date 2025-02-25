import { useState } from 'react';
import { Header } from '../../components/header.component';
import { createHabit } from '../../helpers/habits.helper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getClientID } from '../../../../shared/helpers/client.helper';
import { Footer } from '../../components/footer.component';

export const Create = () => {
    const navigate = useNavigate();
    const clientID = getClientID();

    const [habitData, setHabitData] = useState({
        name: '',
        startDate: '',
        finishDate: '',
    });

    if (!clientID) {
        navigate('landing', { replace: true });
        Swal.fire('Be logged', 'There is an error, please login again.', 'warning');
        return null;
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setHabitData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const onCreate = () => {
        if (!habitData.name || !habitData.startDate || !habitData.finishDate) {
            return Swal.fire('Invalid input', 'Please fill in all fields before creating the habit.', 'error');
        }

        createHabit(habitData.name, habitData.startDate, habitData.finishDate, clientID!);

        Swal.fire({
            icon: 'success',
            title: 'Habit Created!',
            text: `Your habit ${habitData.name} has been created successfully.`,
        }).then(() => {
            navigate('/habits/list', { replace: true });
        });

    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">
            <Header />
            <form className="w-100" onSubmit={(e) => e.preventDefault()}>
                <div className="my-3 text-center">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        onChange={onInputChange}
                        type="text"
                        className="form-control"
                        id="name"
                        value={habitData.name}
                    />
                </div>
                <div className="mb-3 text-center">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                        onChange={onInputChange}
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={habitData.startDate}
                    />
                </div>
                <div className="mb-3 text-center">
                    <label htmlFor="finishDate" className="form-label">Finish Date</label>
                    <input
                        onChange={onInputChange}
                        type="date"
                        className="form-control"
                        id="finishDate"
                        value={habitData.finishDate}
                    />
                </div>
                <button
                    onClick={onCreate}
                    type="button"
                    className="btn c-btn-outline-green w-100"
                >
                    Create
                </button>
            </form>
            <Footer showBackArrow={true} showLogout={false} backArrowNavigateTo="/habits/list" />
        </div>
    );
};
