export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'comment'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string; // Set as optional field
  // visibility: Visibility;
  // comment?: string;//Setting the type of the field as optional.
}

export type PatientEntrySecuredWithoutSsn = Omit<PatientEntry, 'ssn'>;
/* Entries related types below */
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface dischargeInterface {
  date: string;
  criteria: string;
}
interface sickLeaveInterface {
  startDate: string,
  endDate: string,
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName?: string
  sickLeave?: sickLeaveInterface
  diagnosisCodes?: Array<string>
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  diagnosisCodes: Array<string>
  discharge?: dischargeInterface
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description?: string;
}
/* Entries related types above */

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entry?: Array<string>;
  entries: Entry[]
  // visibility: Visibility;
  // comment?: string;//Setting the type of the field as optional.
}

// export interface NewPatient {
//   name: string,
//   ssn: string,
//   occupation: string,
//   gender: string,
//   dateOfBirth: string
// }

export type NewPatient = Omit<PatientEntry, 'id' | 'entry' | 'entries'>;
