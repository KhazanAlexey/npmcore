import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';


import {CalendarIcon} from "../../../common";
import {UseControllerCoreProps} from "../../../../models";

import { SETTINGS } from '@/core/settings/settings';
import { DatePickerFieldHookForm } from '@/core/components/fields/DatePickerField/DatePickerFieldHookForm';
import { DatePickerFieldProps } from '@/core/components/fields/DatePickerField/DatePickerField';

type DateFieldExampleProps = UseControllerCoreProps &
  Omit<DatePickerFieldProps, 'onChange' | 'value'>;

export const DateFieldExample = (props: DateFieldExampleProps) => {
  const { i18n } = useTranslation();

  return (
    <DatePickerFieldHookForm
      dateFormat={SETTINGS.dateFormat}
      customInput={<InputMask mask='99.99.9999' />}
      locale={i18n.language}
      fixedHeight={true}
      strictParsing
      rightContent={<CalendarIcon className='calendar-icon' />}
      popperPlacement='bottom-end'
      popperModifiers={[
        {
          name: 'arrow',
          options: { padding: 225 },
        },
      ]}
      {...props}
    />
  );
};
