export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'comment'>;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string; // Set as optional field
  // visibility: Visibility;
  // comment?: string;//Setting the type of the field as optional.
}

export type PatientEntrySecured = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string; // Set as optional field
  ssn: string; // Set as optional field
  gender: string; // Set as optional field
  occupation: string; // Set as optional field
  // visibility: Visibility;
  // comment?: string;//Setting the type of the field as optional.
}