import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type GetFieldErrorType = (error?: string | object, isTouch?: boolean) => string;

type UseFieldErrorType = () => GetFieldErrorType;

export const useFormikFieldError: UseFieldErrorType = () => {
  const { t } = useTranslation();

  return useCallback<GetFieldErrorType>((error, isTouch) => {
    if (!error || !isTouch) return '';

    if (typeof error === 'string') return t(error);
    const { data, message }: any = error;
    return t(message, data);
  }, []);
};
