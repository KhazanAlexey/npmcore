import { FormikProps } from 'formik';

import { CheckBoxField, CheckBoxFieldProps } from './CheckBoxField';
import { useFormikFieldError } from '@/core/hooks';

interface CheckBoxFormikWrapperProps extends CheckBoxFieldProps {
  formikProps: FormikProps<any>;
}

export const CheckBoxFieldFormik = (props: CheckBoxFormikWrapperProps) => {
  const { formikProps, name, ...rest } = props;
  const { values, errors, touched, setFieldValue } = formikProps;

  const getFieldError = useFormikFieldError();

  const handleChange = (name: string, value: boolean) => setFieldValue(name, value);

  return (
    <CheckBoxField
      error={getFieldError(errors[name], !!touched[name])}
      checked={values[name]}
      onChange={handleChange}
      name={name}
      {...rest}
    />
  );
};
