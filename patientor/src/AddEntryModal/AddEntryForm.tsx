import React from 'react'
import { diagnoseEntries, DiagnoseEntry } from './data/diagnoses-ts'
// import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Entry, whatsEntryType } from "../types"
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextFieldComponent, SelectFieldComponent, NumberFieldComponent, DiagnosisSelectionComponent } from './FormField';
import { stringify } from 'querystring';

// ************************************** options type1 for select field component BELOW.
export type EntryOptionPrototype = {
  value: whatsEntryType;
  label: string;
};
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
  /*   onSubmit: (values: { [key: string]: string | number }) => void */
  onCancel: () => void
  id: string
}
const AddEntryForm: React.FC<AddEntryFormProps> = ({ /* onSubmit, */ onCancel, id }) => {
  return (
    <Formik
      initialValues={{
        type: whatsEntryType.HEALTHCHECK,
        healthScore: 1, //For Health Check Entry only.
        employerName: "", //For Occupational Entry only.
        sickLeave: {
          startDate: "",
          endDate: ""
        },//For Occupational Entry only
        discharge: {
          data: "",
          criteria: ""
        },
        id: id, //Base entry field.
        date: "", // Base entry field.
        specialist: "", //Base entry field.
        description: "", //Base entry field.
      }}
      // onSubmit={onSubmit}/* The onSubmit callback has been passed down all the way from our patient list page. Basically it sends a HTTP POST request to our backend, adds the patient returned from the backend to our app's state and closes the modal. If the backend returns an error, the error is displayed on the form. */
      onSubmit={(values) => {
        alert(`values ${JSON.stringify(values, null, 2)}`)
      }}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.sickLeave.startDate) {
          errors.employerName = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.healthScore > 2 || values.healthScore < 0) {
          errors.healthScore = `Score can't be ${values.healthScore}, you must set value as 0, 1 or 2.`;
        }
        // if (!values.description) {
        //   errors.description = requiredError;
        // }
        // console.log('validation executed..')
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        console.log('values inside function==>', values)
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

            {values.type == whatsEntryType.OCCUPATIONAL ? <div>
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
            {values.type == whatsEntryType.HOSPITAL ? <div>
              <Field
                label="Discharge(Date)"
                placeholder="Specify date of dicharge"
                name="discharge.date"
                component={TextFieldComponent}
              />
              <Field
                label="Discharge(Criteria)"
                placeholder="Specify criteria for discharging."
                name="discharge.criteria"
                component={TextFieldComponent}
              /></div> : null}
            <br></br>
            {values.type == whatsEntryType.OCCUPATIONAL || values.type == whatsEntryType.HOSPITAL ?
              <DiagnosisSelectionComponent
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={diagnosisListLocal}
                placeholder="Select one from dropdown"
              /> : null}
            <Field
              label="Specialist"
              placeholder="Doctor's Name"
              name="specialist"
              component={TextFieldComponent}
            />
            <Field
              label="Description"
              placeholder="Description (Optional)"
              name="description"
              component={TextFieldComponent}
            />
            {values.type == whatsEntryType.HEALTHCHECK ? <Field
              label="Health Score(or HealthCheckRatingScore)"
              placeholder="Enter from 0, 1 or 2."
              name="healthScore"
              min={0}
              max={3}
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
            {/* <pre>
              <b>--Debug--</b>
              {JSON.stringify(values, null, 2)}
            </pre> */}
            <div><pre><b>|--Live-Debug--|</b>{JSON.stringify(values, null, 2)}</pre></div>
          </Form>
        );
      }}
    </Formik>
  );
}
export default AddEntryForm;