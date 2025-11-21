import type { Stage } from '../types/schedule';

export const stages: Stage[] = [
  {
    id: 'shliff',
    name: 'Shliff',
    days: [
      {
        date: 'Monday 24.11',
        slots: [
          { startTime: '20:00', endTime: '21:30', artist: 'Yahav Nayer' },
          { startTime: '21:30', endTime: '23:00', artist: 'Yuvali' },
          { startTime: '23:00', endTime: '01:00', artist: 'Jakob' },
          { startTime: '01:00', endTime: '02:30', artist: 'Danny Lazarov' },
          { startTime: '02:30', endTime: '04:00', artist: 'Kofyam' },
          { startTime: '04:00', endTime: '05:30', artist: 'bliss' },
          { startTime: '05:30', endTime: '07:00', artist: 'rina' },
          { startTime: '07:00', endTime: '08:00', artist: 'Totem' },
        ],
      },
    ],
  },
];