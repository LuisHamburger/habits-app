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
        Swal.fire('Inicia sesión', 'Hubo un error, por favor inicia sesión nuevamente.', 'warning');
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
            return Swal.fire('Datos incorrectos', 'Por favor llena toda la información.', 'error');
        }

        createHabit(habitData.name, habitData.startDate, habitData.finishDate, clientID!);

        Swal.fire({
            icon: 'success',
            title: '¡Habito Creado!',
            text: `Tu habito ${habitData.name} ha sido creado correctamente.`,
        }).then(() => {
            navigate('/habits/list', { replace: true });
        });
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <form className="w-full max-w-md p-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="my-3 text-center">
                        <label htmlFor="name" className="block text-sm font-semibold">Nombre</label>
                        <input
                            onChange={onInputChange}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="name"
                            value={habitData.name}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <label htmlFor="startDate" className="block text-sm font-semibold">Fecha de Inicio</label>
                        <input
                            onChange={onInputChange}
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="startDate"
                            value={habitData.startDate}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <label htmlFor="finishDate" className="block text-sm font-semibold">Fecha de Finalización</label>
                        <input
                            onChange={onInputChange}
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            id="finishDate"
                            value={habitData.finishDate}
                        />
                    </div>
                    <button
                        onClick={onCreate}
                        type="button"
                        className="w-full bg-transparent border border-emerald-800 text-emerald-800 py-2 px-4 rounded-md hover:bg-emerald-800"
                    >
                        Crear
                    </button>
                </form>
            </div>
            <Footer showBackArrow={true} showLogout={false} backArrowNavigateTo="/habits/list" />
        </>
    );
};
