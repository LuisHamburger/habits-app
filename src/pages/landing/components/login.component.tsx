import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Login = () => {
    const navigate = useNavigate();

    // on successful login
    const onLoginSuccess = (credentialResponse: CredentialResponse) => {
        localStorage.setItem('clientID', credentialResponse.clientId!);
        localStorage.setItem('googleToken', credentialResponse.credential!);
        navigate('/habits/list', { replace: true });
    };

    // on login failure
    const onLoginFailure = () => {
         Swal.fire('Login Fail!', 'There is an error, please try again.', 'error'); 
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
            <GoogleLogin
                text='continue_with'
                theme='filled_black'
                onSuccess={onLoginSuccess}
                onError={onLoginFailure}
            />
        </GoogleOAuthProvider>
    );
};