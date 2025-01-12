import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    // on successful login
    const onLoginSuccess = (credentialResponse: CredentialResponse) => {
        console.log('Login successful:', credentialResponse);
        navigate('/list', { replace: true });
    };

    // on login failure
    const onLoginFailure = () => {
        console.error('Login failed');
        navigate('/list', { replace: true });
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