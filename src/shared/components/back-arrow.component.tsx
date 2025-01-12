import { useNavigate } from "react-router-dom";

export type BackArrowProps = {
    navigateToRoute: string;
}

export const BackArrow = ({navigateToRoute}: BackArrowProps) => {
    const navigate = useNavigate();

    const onBackArrow = () => {
        navigate(navigateToRoute, { replace: true });
    }

    return (
        <>
            <div className='btn btn-link position-absolute top-0 start-0 m-3' onClick={onBackArrow}>
                <i className='fas fa-arrow-left fs-1 text-dark'></i>
            </div>
        </>
    )
}
