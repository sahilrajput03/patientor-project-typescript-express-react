import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextFieldComponent, SelectFieldComponent, GenderOption } from "./FormField";
import { Gender, Patient } from "../types";

/*  use type Patient, but omit id and entries, because those are irrelevant for new patient object we get from frontend. */
export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface PropsPatientForm {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" }
];

export const AddPatientForm: React.FC<PropsPatientForm> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        ssn: "",
        dateOfBirth: "",
        occupation: "",
        gender: Gender.Other
      }}
      onSubmit={onSubmit}/* The onSubmit callback has been passed down all the way from our patient list page. Basically it sends a HTTP POST request to our backend, adds the patient returned from the backend to our app's state and closes the modal. If the backend returns an error, the error is displayed on the form. */
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui"> {/* This is a FORMIK component. */}
            <Field /* This is a FORMIK component. */
              label="Name"  /* This is passed in props of TextFieldComponent. */
              placeholder="Name" /* This is passed in props of TextFieldComponent. */
              name="name" /* This is passed as value of *name* key inside ***field*** object in props of TextField. */
              component={TextFieldComponent} /* This IS THE REACT COMPONENT TO WHICH ALL PROPERTIES ARE GETTING PASSED. */
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextFieldComponent}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextFieldComponent}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextFieldComponent}
            />
            <SelectFieldComponent /* This is a pure REACT component that renders SEMANTIC_UI_REACT which inturn renders FORMIK component */
              label="Gender" /* This property is directly passed as value of **label** key in the SelectField react component */
              name="gender" /* This property is directly passed as value of **name** key in the SelectField react component */
              options={genderOptions} /* This property is directly passed as value of **options** key in the SelectField react component */
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
};

export default AddPatientForm;
