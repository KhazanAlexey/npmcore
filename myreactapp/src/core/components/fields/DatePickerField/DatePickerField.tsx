import { useState, FocusEventHandler } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import cn from 'classnames';

import { ErrorMessage } from '@/core/components/common';

export interface DatePickerFieldProps extends Omit<ReactDatePickerProps, 'name' | 'className'> {
  label?: string | JSX.Element;
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
  error?: string;
  name: string;
  classes?: Partial<
    Record<'root' | 'error' | 'elementLeft' | 'elementRight' | 'label' | 'wrapper', string>
  >;
}

export const DatePickerField = (props: DatePickerFieldProps) => {
  const {
    classes = {},
    label,
    rightContent,
    leftContent,
    value,
    error,
    name,
    onBlur,
    onFocus,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur && onBlur(e);
    setIsFocus(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus && onFocus(e);
    setIsFocus(true);
  };

  return (
    <div
      className={cn(
        'input-box input-box__calendar',
        { 'input-box__no-empty': value || isFocus },
        { 'input-box__invalid': !!error },
        classes.root,
      )}
    >
      {label && (
        <label className={cn('input-box__label', classes.label)} htmlFor={props.name}>
          {label}
        </label>
      )}

      <div className={cn('input-box__input-wrapper', classes.wrapper)}>
        {leftContent && (
          <span className={cn('input-box__element_left', classes.elementLeft)}>{leftContent}</span>
        )}
        <ReactDatePicker
          onBlur={handleBlur}
          onFocus={handleFocus}
          name={name}
          value={value}
          {...rest}
        />
        {rightContent && (
          <span className={cn('input-box__element_right', classes.elementRight)}>
            {rightContent}
          </span>
        )}
      </div>

      {error && <ErrorMessage classError={classes.error} message={error} />}
    </div>
  );
};
