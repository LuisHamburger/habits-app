import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useCallback } from 'react';

type DetailHeaderProps = {
  habitName: string;
  habitDate: Date;
  habitStartDate: Date;
  habitFinishDate: Date;
  onPreviousDate: () => void;
  onNextDate: () => void;
}

export const DetailHeader = ({
  habitName,
  habitDate,
  habitStartDate,
  habitFinishDate,
  onPreviousDate,
  onNextDate
}: DetailHeaderProps) => {
  const isPreviousVisible = useCallback(() => {
    return new Date(format(habitDate, 'yyyy-MM')).getTime() > new Date(format(habitStartDate, 'yyyy-MM')).getTime();
  }, [habitDate, habitStartDate]);

  const isNextVisible = useCallback(() => {
    const currentDate = new Date();
    return new Date(format(habitDate, 'yyyy-MM')).getTime() < new Date(format(currentDate, 'yyyy-MM')).getTime() && new Date(format(habitDate, 'yyyy-MM')).getTime() < new Date(format(habitFinishDate, 'yyyy-MM')).getTime();
  }, [habitDate, habitFinishDate]);

  return (
    <>
      <div className="w-full text-center border-b border-gray-800">
        <h1 className="text-center text-4xl font-bold">{habitName}</h1>
      </div>

      <div className="mt-10 w-100 grid grid-cols-3 gap-4">
        <button
          className={`${!isPreviousVisible() ? 'invisible' : ''}`}
          type="button"
          aria-label="Previous Date"
          onClick={onPreviousDate}
        >
          <FontAwesomeIcon className="text-emerald-800 text-3xl" icon={faArrowCircleLeft} />
        </button>

        <h2 className="text-center text-2xl">{format(habitDate, 'yyyy-MM')}</h2>

        <button
          className={`${!isNextVisible() ? 'invisible' : ''}`}
          type="button"
          aria-label="Next Date"
          onClick={onNextDate}
        >
          <FontAwesomeIcon className="text-emerald-800 text-3xl" icon={faArrowCircleRight} />
        </button>
      </div>
    </>
  );
};
