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
        date: 'Monday 24.11',
        slots: [
          { startTime: '16:00', endTime: '17:30', artist: 'לירן' },
          { startTime: '17:30', endTime: '19:00', artist: 'יותם רוסו' },
          { startTime: '19:00', endTime: '20:30', artist: 'בן לשפץ' },
          { startTime: '20:30', endTime: '22:00', artist: 'מילורו' },
          { startTime: '22:00', endTime: '23:30', artist: 'רינה' },
          { startTime: '23:30', endTime: '01:00', artist: 'טט' },
          { startTime: '01:00', endTime: '08:00', artist: 'סגור (Closed)' }, // סגירה עד 8:00 בבוקר
        ],
      },
      // --- פיצול "שלישי/רביעי" ---
      {
        date: 'Tuesday 25.11',
        slots: [
          { startTime: '12:00', endTime: '14:00', artist: 'דיג ו בן ברון' },
          { startTime: '14:00', endTime: '15:30', artist: 'נינה' },
          { startTime: '15:30', endTime: '17:00', artist: 'מישל' },
          { startTime: '17:00', endTime: '19:00', artist: 'מוסקון ועומר ענבר' },
          { startTime: '19:00', endTime: '20:30', artist: 'אסף שמואל' },
          { startTime: '20:30', endTime: '22:00', artist: 'מעיין רחמים' },
          { startTime: '22:00', endTime: '23:30', artist: 'קטון שלומי' },
          { startTime: '23:30', endTime: '01:00', artist: 'קלאב דה קומבט' },
          { startTime: '01:00', endTime: '12:00', artist: 'סגור (Closed)' }, // סגירה עד 12:00 בצהריים
        ],
      },
      // --- פיצול "רביעי/חמישי" ---
      {
        date: 'Wednesday 26.11',
        slots: [
          { startTime: '14:00', endTime: '16:00', artist: 'יובי' },
          { startTime: '16:00', endTime: '18:00', artist: 'עמרי סמדר' },
          { startTime: '18:00', endTime: '20:00', artist: 'שרון וליפה' },
          { startTime: '20:00', endTime: '22:00', artist: 'דארקו' },
          { startTime: '22:00', endTime: '23:30', artist: 'קפטן לייב' },
          { startTime: '23:30', endTime: '01:00', artist: 'עמי זמון וריזין' },
          { startTime: '01:00', endTime: '02:30', artist: 'אנימטו' },
          { startTime: '02:30', endTime: '04:00', artist: 'יסמין' },
          { startTime: '04:00', endTime: '05:30', artist: 'פיקסל' },
          { startTime: '05:30', endTime: '07:00', artist: 'סקיינד' },
          { startTime: '07:00', endTime: '14:00', artist: 'סגור (Closed)' }, // סגירה עד 14:00 בצהריים
        ],
      },
      // --- פיצול "חמישי/שישי" ---
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '14:30', endTime: '16:00', artist: 'אושר' },
          { startTime: '16:00', endTime: '18:00', artist: 'רפאל' },
          { startTime: '18:00', endTime: '19:30', artist: 'רודי' },
          { startTime: '19:30', endTime: '22:00', artist: 'הפסקה לשריפה (Break for Burning)' },
          { startTime: '22:00', endTime: '23:30', artist: 'רע ושפי' },
          { startTime: '23:30', endTime: '01:00', artist: 'אביב סאב ובנו' },
          { startTime: '01:00', endTime: '02:30', artist: 'מגית קקון' },
          { startTime: '02:30', endTime: '04:00', artist: 'גניש' },
          { startTime: '04:00', endTime: '06:29', artist: 'עמרי נקודה' },
          { startTime: '06:29', endTime: '06:40', artist: 'טקס' },
          { startTime: '06:40', endTime: '10:00', artist: 'קפטן+סאסי' },
          { startTime: '10:00', endTime: '14:00', artist: 'סגור (Closed)' },
          { startTime: '14:00', endTime: '15:30', artist: 'נועם לשם' },
          { startTime: '15:30', endTime: '17:00', artist: 'פרדוס פויטשס' },
          { startTime: '17:00', endTime: '18:30', artist: 'אנרג׳טר טרזראזיק' },
          { startTime: '18:30', endTime: '20:30', artist: 'סקייזזלוגיק' },
          { startTime: '20:30', endTime: '22:30', artist: 'אזזרזזארדרס' },
          { startTime: '22:30', endTime: '23:59', artist: 'סגור (Closed)' },
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
        date: 'Monday 24.11',
        slots: [
          { startTime: '22:00', endTime: '23:45', artist: 'KINOKO' },
          { startTime: '23:45', endTime: '01:15', artist: 'Daniel Peretz' },
          { startTime: '01:15', endTime: '02:30', artist: 'Limi' },
          { startTime: '02:30', endTime: '03:45', artist: 'Jakob' },
          { startTime: '03:45', endTime: '05:00', artist: 'Tomer Meizner' },
          { startTime: '05:00', endTime: '06:30', artist: 'NINA' },
          { startTime: '06:30', endTime: '08:00', artist: 'Havana Kiosh' },
          { startTime: '08:00', endTime: '09:30', artist: 'Ben Biron' },
          { startTime: '09:30', endTime: '11:00', artist: 'Captain Shlomi' },
        ],
      },
      {
        date: 'Tuesday 25.11',
        slots: [
          { startTime: '00:00', endTime: '01:15', artist: 'Maayan Rahamim' },
          { startTime: '01:15', endTime: '02:30', artist: 'RINA' },
          { startTime: '02:30', endTime: '03:45', artist: 'Yotam Russo' },
          { startTime: '03:45', endTime: '05:00', artist: 'Kino Todo' },
          { startTime: '05:00', endTime: '06:30', artist: 'Omri Dot' },
          { startTime: '06:30', endTime: '08:00', artist: 'Darco' },
        ],
      },
      {
        date: 'Wednesday 26.11',
        slots: [
          { startTime: '00:00', endTime: '01:15', artist: 'Sheffi & Rea' },
          { startTime: '01:15', endTime: '02:30', artist: 'Millero' },
          { startTime: '02:30', endTime: '03:45', artist: 'Mishell' },
          { startTime: '03:45', endTime: '05:00', artist: 'Rafael' },
          { startTime: '05:00', endTime: '06:30', artist: 'UZA B2B NOY' },
          { startTime: '06:30', endTime: '08:00', artist: 'Liran' },
        ],
      },
                        {
        date: 'Sat 22.11',
        slots: [
          { startTime: '00:00', endTime: '01:00', artist: 'Sagigi' },
          { startTime: '00:00', endTime: '02:00', artist: 'Delete Me' },
        ],
      },
      {
        date: 'Thursday 27.11',
        slots: [
          { startTime: '00:00', endTime: '01:15', artist: 'Saint Gal Cohen' },
          { startTime: '01:15', endTime: '02:30', artist: 'Noga' },
          { startTime: '02:30', endTime: '03:45', artist: 'Mentlesh' },
          { startTime: '03:45', endTime: '05:00', artist: 'Edan' },
          { startTime: '05:00', endTime: '06:30', artist: 'Yuvee' },
          { startTime: '06:30', endTime: '08:00', artist: 'Omer Inbar' },
        ],
      },
      {
        date: 'Friday 28.11',
        slots: [
          { startTime: '22:00', endTime: '23:30', artist: 'Konio' },
          { startTime: '23:30', endTime: '01:00', artist: 'Kassie' },
          { startTime: '01:00', endTime: '01:30', artist: 'Morris' },
          { startTime: '01:30', endTime: '03:00', artist: 'Club The Combat' },
          { startTime: '03:00', endTime: '04:30', artist: 'Alex Mazor' },
          { startTime: '04:30', endTime: '06:00', artist: 'Genish' },
          { startTime: '06:00', endTime: '07:30', artist: 'Mosko' },
          { startTime: '07:30', endTime: '09:00', artist: 'Mosko' }, // Mosko מופיע פעמיים: 6:00-7:30 ו-7:30-9:00, אני מחלק אותו לשני סלוטים
        ],
      },
      {
        date: 'Saturday 29.11',
        slots: [
          { startTime: '09:00', endTime: '10:45', artist: 'Sunrise B2B2B2B' },
          { startTime: '10:45', endTime: '12:00', artist: 'Ben Lipshitz' },
        ],
      },
    ],
  },
];

