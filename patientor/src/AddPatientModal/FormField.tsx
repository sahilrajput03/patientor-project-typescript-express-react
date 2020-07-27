import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender } from "../types";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};
/**
 * Select Field Props Interface and Component.
 */
type SelectFieldComponentPropsInterface = {
  name: string;
  label: string;
  options: GenderOption[];
};
export const SelectFieldComponent: React.FC<SelectFieldComponentPropsInterface> = ({
  name,
  label,
  options
}: SelectFieldComponentPropsInterface) => (
    <Form.Field>{/* This is a SEMANTIC_UI_REACT component. */}
      <label>{label}</label>{/* <label> is a HTML5 tag. */}
      <Field as="select" name={name} className="ui dropdown">{/* This is a FORMIK component. */}
        {options.map(option => (
          <option key={option.value} value={option.value}>{/* This is html tag for defining dropdown menu options */}
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
/**
 * Text Field Component Props Interface and Component.
 */
interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
export const TextFieldComponent: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  /* form */ // This is to log errors.
}) => {
  // console.log('form.errors (checking)=>', form.errors) 
  // Above log just fulls the console with logs..YUCKKKKK!!
  // console.log("field:-", field)
  // So, above field ^^^^, this basically includes *name* key and
  // *value* key of individual properties we pass to Field (FORMIK component).
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
 * Number Field Props Interface and Component.
 */
interface NumberFieldPropsInterface extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}
export const NumberField: React.FC<NumberFieldPropsInterface> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
/**
 * Diagnosis Selection Props Interface and Component.
 */
interface DiagnosisSelectionPropsInterface {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}
export const DiagnosisSelection: React.FC<DiagnosisSelectionPropsInterface> = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: DiagnosisSelectionPropsInterface) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

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
