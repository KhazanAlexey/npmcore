import { ChangeEvent, ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { useController } from 'react-hook-form';
import { UseFormSetError } from 'react-hook-form/dist/types/form';

import { UseControllerCoreProps } from '@/core/models';
import { useHookFormFieldError } from '@/core/hooks';
import { ErrorMessage } from '@/core/components/common/ErrorMessage/ErrorMessage';
import {UploadDocumentField, UploadDocumentFieldProps} from "@/core/components/fields";



type PhotoFieldHookFormProps = Omit<UploadDocumentFieldProps, 'isShowError'> &
  UseControllerCoreProps & {
    plug?: string;
    title: string | ReactNode;
    setError: UseFormSetError<any>;
  };

export const PhotoFieldHookForm = (props: PhotoFieldHookFormProps) => {
  const { name, plug, title, control, rules, onChange: handleChange, setError, ...rest } = props;

  const getFieldError = useHookFormFieldError();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleUploadPhoto = (
    name: string,
    photo: File | null,
    e: ChangeEvent<HTMLInputElement>,
    error?: string,
  ) => {
    error && setError(name, { message: error });
    onChange(photo);
    handleChange?.(name, photo, e);
  };

  const src = useMemo(() => (value ? URL.createObjectURL(value) : plug), [value]);

  const errorMessage = getFieldError(error?.message);

  return (
    <div
      className={cn(
        'photo-field',
        { 'photo-field__invalid': !!errorMessage },
        { 'photo-field__no-empty': !!value },
      )}
    >
      <div className='photo-field__image' style={{ backgroundImage: src ? `url(${src})` : '' }} />
      <div className='photo-field__content'>
        <p className='photo-field__title'>{title}</p>
        <div className='photo-field__actions'>
          <UploadDocumentField
            onChange={handleUploadPhoto}
            name={name}
            isShowError={false}
            {...rest}
          />
          {/*<p>Create</p>*/}
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
