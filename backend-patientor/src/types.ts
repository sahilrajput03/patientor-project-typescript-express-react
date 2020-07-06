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

export type PatientEntrySecuredWithoutSsn = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entry?: Array<string>;
  // visibility: Visibility;
  // comment?: string;//Setting the type of the field as optional.
}