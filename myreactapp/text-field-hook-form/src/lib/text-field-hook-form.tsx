// import styles from './text-field-hook-form.module.css';
//
// /* eslint-disable-next-line */
// export interface TextFieldHookFormProps {}
//
// export function TextFieldHookForm2(props: TextFieldHookFormProps) {
//   return (
//     <div className={styles['container']}>
//       <h1>Welcome to TextFieldHookForm2!</h1>
//     </div>
//   );
// }
//
//

import {ChangeEvent, FocusEvent} from 'react';
import { useController } from 'react-hook-form';

import { TextFieldProps, TextField } from './text-field';
import {useHookFormFieldError} from "./useHookFormFieldError";
import {UseControllerProps} from "react-hook-form/dist/types/controller";

export type UseControllerCoreProps = Pick<UseControllerProps<any>, 'name' | 'control' | 'rules'>;

export type ChangeCoreEventHandler = (
    name: string,
    value: string,
    e: ChangeEvent<HTMLInputElement>,
) => void;



export type TextFieldHookFormProps = Omit<TextFieldProps, 'value'> & UseControllerCoreProps;

export const TextFieldHookForm = (props: TextFieldHookFormProps) => {
    const { name, control, rules, onChange, onBlur, ...rest } = props;

    const getFieldError = useHookFormFieldError();

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    });

    const handleChange: ChangeCoreEventHandler = (name, value, e) => {
        field.onChange(value);
        onChange?.(name, value, e);
    };

    const handleBlur = (name: string, value: string, e: FocusEvent<HTMLInputElement>) => {
        field.onBlur();
        onBlur?.(name, value, e);
    };

    return (
        <TextField
            name={name}
            onChange={handleChange}
            value={field.value}
            onBlur={handleBlur}
            error={getFieldError(error?.message)}
            {...rest}
        />
    );
};

