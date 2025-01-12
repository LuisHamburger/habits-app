import './detail.css'
import { DetailHeader } from '../../components/detail-header.component';
import { DetailItem } from '../../components/detail-item.component';
import { HabitTrackingEntryStatus } from '../../../../shared/enums/habit-tracking-entry-status.enum';

export const Detail = () => {

    return <>

        <div className="container-fluid min-vh-100 d-flex align-items-center flex-column">

            <DetailHeader />

            <div className="row w-100 mt-4 d-flex justify-content-evenly align-items-center">

                <DetailItem  habitTrackingEntry={{habitId: '123', date: '2024/01/02', status: HabitTrackingEntryStatus.PENDING}} />
                
            </div>

        </div>
    </>
}