import React from 'react'
import { diagnoseEntries, DiagnoseEntry } from './data/diagnoses-ts'
// import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Entry, whatsEntryType } from "../types"
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextFieldComponent, SelectFieldComponent, NumberFieldComponent, DiagnosisSelectionComponent } from './FormField';

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
        id: id, // This is for everycase.
        date: "", // This is for everycase.
        specialist: "", // This is for everycase.
        description: "", //Thi is for everycase.
        diagnosis: []
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
        if (values.healthScore > 2 || values.healthScore < 0) {
          errors.healthScore = `Score can't be ${values.healthScore}, you must set value as 0, 1 or 2.`;
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
            <SelectFieldComponent /* This is a pure REACT component that renders SEMANTIC_UI_REACT which inturn renders FORMIK component */
              label="Entry Type" /* This property is directly passed as value of **label** key in the SelectField react component */
              name="type" /* This property is directly passed as value of **name** key in the SelectField react component */
              showHideFlag="entryoptions"
              options={entryOptions} /* This property is directly passed as value of **options** key in the SelectField react component */
            />

            {/*             <SelectFieldComponent
              label="Hospital Diagnosis Code"
              name="healthCheckRating"
              showHideFlag={values.type === whatsEntryType.HOSPITAL ? "hospital_diagnosis" : "hide"}
              options={healthCheckOptions}
            />
 */}            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextFieldComponent}
            />
            <Field
              label="Diagnosis component"
              placeholder="Type diagnosis codes here."
              name="diagnosis"
              diagnoses={diagnosisListLocal}
              component={DiagnosisSelectionComponent}
            />
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
            <Field
              label="Health Score(or HealthCheckRatingScore)"
              placeholder="Enter from 0, 1 or 2."
              name="healthScore"
              min={0}
              max={3}
              component={NumberFieldComponent}
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
            <pre>
              <b>--Debug--</b>
              {JSON.stringify(values, null, 2)}
            </pre>
          </Form>
        );
      }}
    </Formik>
  );
}
export default AddEntryForm;