import { ChangeEventHandler, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import cn from 'classnames';

import { ErrorMessage } from '@/core/components/common';

export interface CheckBoxFieldProps
  extends Omit<Partial<InputHTMLAttributes<HTMLInputElement>>, 'onChange' | 'type'> {
  name: string;
  onChange?: (name: string, value: boolean, e?: ChangeEvent<HTMLInputElement>) => void;
  label?: string | ReactElement;
  error?: string;
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    error?: string;
  };
}

export const CheckBoxField = (props: CheckBoxFieldProps) => {
  const { onChange, label, name, error, classes = {}, ...rest } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(name, e.target.checked, e);
  };

  return (
    <div
      className={cn(
        'input-checkbox',
        { 'input-checkbox__disabled': props.disabled },
        { 'input-checkbox__checked': props.checked },
        { 'input-checkbox__invalid': !!error },
        classes.root,
      )}
    >
      <input
        onChange={handleChange}
        className={cn(classes.input)}
        name={name}
        id={name}
        {...rest}
        type='checkbox'
      />

      {label && (
        <label className={cn('input-checkbox__label', classes.label)} htmlFor={name}>
          <span className='input-checkbox__element' />
          {label}
        </label>
      )}
      {error && <ErrorMessage classError={classes.error} message={error} />}
    </div>
  );
};
