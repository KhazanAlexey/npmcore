import yup from 'yup';
import { CorrectDateType, ValidateMinLengthType, PhoneCodeValidateType } from 'core/models';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isCorrectDate(data?: CorrectDateType): yup.StringSchema;

    minLength(data: ValidateMinLengthType): yup.StringSchema;

    phoneNumberCode(codes: PhoneCodeValidateType, message?: string): yup.StringSchema;

    isNumbers(message?: string): yup.StringSchema;
  }

  interface DateSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isCorrectDate(data?: CorrectDateType): yup.DateSchema;
  }
}
