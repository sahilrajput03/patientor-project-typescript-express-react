// import diaries from '../../data/diaries' ; // This is some coool code.
// // import diaryData from '../../data/diaries.json'; //old coders style, made to use via type assertions(the right handi side types settings)

// import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';

// // const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // To use only if we are certain we know what we are doing, also this line doesn't get the full power of typescript.

// const getEntries = (): Array<DiaryEntry> => {
//   return diaries;
// };

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return diaries.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// const addEntry = () => {
//   return null;
// };

// export default {
//   getEntries,
//   addEntry,
//   getNonSensitiveEntries
// };