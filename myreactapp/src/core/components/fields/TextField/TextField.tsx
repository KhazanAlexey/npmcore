import {
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  PropsWithChildren,
  ReactElement,
  useState,
} from 'react';
import ReactInputMask from 'react-input-mask';
import cn from 'classnames';

import { ErrorMessage, FieldHint } from '@/core/components/common';
import { ChangeCoreEventHandler, MaskedProps } from '@/core/models';

export interface TextFieldProps
  extends Omit<Partial<MaskedProps>, 'onChange' | 'onBlur' | 'onFocus'> {
  name: string;
  parsers?: Array<(value: string) => string>;
  onChange?: ChangeCoreEventHandler;
  onFocus?: (name: string, value: string, e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (name: string, value: string, e: FocusEvent<HTMLInputElement>) => void;
  label?: string | ReactElement;
  error?: string;
  hint?: string;
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    error?: string;
    hint?: string;
    elementLeft?: string;
    elementRight?: string;
  };
}

export const TextField = (props: PropsWithChildren<TextFieldProps>) => {
  const {
    onChange,
    parsers,
    onBlur,
    onFocus,
    label,
    name,
    error,
    hint,
    classes = {},
    value,
    leftContent,
    rightContent,
    mask = '',
    children,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const isEmpty = !!`${props.value || ''}`.length || isFocus;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur && onBlur(name, e.target.value, e);
    setIsFocus(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus && onFocus(name, e.target.value, e);
    setIsFocus(true);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = parsers
      ? parsers.reduce(
          (acc: string, cur: (v: string) => string): string => cur(acc),
          e.target.value,
        )
      : e.target.value;
    onChange?.(name, val, e);
  };

  return (
    <div
      className={cn(
        'input-box',
        { 'input-box__invalid': !!error },
        { 'input-box__active': isFocus },
        { 'input-box__no-empty': isEmpty },
        { 'input-box__disabled': props.disabled },
        classes.root,
      )}
    >
      {label && (
        <label className={cn('input-box__label', classes.label)} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={cn('input-box__input-wrapper')}>
        {leftContent && (
          <span className={cn('input-box__element_left', classes.elementLeft)}>{leftContent}</span>
        )}
        <ReactInputMask
          value={value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn(classes.input)}
          name={name}
          mask={mask}
          {...rest}
        />
        {rightContent && (
          <span className={cn('input-box__element_right', classes.elementRight)}>
            {rightContent}
          </span>
        )}
        {children}
      </div>
      {error ? (
        <ErrorMessage classError={classes.error} message={error} />
      ) : hint ? (
        <FieldHint classes={classes.hint} hint={hint} />
      ) : null}
    </div>
  );
};
