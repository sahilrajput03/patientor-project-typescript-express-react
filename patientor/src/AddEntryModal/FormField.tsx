import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";
// import { Diagnosis } from "../types"; // importantly...
import { EntryOptionPrototype } from './AddEntryForm'
import { HealthCheckOptionPrototype } from "./AddEntryForm";

type fieldTypeIdentifierType = "entryoptions" | "healthrating" | "hide"

type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOptionPrototype[] | HealthCheckOptionPrototype[];
  fieldTypeIdentifier: fieldTypeIdentifierType;
  // show: boolean;
  // options: EntryOptionPrototype[];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  fieldTypeIdentifier,
}: SelectFieldProps) => {
  // alert(JSON.stringify({ options, fieldTypeIdentifier }, null, 2))
  switch (fieldTypeIdentifier) {
    case "entryoptions":
      const entryOptions = options as EntryOptionPrototype[];
      return (
        <Form.Field>
          <label>{label}</label>
          <Field as="select" name={name} className="ui dropdown">
            {entryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </Field>
        </Form.Field>
      );

    case "healthrating":
      const healthRatingOptions = options as HealthCheckOptionPrototype[];
      return (
        <Form.Field>
          <label>{label}</label>
          <Field as="select" name={name} className="ui dropdown">
            {healthRatingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </Field>
        </Form.Field>
      );
    case "hide":
      return (<></>)

    default:
      assertNever(fieldTypeIdentifier);
      return (<></>)
  }
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  form
}) => {
  // console.log('form.errors (checking)=>', form.errors)  // This just fulls the console with logs..YUCKKKKK!!
  // console.log("field:-", field)
  /* So, field ^^^^, this basically includes *name* key and *value* key of individual properties we pass to Field (FORMIK component).*/
  return (
    <Form.Field>{/* This is a SEMANTIC_UI_REACT component. */}
      <label>{label}</label>{/* <label> is a HTML5 tag. */}
      <Field placeholder={placeholder} {...field} />{/* This is a FORMIK component. */}
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />{/* This is a FORMIK component. */}
      </div>
    </Form.Field>
  );
};

/*
  for exercises 9.24 and later :-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

// export const DiagnosisSelection = ({
//   diagnoses,
//   setFieldValue,
//   setFieldTouched
// }: {
//   diagnoses: Diagnosis[];
//   setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
//   setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
// }) => {
//   const field = "diagnosisCodes";
//   const onChange = (
//     _event: React.SyntheticEvent<HTMLElement, Event>,
//     data: DropdownProps
//   ) => {
//     setFieldTouched(field, true);
//     setFieldValue(field, data.value);
//   };

//   const stateOptions = diagnoses.map(diagnosis => ({
//     key: diagnosis.code,
//     text: `${diagnosis.name} (${diagnosis.code})`,
//     value: diagnosis.code
//   }));

//   return (
//     <Form.Field>
//       <label>Diagnoses</label>
//       <Dropdown
//         fluid
//         multiple
//         search
//         selection
//         options={stateOptions}
//         onChange={onChange}
//       />
//       <ErrorMessage name={field} />
//     </Form.Field>
//   );
// };
