import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveClientID, saveSessionToken, getClientID } from '../../../shared/helpers/client.helper';
import { useEffect } from 'react';

export const Login = () => {
    const clientID = getClientID();

    const navigate = useNavigate();

    useEffect(() => {
        if (clientID) {
            navigate('/habits/list', { replace: true })
        }
    }, [clientID, navigate])

    const onLoginSuccess = ({ clientId, credential }: CredentialResponse) => {
        saveClientID(clientId!)
        saveSessionToken(credential!)
        navigate('/habits/list', { replace: true });
    };

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