import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DetailHeader = () => {
    return (
        <>
            <div className="row mt-4 w-100">
                <h1 className="text-center custom-fs-15">Habit 1</h1>
            </div>

            <div className="row mt-4 w-100 d-flex justify-content-between align-items-center">
                <button 
                    className="col-2 btn btn-outline-green" 
                    type="button" 
                    aria-label="Previous Month"
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                </button>

                <h2 className="col-6 text-center m-0">Enero</h2>

                <button 
                    className="col-2 btn btn-outline-green" 
                    type="button" 
                    aria-label="Next Month"
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
            </div>
        </>
    );
};