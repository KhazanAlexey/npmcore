import { ButtonHTMLAttributes, LegacyRef, ReactElement } from 'react';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  elementRef?: LegacyRef<HTMLButtonElement>;
  classes?: {
    root?: string;
    startIcon?: string;
    endIcon?: string;
    text?: string;
  };
}

export const Button = (props: ButtonProps) => {
  const {
    classes = {},
    startIcon,
    endIcon,
    elementRef,
    children,
    type = 'submit',
    ...rest
  } = props;

  return (
    <button ref={elementRef} className={cn('btn', classes.root)} type={type} {...rest}>
      {startIcon && (
        <span className={cn('btn-icon btn-icon__start', classes.startIcon)}>{startIcon}</span>
      )}
      <span className={cn('btn-text', classes.text)}>{children}</span>
      {endIcon && <span className={cn('btn-icon btn-icon__end', classes.endIcon)}>{endIcon}</span>}
    </button>
  );
};
