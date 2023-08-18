import { FormikProps } from 'formik';

import { CheckBoxField, CheckBoxFieldProps } from './CheckBoxField';

interface CheckBoxFieldMultiProps extends Omit<CheckBoxFieldProps, 'onChange'> {
  fields: string[];
  formik: FormikProps<any>;
}

export const CheckBoxFieldMultiFormik = (props: CheckBoxFieldMultiProps) => {
  const { formik, fields, ...rest } = props;

  const handleChange = (name: string, checked: boolean) => {
    const values = fields.reduce((prev, cur) => ({ ...prev, [cur]: checked }), {});

    formik.setValues({ ...formik.values, ...values });
  };

  return <CheckBoxField onChange={handleChange} {...rest} />;
};
