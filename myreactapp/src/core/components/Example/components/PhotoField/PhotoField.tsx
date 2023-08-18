import { SyntheticEvent, useMemo } from 'react';
import { FormikProps } from 'formik';


import cn from 'classnames';
import {
  UploadDocumentField,
  UploadDocumentFieldProps
} from '@/core/components/fields/UploadDocumentField/UploadDocumentField';
import { useFormikFieldError } from '@/core/hooks/useFormikFieldError';
import {ErrorMessage} from "@/core/components/common";

interface PhotoFieldProps extends Omit<UploadDocumentFieldProps, 'label' | 'isShowError'> {
  formikProps: FormikProps<any>;
  plug?: string;
  title: string | JSX.Element;
}

export const PhotoField = (props: PhotoFieldProps) => {
  const { formikProps, name, plug, title, ...rest } = props;
  const { errors, touched, setFieldValue, setFieldError, setTouched, values } = formikProps;

  const getFieldError = useFormikFieldError();

  const handleUploadPhoto = (
    name: string,
    photo: File | null,
    e: SyntheticEvent<any>,
    error?: string,
  ) => {
    if (error) {
      setFieldError(name, error);
      setTouched({ ...touched, [name]: true }, false);
    }

    if (!photo) return;

    setFieldValue(name, photo);
  };

  const src = useMemo(
    () => (values[name] ? URL.createObjectURL(values[name]) : plug),
    [values[name]],
  );

  const error = getFieldError(errors[name], !!touched[name]);

  return (
    <div
      className={cn(
        'photo-field',
        { 'photo-field__invalid': !!error },
        { 'photo-field__no-empty': !!values[name] },
      )}
    >
      <div className='photo-field__image' style={{ backgroundImage: src ? `url(${src})` : '' }} />
      <div className='photo-field__content'>
        <p className='photo-field__title'>{title}</p>
        <div className='photo-field__actions'>
          <UploadDocumentField
            onChange={handleUploadPhoto}
            name={name}
            // maxSize={1000}
            label='Загрузить'
            isShowError={false}
            {...rest}
          />
          {/*<p>Create</p>*/}
        </div>
      </div>
      {!!error && <ErrorMessage message={error} />}
    </div>
  );
};
