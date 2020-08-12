/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { diagnoseEntries, DiagnoseEntry } from './data/diagnoses-ts'
// import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { whatsEntryType, allEntriesUnionForSubmit } from "../types"
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, isString } from "formik";
import { TextFieldComponent, SelectFieldComponent, NumberFieldComponent, DiagnosisSelectionComponent } from './FormField';

// ************************************** options type1 for select field component BELOW.
export type EntryOptionPrototype = {
  value: whatsEntryType;
  label: string;
};
const someunsed = 234
const entryOptions/* MAIN */: EntryOptionPrototype[] = [
  // ** First will be default one in select filed coponent, .
  { value: whatsEntryType.OCCUPATIONAL, label: "Occupational Healthcare Entry" },
  { value: whatsEntryType.HOSPITAL, label: "Hospital Entry" },
  { value: whatsEntryType.HEALTHCHECK, label: "Health Check Entry" }
];
// **************************************  options type2 for select field component BELOW.
// export enum dianosisInterface {
//   OCCUPATIONAL = "OccupationalHealthcare",
//   HOSPITAL = "Hospital",
//   HEALTHCHECK = "HealthCheck"
// }
// export type diagnosisPrototype = {
//   code: dianosisInterface,
//   name: string
// }
const diagnosisListLocal/* MAIN */: DiagnoseEntry[] = diagnoseEntries
// ***************************************************** AddEntryForm Component BELOW.
interface AddEntryFormProps {
  // onSubmit: (values: Entry) => void
  // onSubmit: (values: { [key: string]: string | number }) => void
  // onSubmit: (values: { [key: string]: string | number | object }) => void // This shows error form eslint, say you must not use object directly, coz its behaviour isn't good overall.
  onSubmit: (values: allEntriesUnionForSubmit) => void
  onCancel: () => void
  id: string
}
const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel, id }) => {
  return (
    <Formik
      initialValues={{
        type: whatsEntryType.HEALTHCHECK,
        healthCheckRating: 0, //For Health Check Entry only.
        employerName: "", //For Occupational Entry only.
        sickLeave: {
          startDate: "",
          endDate: ""
        },//For Occupational Entry only
        // "discharge.data": "", // Don't do this, this type of property isn't the shape we need to submit :(
        // "discharge.criteria": "", // Don't do this, this type of property isn't the shape we need to submit :(
        // Below methodology is required.
        discharge: {
          date: "",
          criteria: ""
        },
        id: id, //Base entry field.
        date: "", // Base entry field.
        specialist: "", //Base entry field.
        description: "", //Base entry field.
      }}
      onSubmit={onSubmit}/* The onSubmit callback has been passed down all the way from our patient list page. Basically it sends a HTTP POST request to our backend, adds the patient returned from the backend to our app's state and closes the modal. If the backend returns an error, the error is displayed on the form. */
      // onSubmit={(values) => { // This is for testing submit data for debugging.
      //   alert(`values ${JSON.stringify(values, null, 2)}`)
      // }}
      validate={values => {
        const requiredError = "Field is required";
        // const errors: { [field: string]: string } = {}; // This doesn't work for nested object
        const errors: {
          date?: string, specialist?: string, healthCheckRating?: string, employerName?: string, sickLeave?: {
            startDate?: string, endDate?: string
          }
        } = {};
        // errors.sickLeave = { startDate: "", endDate: "" }

        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName && values.type === whatsEntryType.OCCUPATIONAL) {
          errors.employerName = requiredError;
        }
        if (!values.sickLeave.startDate && values.type === whatsEntryType.OCCUPATIONAL) {
          if (!errors.sickLeave) //Tip: Boolean({}) =>true
            errors.sickLeave = {} // We did this for typescript.
          errors.sickLeave.startDate = requiredError;
        }
        if (!values.sickLeave.endDate && values.type === whatsEntryType.OCCUPATIONAL) {
          if (!errors.sickLeave) //Tip: Boolean({}) =>true
            errors.sickLeave = {} // We did this for typescript{actually for javascript's runtime error :D}.
          errors.sickLeave.endDate = requiredError;
        }
        if (values.healthCheckRating > 2 || values.healthCheckRating < 0) {
          errors.healthCheckRating = `Score can't be ${String(values.healthCheckRating)}, you must set value as 0, 1 or 2.`;
        }
        if (isString(values.healthCheckRating))
          errors.healthCheckRating = `Health score can't be empty.`

        // if (!values.description) {// Description is a optional field.
        //   errors.description = requiredError;
        // }
        // console.log('validation executed..')

        // YIKESS amazing!!!!! JUST FOR THIS MOMENT COMMENTING
        // console.log('errors (nowws) ==>', errors);
        // CRAM LINE 111
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        // console.log('values inside function==>', values)
        return (
          <Form className="form ui"> {/* This is a FORMIK component. */}
            <SelectFieldComponent /* This is a pure REACT component that renders SEMANTIC_UI_REACT which inturn renders FORMIK component */
              label="Entry Type" /* This property is directly passed as value of **label** key in the SelectField react component */
              name="type" /* This property is directly passed as value of **name** key in the SelectField react component */
              options={entryOptions} /* This property is directly passed as value of **options** key in the SelectField react component */
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextFieldComponent}
            />

            {values.type === whatsEntryType.OCCUPATIONAL ? <div>
              <Field
                label="Employer Name"
                placeholder="Dan Abramov"
                name="employerName"
                component={TextFieldComponent}
              />
              <Field
                label="Sick Leave(Start Date, End Date)"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextFieldComponent}
              />
              <Field
                label=""
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextFieldComponent}
              />
            </div> : null}
            {values.type === whatsEntryType.HOSPITAL ? <div>
              <Field
                label="Discharge(Date)"
                placeholder="Specify date of dicharge(Optional)"
                name="discharge.date"
                component={TextFieldComponent}
              />
              <Field
                label="Discharge(Criteria)"
                placeholder="Specify criteria for discharging(Optional)"
                name="discharge.criteria"
                component={TextFieldComponent}
              /></div> : null}
            <br></br>
            {values.type === whatsEntryType.OCCUPATIONAL || values.type === whatsEntryType.HOSPITAL ?
              <DiagnosisSelectionComponent
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={diagnosisListLocal}
                placeholder="Select from dropdown(Optional)"
              /> : null}
            <Field
              label="Specialist"
              placeholder="Doctor's Name Here"
              name="specialist"
              component={TextFieldComponent}
            />
            <Field
              label="Description"
              placeholder="Description (Optional)"
              name="description"
              component={TextFieldComponent}
            />
            {values.type === whatsEntryType.HEALTHCHECK ? <Field
              label="Health Score(or HealthCheckRatingScore)"
              placeholder="Enter from 0, 1 or 2."
              name="healthCheckRating"
              min={0}
              max={2}
              component={NumberFieldComponent}
            /> : null}
            <Grid>{/* This is a SEMANTIC_UI_REACT component. */}
              <Grid.Column floated="left" width={5}> {/* This is a SEMANTIC_UI_REACT component. */}
                <Button type="button" onClick={onCancel}/* This is where we call the onCancel method we pass to this formik form initially. */ color="red"> {/* This is a SEMANTIC_UI_REACT component. */}
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
            <div><pre><b>|--Live-Debug--|</b>{JSON.stringify(values, null, 2)}</pre></div>
          </Form>
        );
      }}
    </Formik >
  );
}
export default AddEntryForm;