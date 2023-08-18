import { FocusEventHandler, useState } from 'react';
import Select, { Props } from 'react-select';
import cn from 'classnames';

import { ErrorMessage } from '@/core/components/common';
import { SelectOptionType } from '@/core/models';

export interface SelectFieldProps extends Omit<Props, 'onChange' | 'isMulti'> {
  label?: string | JSX.Element;
  options: SelectOptionType[];
  onChange?: (name: string, value: string | number) => void;
  error?: string;
  name: string;
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
  classes?: {
    root?: string;
    label?: string;
    error?: string;
    elementLeft?: string;
    elementRight?: string;
  };
}

export const SelectField = (props: SelectFieldProps) => {
  const {
    value,
    name,
    label,
    classes = {},
    error,
    onChange,
    onBlur,
    onFocus,
    placeholder = '',
    leftContent,
    rightContent,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocus(true);
    onFocus?.(e);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocus(false);
    onBlur?.(e);
  };

  const handelChange = (v: any) => onChange?.(name, v?.value ? v.value : null);

  return (
    <div
      className={cn(
        'select-box',
        { 'select-box__no-empty': !!value || isFocus },
        { 'select-box__invalid': !!error },
        classes.root,
      )}
    >
      {leftContent && (
        <span className={cn('select-box__element_left', classes.elementLeft)}>{leftContent}</span>
      )}
      {label && (
        <label className={cn('select-box__label', classes.label)} htmlFor={name}>
          {label}
        </label>
      )}
      <Select
        value={value}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handelChange}
        isError={!!error}
        placeholder={placeholder}
        {...rest}
      />
      {rightContent && (
        <span className={cn('select-box__element_right', classes.elementRight)}>
          {rightContent}
        </span>
      )}
      {error && <ErrorMessage classError={classes.error} message={error} />}
    </div>
  );
};
