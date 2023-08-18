import { ValidateMinLengthType } from '@/core/models';
import { coreYup, validateFieldSync } from '@/core/utils/validators';
import { FIELD_REQUIRED } from '@/core/constants';

const dynamicalMessage = {
  phone: { from: 0, to: 10, transform: { regular: /\D/gi } },
  code: { from: 0, to: 4, transform: { regular: /\D/gi } },
} satisfies Record<string, ValidateMinLengthType>;

export const exampleFormikFormSchema = () =>
  coreYup.object().shape({
    text_field: coreYup.string().required(FIELD_REQUIRED),
    phone_code: coreYup.string().required(FIELD_REQUIRED),
    mobile_phone: coreYup
      .string()
      .phoneNumberCode([999, 777, 333])
      .minLength(dynamicalMessage.phone)
      .required(FIELD_REQUIRED),
    // date_of_issue: coreYup
    //   .date()
    //   .required(FIELD_REQUIRED)
    //   .nullable()
    //   .max(new Date(), INCORRECT_DATE)
    //   .typeError(INCORRECT_DATE),
    support_languages: coreYup.string().nullable().required(FIELD_REQUIRED),
    agreement_terms: coreYup.boolean().oneOf([true], FIELD_REQUIRED),
    gender: coreYup.string().nullable().required(FIELD_REQUIRED),
    photo: coreYup.string().nullable().required(FIELD_REQUIRED),
  });

export const validateCheckBoxField = {
  validate: validateFieldSync(coreYup.boolean().oneOf([true], FIELD_REQUIRED)),
};

export const validatePhoneField = {
  validate: validateFieldSync(
    coreYup
      .string()
      .phoneNumberCode([999, 777, 333])
      .minLength(dynamicalMessage.phone)
      .required(FIELD_REQUIRED),
  ),
};

export const validateCodeField = {
  validate: validateFieldSync(
    coreYup.string().minLength(dynamicalMessage.code).required(FIELD_REQUIRED),
  ),
};

export const validateTextField = {
  validate: validateFieldSync(coreYup.string().required(FIELD_REQUIRED)),
};

export const validatePhotoField = {
  validate: validateFieldSync(coreYup.string().required(FIELD_REQUIRED)),
};

export const validateSelectField = {
  validate: validateFieldSync(coreYup.string().nullable().required(FIELD_REQUIRED)),
};
