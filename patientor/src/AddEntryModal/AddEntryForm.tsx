import React from 'react'
// import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Entry, whatsEntryType, HealthCheckRatingScore } from "../types"
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField } from './FormField';
// ************************************** options type1 for select field component BELOW.
export type EntryOptionPrototype = {
  value: whatsEntryType;
  label: string;
};
const entryOptions/* MAIN */: EntryOptionPrototype[] = [
  // ************************************ The order would be same in select filed coponent, and first will be default one.
  { value: whatsEntryType.OCCUPATIONAL, label: "Occupational Healthcare Entry" },
  { value: whatsEntryType.HOSPITAL, label: "Hospital Entry" },
  { value: whatsEntryType.HEALTHCHECK, label: "Health Check Entry" }
];
// **************************************  options type2 for select field component BELOW.
export type HealthCheckOptionPrototype = {
  value: HealthCheckRatingScore,
  label: string
}
const healthCheckOptions/* MAIN */: HealthCheckOptionPrototype[] = [
  { value: HealthCheckRatingScore.Healthy, label: "Healthy" },
  { value: HealthCheckRatingScore.LowRisk, label: "Low Risk" },
  { value: HealthCheckRatingScore.HighRisk, label: "High Risk" },
  { value: HealthCheckRatingScore.CriticalRisk, label: "Critical Risk" }
]
// ***************************************************** AddEntryForm Component BELOW.
interface AddEntryFormProps {
  onSubmit: (values: Entry) => void
  onCancel: () => void
  id: string
}
const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel, id }) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        healthCheckRating: HealthCheckRatingScore.Healthy,
        id: id, // This is for everycase.
        date: "", // This is for everycase.
        specialist: "", // This is for everycase.
        description: "" //Thi is for everycase.
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
        // if (!values.description) {
        //   errors.description = requiredError;
        // }
        console.log('validation executed..')
        return errors;
      }}
    >
      {({ isValid, dirty, values }) => {
        console.log('values inside function==>', values)
        return (
          <Form className="form ui"> {/* This is a FORMIK component. */}
            <SelectField /* This is a pure REACT component that renders SEMANTIC_UI_REACT which inturn renders FORMIK component */
              label="Entry Type" /* This property is directly passed as value of **label** key in the SelectField react component */
              name="type" /* This property is directly passed as value of **name** key in the SelectField react component */
              fieldTypeIdentifier="entryoptions"
              options={entryOptions} /* This property is directly passed as value of **options** key in the SelectField react component */
            />

            <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              fieldTypeIdentifier={values.type === whatsEntryType.HEALTHCHECK ? "healthrating" : "hide"}
              options={healthCheckOptions}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Doctor's Name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description (Optional)"
              name="occupation"
              component={TextField}
            />

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
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
export default AddEntryForm;