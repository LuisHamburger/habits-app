import { HabitTrackingEntryStatus } from '../../../shared/enums/habit-tracking-entry-status.enum';
import { Habit, HabitTrackingEntry } from '../../../shared/types/habit.type';

export const HabitsMock: Habit[] = [
    {
        "name": "Habit 1",
        "id": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
        "name": "Habit 2",
        "id": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
        "name": "Habit 3",
        "id": "d1e2f3g4-h5i6-7j8k-9l0m-n1o2p3q4r5s6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
        "name": "Habit 4",
        "id": "e1f2g3h4-i5j6-7k8l-9m0n-o1p2q3r4s5t6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    },
    {
        "name": "Habit 5",
        "id": "f1g2h3i4-j5k6-7l8m-9n0o-p1q2r3s4t5u6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
    }
]

export const CalendarDayMock: HabitTrackingEntry[] = [

    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2023-10-01'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2023-10-02'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2023-10-01'),
        "status": HabitTrackingEntryStatus.PENDING
    },
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2023-10-02'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "d1e2f3g4-h5i6-7j8k-9l0m-n1o2p3q4r5s6",
        "date": new Date('2023-10-01'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "d1e2f3g4-h5i6-7j8k-9l0m-n1o2p3q4r5s6",
        "date": new Date('2023-10-02'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "e1f2g3h4-i5j6-7k8l-9m0n-o1p2q3r4s5t6",
        "date": new Date('2023-10-01'),
        "status": HabitTrackingEntryStatus.PENDING
    },
    {
        "habitId": "e1f2g3h4-i5j6-7k8l-9m0n-o1p2q3r4s5t6",
        "date": new Date('2023-10-02'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "f1g2h3i4-j5k6-7l8m-9n0o-p1q2r3s4t5u6",
        "date": new Date('2023-10-01'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "f1g2h3i4-j5k6-7l8m-9n0o-p1q2r3s4t5u6",
        "date": new Date('2023-10-02'),
        "status": HabitTrackingEntryStatus.COMPLETED
    }

]
