import { FocusEvent } from 'react';
import { useController } from 'react-hook-form';

import { TextFieldProps, TextField } from './TextField';
import { ChangeCoreEventHandler, UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';

export type TextFieldHookFormProps = Omit<TextFieldProps, 'value'> & UseControllerCoreProps;

export const TextFieldHookForm = (props: TextFieldHookFormProps) => {
  const { name, control, rules, onChange, onBlur, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange: ChangeCoreEventHandler = (name, value, e) => {
    field.onChange(value);
    onChange?.(name, value, e);
  };

  const handleBlur = (name: string, value: string, e: FocusEvent<HTMLInputElement>) => {
    field.onBlur();
    onBlur?.(name, value, e);
  };

  return (
    <TextField
      name={name}
      onChange={handleChange}
      value={field.value}
      onBlur={handleBlur}
      error={getFieldError(error?.message)}
      {...rest}
    />
  );
};
