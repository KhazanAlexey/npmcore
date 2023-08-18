import { UseFormSetValue } from 'react-hook-form/dist/types/form';

import { CheckBoxFieldProps, CheckBoxField } from '@/core/components/fields';

export type CheckBoxFieldMultiProps = Omit<CheckBoxFieldProps, 'onChange'> & {
  fields: string[];
  onChange: UseFormSetValue<any>;
};

export const CheckBoxFieldMultiHookForm = (props: CheckBoxFieldMultiProps) => {
  const { fields, onChange, ...rest } = props;

  const handleChange = (name: string, checked: boolean) => {
    fields.forEach((field) => onChange(field, checked, { shouldValidate: true }));
  };

  return <CheckBoxField onChange={handleChange} {...rest} />;
};
