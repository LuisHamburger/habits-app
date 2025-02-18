import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

type DetailHeader = {
    habitName: string;
    habitDate: Date;
    onPreviousDate: () => void;
    onNextDate: () => void;
}

export const DetailHeader = ({ habitName, habitDate, onPreviousDate, onNextDate }: DetailHeader) => {
    return (
        <>
            <div className="row mt-4 w-100">
                <h1 className="text-center c-fs-40">{habitName}</h1>
            </div>

            <div className="row mt-4 w-100 d-flex justify-content-between align-items-center">
                <button
                    className="col-2 btn c-btn-outline-green"
                    type="button"
                    aria-label="Previous Date"
                    onClick={onPreviousDate}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                </button>

                <h2 className="col-6 text-center m-0">{format(habitDate, 'yyyy-MM')}</h2>

                <button
                    className="col-2 btn c-btn-outline-green"
                    style={{ visibility: showNextButton(habitDate) ? 'visible' : 'hidden' }}
                    type="button"
                    aria-label="Next Date"
                    onClick={onNextDate}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
            </div>
        </>
    );
};

const showNextButton = (habitDate: Date) => {
    const currentDate = new Date();
    return (new Date(format(habitDate, 'yyyy-MM')).getTime() < new Date(format(currentDate, 'yyyy-MM')).getTime());
}