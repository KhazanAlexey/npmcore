import { useController } from 'react-hook-form';

import { CheckBoxField, CheckBoxFieldProps } from './CheckBoxField';
import { UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';

export type CheckBoxFieldHookFormProps = CheckBoxFieldProps & UseControllerCoreProps;

export const CheckBoxFieldHookForm = (props: CheckBoxFieldHookFormProps) => {
  const { name, control, rules, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: false,
  });

  const handleChange = (name: string, value: boolean) => {
    onChange(value);
  };

  return (
    <CheckBoxField
      error={getFieldError(error?.message)}
      checked={!!value}
      onChange={handleChange}
      name={name}
      {...rest}
    />
  );
};
