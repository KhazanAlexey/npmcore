import { FormikProps } from 'formik';

import { TextFieldProps, TextField } from './TextField';
import { useFormikFieldError } from '@/core/hooks';

export interface TextFieldFormikWrapperProps extends TextFieldProps {
  formikProps: FormikProps<any>;
}

export const TextFieldFormikWrapper = (props: TextFieldFormikWrapperProps) => {
  const { formikProps, name, ...rest } = props;
  const { values, errors, touched, setFieldValue } = formikProps;

  const getFieldError = useFormikFieldError();

  const handleChange = (name: string, value: any) => setFieldValue(name, value);

  return (
    <TextField
      error={getFieldError(errors[name], !!touched[name])}
      value={values[name]}
      onChange={handleChange}
      name={name}
      {...rest}
    />
  );
};
