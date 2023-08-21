import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type GetFieldErrorType = (error?: string) => string;

type UseFieldErrorType = () => GetFieldErrorType;

export const useHookFormFieldError: UseFieldErrorType = () => {
  const { t } = useTranslation();

  return useCallback<GetFieldErrorType>((error) => {
    if (!error) return '';
    const parsedError = JSON.parse(error);

    if (typeof parsedError === 'string') return t(parsedError);
    const { data, message }: any = parsedError;
    return t(message, data);
  }, []);
};
