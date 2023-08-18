import { FormikProps } from 'formik';

import { RadioField, RadioFieldProps } from './RadioField';
import { useFormikFieldError } from '@/core/hooks';

interface RadioFieldFormikWrapperProps extends RadioFieldProps {
  formikProps: FormikProps<any>;
}

export const RadioFieldFormikWrapper = (props: RadioFieldFormikWrapperProps) => {
  const { formikProps, name, ...rest } = props;
  const { values, errors, touched, setFieldValue } = formikProps;

  const getFieldError = useFormikFieldError();

  const handleChange = (name: string, value: string) => setFieldValue(name, value);

  return (
    <RadioField
      error={getFieldError(errors[name], !!touched[name])}
      value={values[name]}
      onChange={handleChange}
      name={name}
      {...rest}
    />
  );
};
