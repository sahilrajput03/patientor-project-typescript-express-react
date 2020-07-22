// eslint-disable-next-line @typescript-eslint/no-empty-interface
/* Entries related types below */
export enum HealthCheckRatingScore {
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
  | HealthCheckEntry
// | undefined;
// export type Diagnosis = 
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: whatsEntryType.OCCUPATIONAL
  employerName?: string
  sickLeave?: sickLeaveInterface
  diagnosisCodes?: Array<string>
}
export interface HospitalEntry extends BaseEntry {
  type: whatsEntryType.HOSPITAL
  diagnosisCodes: Array<string>
  discharge?: dischargeInterface
}
export interface HealthCheckEntry extends BaseEntry {
  type: whatsEntryType.HEALTHCHECK;
  healthCheckRating: HealthCheckRatingScore;
}
// const ssTestVariable = {type:"HealthCheck", id: "0", healthCheckRating: HealthCheckRating.CriticalRisk, specialist: "ramanujan"} as HealthCheckEntry //Testing whats good and what's not.
export enum whatsEntryType {
  OCCUPATIONAL = "OccupationalHealthcare",
  HOSPITAL = "Hospital",
  HEALTHCHECK = "HealthCheck"
}
interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description?: string;
}
/* Entries related types above */
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

//Help understanding tsc.
  // console.log('hello-->', { id: "safs", name: "kaap", occupation: "technician", gender: Gender.Male, });
  //Output:- { id: "safs", name: "kaap", occupation: "technician", gender: "male" }


  // let myPersonalPatient: Patient = { id: "safs", name: "kaap", occupation: "Male", gender: Gender.Male, } // This is an example assination to the Patient object.

  // enum Direction {
  //   Up = 1,
  //   Down,
  //   Left,
  //   Right,
  // }
  // Above, we have a numeric enum where Up is initialized with 1. All of the following members are auto - incremented from that point on.In other words, Direction.Up has the value 1, Down has 2, Left has 3, and Right has 4.

  // Another usage of enumbs below:-
  // enum Direction {
  //   Up,
  //   Down,
  //   Left,
  //   Right,
  // }

  // Here, Up would have the value 0, Down would have 1, etc.This auto - incrementing behavior is useful for cases where we might not care about the member values themselves, but do care that each value is distinct from other values in the same enum.

// interface EntryProps {
//   entry: {
//     type: string
//   } | undefined
// }