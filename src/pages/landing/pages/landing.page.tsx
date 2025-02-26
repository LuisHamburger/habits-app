import 'animate.css';
import { Login } from '../components/login.component';

export const Landing = () => {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <div className="flex justify-center items-center w-full text-3xl font-bold">
        <h1 className='text-center animate__animated animate__backInLeft me-2'>Haz</h1>
        <h1 className='text-center text-emerald-800 animate__animated animate__flip'>que</h1>
        <h1 className='text-center animate__animated animate__backInRight ms-2'>suceda!</h1>
      </div>

      <div className="flex w-full mt-3 justify-center">
        <div className="animate__animated animate__backInUp">
          <Login />
        </div>
      </div>
    </div>
  );
};