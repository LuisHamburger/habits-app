import { HabitStatus } from '../../../shared/enums/habit-status.enum';
import { HabitTrackingEntryStatus } from '../../../shared/enums/habit-tracking-entry-status.enum';
import { Habit, HabitTrackingEntry } from '../../../shared/types/habit.type';

export const HabitsMock: Habit[] = [
    {
        "name": "Habit 1",
        "id": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "status": HabitStatus.ACTIVE,
    },
    {
        "name": "Habit 2",
        "id": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "clientId": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "status": HabitStatus.ACTIVE,
    }
];

export const HabitTrackingEntryMock: HabitTrackingEntry[] = [
    // Entries for Habit 1
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2025-01-02'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2025-01-03'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2025-01-05'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2025-01-06'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "b1a2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "date": new Date('2025-01-07'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    
    // Entries for Habit 2
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2025-02-02'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2025-02-03'),
        "status": HabitTrackingEntryStatus.INCOMPLETE
    },
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2025-02-04'),
        "status": HabitTrackingEntryStatus.COMPLETED
    },
    {
        "habitId": "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
        "date": new Date('2025-02-05'),
        "status": HabitTrackingEntryStatus.PENDING
    }
];