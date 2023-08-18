import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  CheckBoxFieldHookForm,
  RadioFieldHookForm,
  SelectFieldHookForm,
  TextFieldHookForm,
  CheckBoxFieldMultiHookForm,
} from '@/core/components/fields';
import { Button } from '@/core/components/common';
import {
  CheckRadioLabel,
  PhotoFieldHookForm,
  DateFieldExample,
} from '@/core/components/Example/components';
import { selectStyles } from '@/core/components/Example/select_style';
import { SubmitCoreHandler } from '@/core/models';
import { capitalizeFirstLetter, maxLength, onlyNumbers } from '@/core/utils/parsers';
import {
  validateCheckBoxField,
  validateCodeField,
  validatePhoneField,
  validatePhotoField,
  validateSelectField,
  validateTextField,
} from '@/core/components/Example/utils';

import plugFrontSideIcon from '@/core/assets/images/plug_back_side.svg';

export interface HookFormData {
  text_field: string;
  phone_code: string;
  mobile_phone: string;
  date_of_issue: null | Date | string;
  support_languages: null | string;
  gender: 'male' | 'female' | null;
  photo: null | File;
  agreement_terms: boolean;
  agreement_terms2: boolean;
}

export interface HookFormProps {
  onSubmit: SubmitCoreHandler<HookFormData>;
}

export const HookForm = (props: HookFormProps) => {
  const { onSubmit } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<HookFormData>({
    mode: 'onSubmit',
    defaultValues: {
      support_languages: 'spanish',
      gender: 'male',
    },
  });

  const submitHandler = (values: HookFormData) => onSubmit(values, { setError });

  return (
    <>
      <h2 className='title'>Hook form</h2>
      <form className='form' onSubmit={handleSubmit(submitHandler)}>
        <TextFieldHookForm
          name='text_field'
          control={control}
          label={t('text_field')}
          parsers={[capitalizeFirstLetter]}
          rules={validateTextField}
        />

        <TextFieldHookForm
          name='phone_code'
          control={control}
          label={t('phone_code')}
          parsers={[onlyNumbers, maxLength(4)]}
          rules={validateCodeField}
        />

        <TextFieldHookForm
          name='mobile_phone'
          control={control}
          label={t('mobile_phone')}
          classes={{
            root: 'input-box__phone',
          }}
          leftContent='+7'
          mask='(999) 999 99 99'
          rules={validatePhoneField}
        />

        <SelectFieldHookForm
          name='support_languages'
          control={control}
          options={[
            { value: 'english', label: 'English' },
            { value: 'hindi', label: 'Hindi' },
            { value: 'spanish', label: 'Spanish' },
          ]}
          styles={selectStyles}
          label={t('support_languages')}
          noOptionsMessage={() => t('no_matches_found')}
          isClearable
          rules={validateSelectField}
        />

        <RadioFieldHookForm
          name='gender'
          control={control}
          classes={{
            root: 'horizontal',
          }}
          options={[
            {
              value: 'male',
              label: <CheckRadioLabel label={t('male')} />,
            },
            {
              value: 'female',
              label: <CheckRadioLabel label={t('female')} />,
            },
          ]}
          label={t('gender')}
        />

        <PhotoFieldHookForm
          name='photo'
          control={control}
          label='Загрузить'
          title={
            <>
              Фото или скан удостоверения <br />
              личности (лицевая сторона)
            </>
          }
          plug={plugFrontSideIcon}
          setError={setError}
          maxSize={2500000}
          rules={validatePhotoField}
        />

        <DateFieldExample
          name='date_of_issue'
          control={control}
          label={t`date_of_issue`}
          rules={validateTextField}
        />

        <CheckBoxFieldMultiHookForm
          checked={watch('agreement_terms') && watch('agreement_terms2')}
          onChange={setValue}
          fields={['agreement_terms', 'agreement_terms2']}
          name='selectAll'
          id='selectAll'
          label={t`selectAll`}
          classes={{ root: 'input-checkbox__big' }}
        />

        <CheckBoxFieldHookForm
          name='agreement_terms'
          control={control}
          id='agreement_terms'
          label='agreement_terms'
          rules={validateCheckBoxField}
        />

        <CheckBoxFieldHookForm
          name='agreement_terms2'
          control={control}
          id='agreement_terms2'
          label='agreement_terms2'
          rules={validateCheckBoxField}
        />

        <Button disabled={isSubmitting} classes={{ root: 'btn-main' }}>
          Продолжить
        </Button>
      </form>
    </>
  );
};
