import { useTranslation } from 'react-i18next';
import { Slider } from '../../common/Slider/Slider';
import {SliderHookForm} from "@/core/components/common/Slider/SliderHookForm";
import { CustomSlider } from '../../common/Slider/CustomSlider';



const values = [100, 300, 700, 1000, 1500, 5000, 15000, 25000];

export const Calculator = () => {
  const { t } = useTranslation();

  const onChangeSlider = (name: string, value: number) => {
    // eslint-disable-next-line no-console
    console.log('onChangeSlider: ', { name, value });
  };

  return (
    <div>
      <h1 className='title'>Calculator</h1>
      <h3>Formik Slider</h3>
      <Slider
        values={values}
        name='amount'
        prefix='Kč'
        title={t('loan_amount')}
        currentValue={0}
        onChangeSlider={onChangeSlider}
      />
       <h3>Hook Form Slider</h3>
       <SliderHookForm
            values={values}
            name='amountHF'
            prefix='Kč'
            title={t('loan_amount')}
            currentValue={0}
            onChangeSlider={onChangeSlider}
        />
        <CustomSlider
            values={values}
            name='amountCustom'
            prefix='Kč'
            title={t('loan_amount_input_range')}
            currentValue={0}
            onChangeSlider={onChangeSlider}
        />
    </div>
  );
};
