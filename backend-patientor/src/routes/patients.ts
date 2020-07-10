/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response } from 'express';
// import diaryService from '../services/diaryService';
import diagnosesService from '../services/diagnoseService';
import { NewPatient, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry, Entry } from '../types';
import { assert } from 'console';
const router = express.Router();

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface InterfaceResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (param: Entry | string) => Response<any>
  //                              This send  ^^^  return  includes all favourable properties which are to be send via express(from http.server)
}

router.post('/:id/entries', (req, res: InterfaceResponse) => {
  console.log('helllooo');
  const body = req.body as Entry;
  const currentPatient = diagnosesService.getPatientEntries().find(p => p.id === req.params.id);
  if (!currentPatient) return res.send("Invalid patient id in the url params. :((");
  if (!(isString(body.type) && isString(body.date) && isString(body.specialist)))
    return res.send("Invalid or missing parameters(type/date/specialist).");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const entryToBeSaved: Entry = { date: body.date, specialist: body.specialist } as Entry;
  if (body.description) entryToBeSaved.description = body.description;
  switch (body.type) {
    case "OccupationalHealthcare":
      const oh_entry: OccupationalHealthcareEntry = { ...entryToBeSaved } as OccupationalHealthcareEntry;
      if (body.employerName) oh_entry.employerName = body.employerName;
      if (body.sickLeave) oh_entry.sickLeave = body.sickLeave;
      if (body.diagnosisCodes) oh_entry.diagnosisCodes = body.diagnosisCodes;
      return res.send(diagnosesService.addEntryInAPatient(req.params.id, oh_entry));

    case "Hospital":
      const h_entry: HospitalEntry = { ...entryToBeSaved } as HospitalEntry;
      if (!body.diagnosisCodes || isString(body.diagnosisCodes))
        return res.send("diagnosisCodes field invalid/missing from the entry data");
      h_entry.diagnosisCodes = body.diagnosisCodes;
      if (body.discharge) h_entry.discharge = body.discharge;
      return res.send(diagnosesService.addEntryInAPatient(req.params.id, h_entry));

    case "HealthCheck":
      const hc_entry: HealthCheckEntry = { ...entryToBeSaved } as HealthCheckEntry;
      if ((!body.healthCheckRating && body.healthCheckRating !== 0) || body.healthCheckRating > 3 || body.healthCheckRating < 0)
        return res.send("healthCheckRating field invalid/missing/out of range value in the entry data.");
      hc_entry.healthCheckRating = body.healthCheckRating;
      return res.send(diagnosesService.addEntryInAPatient(req.params.id, hc_entry));

    default:
      return assertNever(body);
  }
});

router.get('/', (_req, res) => {
  // res.send('Fetching all diaries!');
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(diagnosesService.getPatientEntries(), null, 4));
  // res.send(JSON.stringify(diaryService.getNonSensitiveEntries(), null, 4));
});

router.get('/:id', (req, res) => {
  const singleEntry = diagnosesService.getPatientEntries().find(e => e.id == req.params.id);
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify(singleEntry, null, 4));
});


router.post('/', (req, res) => {
  // const body: NewPatient= req.body as NewPatient; // This works great too.
  const { name, ssn, occupation, gender, dateOfBirth } = req.body as NewPatient;
  if (isString(name) && isString(ssn) && isString(occupation) && isString(gender) && isString(dateOfBirth)) {
    const newPatientWithId = diagnosesService.addNewPatient(req.body);
    res.send(newPatientWithId);
  } else {
    res.send('Bad Entry!!');
  }
});

export default router;