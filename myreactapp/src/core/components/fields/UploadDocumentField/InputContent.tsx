import { ChangeEventHandler, InputHTMLAttributes, ReactElement } from 'react';
import cn from 'classnames';

export interface InputContentProps
  extends Omit<
    Partial<InputHTMLAttributes<HTMLInputElement>>,
    'type' | 'value' | 'multiple' | 'onChange' | 'title'
  > {
  name: string;
  classLabel?: string;
  classInput?: string;
  classLeftIcon?: string;
  classRightIcon?: string;
  classLabelText?: string;
  label: string | ReactElement;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputContent = (props: InputContentProps) => {
  const {
    name,
    classLabel,
    classInput,
    classLeftIcon,
    classRightIcon,
    classLabelText,
    label,
    endIcon,
    startIcon,
    handleInputChange,
    accept,
    ...rest
  } = props;

  return (
    <label className={cn('input-file__label', classLabel)}>
      <input
        name={name}
        type='file'
        accept={accept || 'image/*'}
        className={cn(classInput)}
        onChange={handleInputChange}
        value=''
        {...rest}
      />
      {startIcon && (
        <span className={cn('input-file__icon input-file__icon-left', classLeftIcon)}>
          {startIcon}
        </span>
      )}
      <span className={cn('input-file__label-text', classLabelText)}>{label}</span>
      {endIcon && (
        <span className={cn('input-file__icon input-file__icon-right', classRightIcon)}>
          {endIcon}
        </span>
      )}
    </label>
  );
};
