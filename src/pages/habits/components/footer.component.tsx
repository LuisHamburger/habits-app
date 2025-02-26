import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../shared/helpers/client.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

type FooterProps = {
    showBackArrow: boolean;
    showLogout: boolean;
    backArrowNavigateTo?: string;
};

export const Footer = ({ showBackArrow, showLogout, backArrowNavigateTo }: FooterProps) => {

    const navigate = useNavigate();

    const onLogOut = () => {
        logOut();
        navigate('landing', { replace: true });
    }

    const onBackArrow = () => {
        navigate(backArrowNavigateTo!, { replace: true });
    }

    return (
        <footer className="w-full border border-gray-800 p-2 rounded fixed bottom-1">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    {showBackArrow && (
                        <div className="cursor-pointer text-emerald-800 hover:text-emerald-900" onClick={onBackArrow}>
                            <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
                        </div>
                    )}

                    {showLogout && (
                        <div className="cursor-pointer text-emerald-800 hover:text-green-900" onClick={onLogOut}>
                            <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <a className="text-xl font-semibold">
                        Ham<b className="text-emerald-800">Tech</b>
                    </a>
                </div>

            </div>
        </footer>
    );
};
