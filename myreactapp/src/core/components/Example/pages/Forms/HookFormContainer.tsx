import { HookForm, HookFormData } from './HookForm';
import { SubmitCoreHandler } from 'core/models';

export const HookFormContainer = () => {
  const onSubmit: SubmitCoreHandler<HookFormData> = (values, form) => {
    setTimeout(() => {
      form.setError!('text_field', { message: 'server_error_handler' });
      console.log('HookFormContainer: ', values);
    }, 1000);
  };

  return <HookForm onSubmit={onSubmit} />;
};
