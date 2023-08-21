import cn from 'classnames';

export interface ErrorMessageProps {
  message: string;
  classError?: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { message, classError } = props;

  return <span className={cn('error-text', classError)}>{message}</span>;
};
