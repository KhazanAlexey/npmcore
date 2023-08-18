import { useCallback, useEffect, FocusEvent, useMemo } from 'react';
import { isValid } from 'date-fns';
import { useController } from 'react-hook-form';

import { DatePickerField, DatePickerFieldProps } from './DatePickerField';
import { onlyNumbers, parseDate } from '@/core/utils/parsers';
import { UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';

type DatePickerFieldHookFormProps = UseControllerCoreProps &
  Omit<DatePickerFieldProps, 'onChange' | 'value'>;

export const DatePickerFieldHookForm = (props: DatePickerFieldHookFormProps) => {
  const { name, control, rules, onBlur, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field: { onChange, value, onBlur: onFieldBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  useEffect(() => {
    const date = value ? new Date(value) : value;
    isValid(date) && handleChange(date);
  }, []);

  const handleChange = useCallback((value: Date) => onChange(value), []);
  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    onFieldBlur();
  }, []);

  const handleChangeRaw = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (typeof value !== 'undefined' && onlyNumbers(value)) {
      const date = parseDate(value);
      onChange(isValid(date) ? date : value);
    }
  }, []);

  const selected: Date | null = useMemo(() => {
    const date = new Date(value);
    return value ? (isValid(date) ? date : null) : null;
  }, [value]);

  return (
    <DatePickerField
      name={name}
      value={value}
      error={getFieldError(error?.message)}
      onChange={handleChange}
      onChangeRaw={handleChangeRaw}
      selected={selected}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
