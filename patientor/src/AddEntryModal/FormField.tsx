import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Form, Dropdown, DropdownProps } from "semantic-ui-react";
import { Diagnosis } from "../types"; // importantly...
import { EntryOptionPrototype } from './AddEntryForm'

type fieldTypeIdentifierType = "entryoptions" | "hide"

type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOptionPrototype[];
  showHideFlag: fieldTypeIdentifierType;
  // show: boolean;
  // options: EntryOptionPrototype[];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const SelectFieldComponent: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  showHideFlag,
}: SelectFieldProps) => {
  // alert(JSON.stringify({ options, fieldTypeIdentifier }, null, 2))
  switch (showHideFlag) {
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

    case "hide":
      return (<></>)

    default:
      assertNever(showHideFlag);
      return (<></>)
  }
};
/**
 ** 1. TextFieldProps
 ** 2. TextFieldComponent Below.
 */
interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
export const TextFieldComponent: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  form
}: TextProps) => {
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
/**
 ** 1. Number field Interface
 ** 2. NumberFieldComponent
 */
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
  placeholder: string;
}
export const NumberFieldComponent: React.FC<NumberProps> = ({ field, label, min, max, placeholder }: NumberProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} type='number' min={min} max={max} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
/**
 * 1. DiagnosisSelectionPropsInterface
 * 2. DiagnosisSelectionComponent
 */
interface DiagnosisSelectionPropsInterface {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}
export const DiagnosisSelectionComponent = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: DiagnosisSelectionPropsInterface) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldValue(field, data.value);
    setFieldTouched(field, true);
  };
  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));
  //JSX RETURNED BELOW..
  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
