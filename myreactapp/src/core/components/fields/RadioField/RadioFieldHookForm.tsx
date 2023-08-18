import { useCallback } from 'react';
import { useController } from 'react-hook-form';

import { RadioField, RadioFieldProps } from './RadioField';
import { ChangeCoreEventHandler, UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';

type RadioFieldHookFormProps = Omit<RadioFieldProps, 'value'> & UseControllerCoreProps;

export const RadioFieldHookForm = (props: RadioFieldHookFormProps) => {
  const { name, control, rules, onChange, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange: ChangeCoreEventHandler = useCallback((name, value, e) => {
    field.onChange(value);
    onChange?.(name, value, e);
  }, []);

  return (
    <RadioField
      name={name}
      error={getFieldError(error?.message)}
      value={field.value}
      onChange={handleChange}
      {...rest}
    />
  );
};
