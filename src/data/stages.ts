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
      {
        date: 'Tuesday 25.11',
        slots: [
          { startTime: '18:30', endTime: '20:00', artist: 'Omer Na\'ar' },
          { startTime: '20:00', endTime: '21:30', artist: 'Reut Peleg' },
          { startTime: '21:30', endTime: '23:00', artist: 'Mi Ya Ra' },
          { startTime: '23:00', endTime: '00:30', artist: 'Planet X' },
          { startTime: '00:30', endTime: '02:00', artist: 'Alper' },
          { startTime: '02:00', endTime: '03:30', artist: 'Animato' },
          { startTime: '03:30', endTime: '06:00', artist: 'Shidapu' },
        ],
      },
      {
        date: 'Wednesday 26.11',
        slots: [
          { startTime: '12:00', endTime: '14:00', artist: 'Alper & Offek' },
          { startTime: '14:00', endTime: '18:00', artist: 'Rising Dust (4 Hours Ceremony)' },
          { startTime: '18:00', endTime: '20:00', artist: 'Dr. Seuss' },
          { startTime: '20:00', endTime: '22:00', artist: 'yuvee' },
          { startTime: '22:00', endTime: '01:00', artist: 'Squid' },
          { startTime: '01:00', endTime: '02:30', artist: 'Oxiv' },
          { startTime: '02:30', endTime: '04:30', artist: 'Nevo' },
          { startTime: '04:30', endTime: '06:30', artist: 'Kosta & Mi ya ra' },
          { startTime: '06:30', endTime: '08:00', artist: 'Shvit' },
        ],
      },
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '11:30', endTime: '13:00', artist: 'Hadar Hebler' },
          { startTime: '13:00', endTime: '02:30', artist: 'Soulmeth' },
          { startTime: '02:30', endTime: '16:00', artist: 'Toi Toi' },
          { startTime: '16:00', endTime: '17:00', artist: 'Astral Projection' },
          { startTime: '17:00', endTime: '18:30', artist: 'Outsiders' },
          { startTime: '18:30', endTime: '19:30', artist: 'Skazi' },
        ],
      },
      {
        date: 'Friday 28.11',
        slots: [
          { startTime: '19:00', endTime: '21:00', artist: 'Sasi' },
          { startTime: '21:00', endTime: '22:30', artist: 'Fernanda Pistelli' },
          { startTime: '22:30', endTime: '00:00', artist: 'Fernanda Pistelli & Rising Dust' },
          { startTime: '00:00', endTime: '01:00', artist: 'Rising Dust' },
          { startTime: '01:00', endTime: '03:00', artist: 'Ritmo' },
          { startTime: '03:00', endTime: '05:00', artist: 'Kobi' },
          { startTime: '05:00', endTime: '06:30', artist: 'Detune' },
          { startTime: '06:30', endTime: '07:30', artist: 'Bubble' },
        ],
      },
    ],
  },
  {
    id: 'pixel',
    name: 'Pixel',
    days: [
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '23:00', endTime: '02:30', artist: 'Genish' },
        ],
      },
    ],
  },
  {
    id: 'pony-riders',
    name: 'Pony Riders',
    days: [
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '02:30', endTime: '06:00', artist: 'Genish' },
        ],
      },
    ],
  },
  {
    id: 'paradise',
    name: 'Paradise',
    days: [
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '06:00', endTime: '09:00', artist: 'Genish - Sunrise' },
        ],
      },
    ],
  },
  {
    id: 'art-catalan',
    name: 'Art Catalan',
    days: [
      {
        date: 'Friday 28.11',
        slots: [
          { startTime: '16:30', endTime: '19:00', artist: 'Genish' },
        ],
      },
    ],
  },
  {
    id: 'sunrise-kingdom',
    name: 'Sunrise Kingdom',
    days: [
      {
        date: 'Saturday 29.11',
        slots: [
          { startTime: '06:00', endTime: '09:00', artist: 'Genish' },
        ],
      },
    ],
  },
];