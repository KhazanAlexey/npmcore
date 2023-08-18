import { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react';
import { ChangeCoreEventHandler } from '@/core/models';

export interface RadioOption {
  label: string | ReactNode;
  value: string | number;
}

export interface RadioFieldOptionProps
  extends Omit<Partial<InputHTMLAttributes<HTMLInputElement>>, 'onChange' | 'type'> {
  option: RadioOption;
  name: string;
  onChange?: ChangeCoreEventHandler;
}

export const RadioFieldOption = (props: RadioFieldOptionProps) => {
  const { option, name, value, onChange, ...rest } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(name, e.target.value, e);
  };

  return (
    <div key={option.value} className='input-radio__option'>
      <input
        name={name}
        type='radio'
        id={`${name}-${option.value}`}
        value={option.value}
        checked={option.value === value}
        onChange={handleChange}
        {...rest}
      />
      <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
    </div>
  );
};
