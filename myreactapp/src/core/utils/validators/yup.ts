import * as coreYup from 'yup';
import { isValid, parse } from 'date-fns';

import { FIELD_MIN_LENGTH, INCORRECT_DATE, ONLY_NUMBERS } from '@/core/constants';
import { onlyNumbers } from '@/core/utils/parsers';
import { CorrectDateType, PhoneCodeValidateType, ValidateMinLengthType } from '@/core/models';

function validateMinLength(this: coreYup.StringSchema, data: ValidateMinLengthType) {
  const { transform, message, to, from } = data;
  const errorMessage = {
    message: message || FIELD_MIN_LENGTH,
    data: {
      from,
      to,
    },
  };

  return this.test({
    name: 'validateMinLength',
    message: errorMessage,
    test: (value) => {
      if (!value) return true;

      let curVal = value;
      if (transform) {
        const { excludeLength = 0, regular } = transform;
        curVal = regular ? curVal.replace(regular, '') : curVal;
        if (curVal.length <= excludeLength) return true;
      }

      errorMessage.data.from = curVal.length;
      return curVal.length === to;
    },
  });
}

function correctDate(this: coreYup.AnySchema, data?: CorrectDateType) {
  return this.test({
    name: 'isCorrectDate',
    message: data?.message || INCORRECT_DATE,
    test: (value) => {
      if (!value) return true;
      const date = data?.format ? parse(`${value}`, data.format, new Date()) : value;
      return isValid(new Date(date));
    },
  });
}

function isNumbers(this: coreYup.StringSchema, message?: string) {
  return this.matches(/^\d+$/, message || ONLY_NUMBERS);
}

function validateCodePhone(
  this: coreYup.StringSchema,
  codes: PhoneCodeValidateType,
  message = 'incorrect_phone_code',
) {
  return this.test({
    name: 'validateCodePhone',
    message,
    test: (value) => {
      if (!value) return true;
      const codeLength = `${codes[0]}`.length;
      const val = onlyNumbers(value);
      const searchStr = val.length < codeLength ? val : val.slice(0, codeLength);
      return codes.some((code) => `${code}`.slice(0, searchStr.length).includes(searchStr));
    },
  });
}

coreYup.addMethod<coreYup.StringSchema>(coreYup.string, 'minLength', validateMinLength);
coreYup.addMethod<coreYup.StringSchema>(coreYup.string, 'phoneNumberCode', validateCodePhone);
coreYup.addMethod<coreYup.StringSchema>(coreYup.string, 'isNumbers', isNumbers);
coreYup.addMethod<any>(coreYup.mixed, 'isCorrectDate', correctDate);

export { coreYup };
