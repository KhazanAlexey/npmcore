import { ReactNode } from 'react';
import cn from 'classnames';

import { ErrorMessage } from '@/core/components/common';
import { RadioFieldOption, RadioFieldOptionProps, RadioOption } from './RadioFieldOption';

export interface RadioFieldProps extends Omit<RadioFieldOptionProps, 'option'> {
  options: RadioOption[];
  label?: ReactNode | string;
  error?: string;
  classes?: {
    root?: string;
    label?: string;
    error?: string;
  };
  disabled?: boolean;
  required?: boolean;
}

export const RadioField = (props: RadioFieldProps) => {
  const { label, options, classes = {}, error, ...rest } = props;

  return (
    <div
      className={cn(
        'input-radio',
        { 'input-radio__invalid': error },
        { 'input-radio__disabled': props.disabled },
        { 'input-radio__required': props.required },
        classes.root,
      )}
    >
      {label && <div className={cn('input-radio__label', classes.label)}>{label}</div>}
      <div className='input-radio__options'>
        {options.map((option) => (
          <RadioFieldOption key={option.value} option={option} {...rest} />
        ))}
      </div>
      {error && <ErrorMessage classError={classes.error} message={error} />}
    </div>
  );
};
