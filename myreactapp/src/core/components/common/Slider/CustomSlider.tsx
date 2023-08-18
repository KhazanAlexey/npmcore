import { FC, useEffect, useState, useMemo, ChangeEvent } from 'react';
import { IProps } from 'react-range/lib/types';
import cn from 'classnames';
import { useForm } from 'react-hook-form';


import './style.scss';
import { TextFieldProps } from '../../fields/TextField/TextField';
import { UseControllerCoreProps } from '@/core/models/fields';
import {TextFieldHookForm} from "@/core/components/fields";
import { onlyNumbers } from '@/core/utils/parsers/parsers';
import { SliderBtnMinusIcon, SliderBtnPlusIcon } from '../customIcons/customIcons';

enum SliderAction {
  Inc = 'inc',
  Dec = 'dec',
}

interface SliderProps extends Partial<Omit<IProps, 'step' | 'onChange' | 'values'>> {
  values: number[];
  name: string;
  currentValue: number;
  onChangeSlider?: (name: string, value: number) => void;
  changeOutputValue?: (v: string | number) => string | number;
  HeaderComponent?: FC;
  FooterComponent?: FC;
  texFieldProps?: Omit<TextFieldProps, 'value'> & UseControllerCoreProps;
  colors?: string[];
  isVertical?: boolean;
  prefix?: string;
  title?: string;
  classes?: {
    root?: string;
    header?: string;
    content?: string;
    footer?: string;
  };
}

export const CustomSlider = (props: SliderProps) => {
  const {
    currentValue,
    min = 0,
    values,
    name,
    prefix = '',
    onChangeSlider,
    changeOutputValue,
    HeaderComponent,
    FooterComponent,
    colors = ['#FF9900', '#E0E9F2'],
    isVertical = false,
    classes = {},
    title,
    texFieldProps,
  } = props;

  const { handleSubmit, control, setValue } = useForm();

  const [rangeValue, setRangeValue] = useState([min]);

  const max = useMemo(() => (values ? values.length - 1 : 1), [values]);

  const [background, setBackground] = useState<string>(
    `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]}  ${(rangeValue[0] / max) * 100}%, 
    ${colors[0]} ${(rangeValue[0] / max) * 100}%, ${colors[0]} 100%)`,
  );

  const setFieldValue = (name: string, v: string) => {
    const ln = values.length - 1;

    for (let i = 0; i <= ln; i++) {
      if (values[i] >= +v) {
        setSliderValue(i);
        break;
      } else if (i === ln) {
        setSliderValue(i);
      }
    }
  };

  const onSubmit = (values: { [key in string]: string }) => {
    setFieldValue(name, values[name]);
  };

  const setSliderValue = (idx: number) => {
    if (!values.length || !values[idx]) return;
    setRangeValue([idx]);
    onChangeSlider && onChangeSlider(name, values[idx]);
    setValue(name, values[idx]);

    setBackground(
      () =>
        `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]} ${(idx / max) * 100}%, 
        ${colors[1]} ${(idx / max) * 100}%, ${colors[1]} 100%)`,
    );
  };

  useEffect(() => {
    setSliderValue(currentValue);
  }, [currentValue]);

  const handleChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(+e.target.value);
  };

  const onChangeButton = (type: SliderAction) => () => {
    let prev = rangeValue[0];

    switch (type) {
      case SliderAction.Inc:
        prev = prev < max ? prev + 1 : prev;
        break;

      case SliderAction.Dec:
        prev = prev > min ? prev - 1 : prev;
        break;

      default:
        break;
    }

    setSliderValue(prev);
  };

  const sliderLeftActionProps = {
    onClick: onChangeButton(SliderAction.Dec),
    className: cn('slider-btn', min === rangeValue[0] && 'slider-btn__disabled'),
  };

  const sliderRightActionProps = {
    onClick: onChangeButton(SliderAction.Inc),
    className: cn('slider-btn', max === rangeValue[0] && 'slider-btn__disabled'),
  };

  return (
    <div className={cn('custom-slider slider', classes.root, isVertical && 'vertical')}>
      {HeaderComponent ? (
        <HeaderComponent />
      ) : (
        <form className={cn('slider-header', classes.header)} onSubmit={handleSubmit(onSubmit)}>
          <p className='slider-header__title'>{title}</p>
          <TextFieldHookForm
            parsers={[onlyNumbers]}
            name={name}
            onBlur={setFieldValue}
            rightContent={prefix}
            classes={{
              root: 'input-box__slider',
            }}
            control={control}
            {...texFieldProps}
          />
        </form>
      )}
      <div className={cn('slider-content', classes.content)}>
        <div className='slider-container'>
          <SliderBtnMinusIcon {...sliderLeftActionProps} />
          <input
            type='range'
            className='slider'
            id='range'
            step={1}
            min={min}
            max={max}
            value={rangeValue.toString()}
            onChange={handleChangeSlider}
            style={{ background: background }}
          />
          <SliderBtnPlusIcon {...sliderRightActionProps} />
        </div>
      </div>
      {FooterComponent ? (
        <FooterComponent />
      ) : (
        <div className={cn('slider-footer', classes.footer)}>
          <p className='slider-footer__left'>
            {changeOutputValue ? changeOutputValue(values[min]) : values[min]} {prefix}
          </p>
          <p className='slider-footer__right'>
            {changeOutputValue ? changeOutputValue(values[max]) : values[max]} {prefix}
          </p>
        </div>
      )}
    </div>
  );
};
