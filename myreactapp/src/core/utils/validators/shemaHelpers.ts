import { coreYup } from '@/core/utils/validators';

export const validateFieldSync = (schema: coreYup.AnySchema) => (value: any) => {
  try {
    schema.validateSync(value);
    return undefined;
  } catch (e: any) {
    return JSON.stringify(e.errors[0]);
  }
};
