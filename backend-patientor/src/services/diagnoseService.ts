import diagnoses from '../../data/diagnoses-ts'; // This is some coool code.
import patients from '../../data/patients-ts'; // This is some coool code.
// import diaryData from '../../data/diaries.json'; //Old coders style, made to use via type assertions(the right handi side types settings)

// import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';
import { DiagnoseEntry } from '../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PatientEntry, PatientEntrySecuredWithoutSsn } from '../types';

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // To use only if we are certain we know what we are doing, also this line doesn't get the full power of typescript.

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const getPatientEntries = (): Array<PatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn }): PatientEntry => ({ id, name, dateOfBirth, gender, occupation, ssn, entry: [] }));
  // return patients.map(({ id, name, dateOfBirth, gender, occupation }): PatientEntrySecuredWithoutSsn => ({ id, name, dateOfBirth, gender, occupation })); // Older code for omiting the ssn entry of each person.
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  //   return diaries.map(({ id, date, weather, visibility }) => ({
  //     id,
  //     date,
  //     weather,
  //     visibility,
  //   }));
  // };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getPatientEntries,
  // getNonSensitiveEntries
};