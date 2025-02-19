import { useNavigate } from 'react-router-dom';
import './footer.component.css'
import { logOut } from '../../../shared/helpers/client.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

type FooterProps = {
    showBackArrow: boolean;
    showLogout: boolean;
    backArrowNavigateTo?: string;
}


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
        <footer className="navbar w-100 border border-dark rounded footer-box-size footer-box-position">
            <div className="w-100 d-flex justify-content-between align-item-center">
                <div>
                    {showBackArrow && <div className='btn btn-link' onClick={onBackArrow}>
                        <FontAwesomeIcon className="fs-3 c-green-letter" icon={faArrowLeft} />
                    </div>}

                    {showLogout && <div className='btn btn-link' onClick={onLogOut}>
                        <FontAwesomeIcon className="fs-3 c-green-letter" icon={faRightFromBracket} />
                    </div>}
                </div>

                <div>
                    <a className="navbar-brand text-center">
                        Ham<b className='c-green-letter'>Tech</b>
                    </a>
                </div>

            </div>
        </footer>
    );
};