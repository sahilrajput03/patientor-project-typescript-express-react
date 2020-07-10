import { v4 as uuidv4 } from 'uuid'; // uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9b
import diagnoses from '../../data/diagnoses-ts'; // This is some coool code.
import patients from '../../data/patients-ts'; // This is some coool code.
import { } from '../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DiagnoseEntry, NewPatient, Entry, PatientEntry, PatientEntrySecuredWithoutSsn } from '../types';

const addEntryInAPatient = (id: string, entry: Entry): Entry | string => {
  const desiredPatient = patients.find(p => p.id === id);
  if (desiredPatient) {
    const readyEntry = { ...entry, id: String(uuidv4()) };
    desiredPatient.entries = [readyEntry, ...desiredPatient.entries];
    patients.push(desiredPatient);
    return readyEntry;
  } else {
    return "No matching patient found";
  }
};

const addNewPatient = (newPatient: NewPatient): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newPatientWithId = { ...newPatient, id: String(uuidv4()), entries: [] };
  patients.push(newPatientWithId);
  return newPatientWithId;
};

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const getPatientEntries = (): Array<PatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries }): PatientEntry => ({ id, name, dateOfBirth, gender, occupation, ssn, entries }));
};

export default {
  addEntryInAPatient,
  getEntries,
  addNewPatient,
  getPatientEntries,
};
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // To use only if we are certain we know what we are doing, also this line doesn't get the full power of typescript.
