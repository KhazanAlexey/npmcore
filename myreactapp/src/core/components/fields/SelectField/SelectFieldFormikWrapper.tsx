import { FormikProps } from 'formik';

import { SelectField, SelectFieldProps } from './SelectField';
import { useFormikFieldError } from '@/core/hooks';
import { SelectOptionType } from '@/core/models';

interface SelectFieldFormikWrapperProps
  extends Omit<SelectFieldProps, 'defaultValue' | 'onChange' | 'value'> {
  formikProps: FormikProps<any>;
}

export const SelectFieldFormikWrapper = (props: SelectFieldFormikWrapperProps) => {
  const { formikProps, name, options, ...rest } = props;
  const { values, errors, touched, setFieldValue } = formikProps;

  const getFieldError = useFormikFieldError();

  return (
    <SelectField
      error={getFieldError(errors[name], !!touched[name])}
      value={values[name]}
      onChange={setFieldValue}
      options={options}
      name={name}
      defaultValue={options.find((o: SelectOptionType) => o.value === values[name])}
      {...rest}
    />
  );
};
