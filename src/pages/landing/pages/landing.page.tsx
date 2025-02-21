import 'animate.css';
import { Login } from '../components/login.component';

export const Landing = () => {
  return (
    <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center flex-column'>
      <div className="row">
        <h1 className='col-4 text-center animate__animated animate__backInLeft'>¡Make</h1>
        <h1 className='col-3 c-green-letter text-center animate__animated animate__flip'>it</h1>
        <h1 className='col-5 text-center animate__animated animate__backInRight'>happen!</h1>
      </div>

      <div className="row mt-3">
        <div className="input-group animate__animated animate__backInUp">
          <Login />
        </div>
      </div>
    </div>
  );
};