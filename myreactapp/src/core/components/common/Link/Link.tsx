import { AnchorHTMLAttributes, LegacyRef, ReactElement } from 'react';
import cn from 'classnames';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  elementRef?: LegacyRef<HTMLAnchorElement>;
  classes?: {
    root?: string;
    startIcon?: string;
    endIcon?: string;
    text?: string;
  };
}

export const Link = (props: LinkProps) => {
  const { classes = {}, startIcon, endIcon, elementRef, children, ...rest } = props;

  return (
    <a className={cn('link', classes.root)} ref={elementRef} {...rest}>
      {startIcon && (
        <span className={cn('link_icon link_icon-start', classes.startIcon)}>{startIcon}</span>
      )}
      <span className={cn('link-text', classes.text)}>{children}</span>
      {endIcon && <span className={cn('link_icon link_icon-end', classes.endIcon)}>{endIcon}</span>}
    </a>
  );
};
