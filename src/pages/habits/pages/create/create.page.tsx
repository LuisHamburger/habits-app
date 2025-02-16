import { useEffect, useState } from 'react';
import { Header } from '../../components/header.component';
import { createHabit } from '../../helpers/habits.helper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getClientID } from '../../../../shared/helpers/client.helper';

export const Create = () => {

    const navigate = useNavigate();

    const clientID = getClientID();

    useEffect(() => {
        if (!clientID) {
            navigate('landing', { replace: true });
            Swal.fire('Be logged', 'There is an error, please login again.', 'warning');
        }
    }, [clientID, navigate]);


    const [name, setName] = useState<string>('');

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onCreate = () => {
        if (!name.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a habit name!',
            });
            return;
        }

        createHabit(name, clientID!);

        Swal.fire({
            icon: 'success',
            title: 'Habit Created!',
            text: `Your habit ${name} has been created successfully.`,
        }).then(() => {
            navigate('/habits/list', { replace: true });
        });
    };

    return (
        <>
            <Header />
            <form className='w-100' onSubmit={(e) => e.preventDefault()}>
                <div className="my-3 text-center">
                    <label htmlFor="habitName" className="form-label">Name</label>
                    <input
                        onChange={onInputChange}
                        type="text"
                        className="form-control"
                        id="habitName"
                        aria-describedby="habitName"
                        value={name}
                    />
                </div>
                <button onClick={onCreate} type="button" className="btn c-btn-outline-green w-100">Create</button>
            </form>
        </>
    );
};