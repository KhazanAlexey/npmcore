import { FocusEventHandler } from 'react';
import { useController } from 'react-hook-form';

import { SelectField, SelectFieldProps } from '@/core/components/fields';
import { UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';

type SelectFieldHookFormProps = Omit<SelectFieldProps, 'defaultValue' | 'value'> &
  UseControllerCoreProps;

export const SelectFieldHookForm = (props: SelectFieldHookFormProps) => {
  const { name, options, control, rules, onChange, onBlur, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange = (name: string, value: string | number) => {
    field.onChange(value);
    onChange?.(name, value);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    field.onBlur();
    onBlur?.(e);
  };

  return (
    <SelectField
      error={getFieldError(error?.message)}
      value={options.find((o) => o.value === field.value) || null}
      onChange={handleChange}
      options={options}
      name={name}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
