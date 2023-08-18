import { ChangeEventHandler, ReactElement, useState, FC, ChangeEvent } from 'react';
import cn from 'classnames';

// import { ErrorMessage } from '@/core/components/common';
import { PhotoContentProps, PhotoContent } from './PhotoContent';
import { InputContentProps, InputContent } from './InputContent';
import {ErrorMessage} from "@/core/components/common";

export interface UploadDocumentFieldProps extends Omit<InputContentProps, 'handleInputChange'> {
  name: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onChange?: (
    name: string,
    value: File | null,
    e: ChangeEvent<HTMLInputElement>,
    error?: any,
  ) => void;
  label: string | ReactElement;
  isShowPhoto?: boolean;
  maxSize?: number;
  minSize?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  error?: string;
  isShowError?: boolean;
  plug?: string | ReactElement;
  PhotoContentComponent?: FC<PhotoContentProps>;
  InputContentComponent?: FC<InputContentProps>;
  classes?: {
    root?: string;
    label?: string;
    labelText?: string;
    input?: string;
    leftIcon?: string;
    rightIcon?: string;
    error?: string;
    photoContainer?: string;
  };
}

export const UploadDocumentField = (props: UploadDocumentFieldProps) => {
  const {
    name,
    disabled,
    startIcon,
    endIcon,
    label,
    maxSize,
    minSize,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    classes = {},
    isShowPhoto = false,
    plug = '',
    PhotoContentComponent,
    InputContentComponent,
    onChange,
    error,
    isShowError = true,
    ...rest
  } = props;

  const [fileInfo, setFileInfo] = useState<{
    file: File | null;
    src: string | null;
    error: string;
  }>({
    file: null,
    src: null,
    error: '',
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const list = e.target.files;
    if (!list || !list[0]) return;
    try {
      const file = await createImg(list[0]);
      setFileInfo({
        file,
        src: URL.createObjectURL(file),
        error: '',
      });
      onChange?.(name, file, e);
    } catch (error: any) {
      setFileInfo({
        file: null,
        src: null,
        error,
      });
      onChange?.(name, null, e, error);
    }
  };

  const createImg = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      img.onload = function () {
        const width = img.width;
        const height = img.height;
        const errors = [
          { isError: minWidth && width < minWidth, message: 'small_width_photo' },
          { isError: minHeight && height < minHeight, message: 'small_height_photo' },
          { isError: maxWidth && width > maxWidth, message: 'big_width_photo' },
          { isError: maxHeight && height > maxHeight, message: 'big_height_photo' },
          { isError: maxSize && file.size > maxSize, message: 'big_size_photo' },
          { isError: minSize && file.size < minSize, message: 'small_size_photo' },
        ];

        const error = errors.find(({ isError }) => isError);
        error ? reject(error.message) : resolve(file);
      };
    });

  const errorText = fileInfo.error || error;

  const photoContentProps: PhotoContentProps = {
    file: fileInfo.file,
    src: fileInfo.src,
    plug: plug,
    classes: classes.photoContainer,
  };

  const inputContentProps: InputContentProps = {
    name,
    classLabel: classes.label,
    classInput: classes.input,
    classLeftIcon: classes.leftIcon,
    classRightIcon: classes.rightIcon,
    classLabelText: classes.labelText,
    label,
    endIcon,
    startIcon,
    handleInputChange,
    ...rest,
  };

  return (
    <div className={cn('input-file', { 'input-file__disabled': disabled }, classes.root)}>
      {InputContentComponent ? (
        <InputContentComponent {...inputContentProps} />
      ) : (
        <InputContent {...inputContentProps} />
      )}
      {isShowError && errorText && <ErrorMessage classError={classes.error} message={errorText} />}
      {PhotoContentComponent ? (
        <PhotoContentComponent {...photoContentProps} />
      ) : (
        isShowPhoto && <PhotoContent {...photoContentProps} />
      )}
    </div>
  );
};
