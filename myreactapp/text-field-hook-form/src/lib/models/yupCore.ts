export type CorrectDateType = {
  message?: string;
  format?: string;
};

export type ValidateMinLengthType = {
  message?: string;
  from: number;
  to: number;
  transform?: {
    regular: RegExp;
    excludeLength?: number;
  };
};

export type PhoneCodeValidateType = Array<number>;
