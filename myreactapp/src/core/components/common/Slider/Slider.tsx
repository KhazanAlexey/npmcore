import { FC, useEffect, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { Range } from 'react-range';
import { IProps } from 'react-range/lib/types';
import cn from 'classnames';


import { Track } from './Track';
import { Thumb } from './Thumb';
import { onlyNumbers } from '@/core/utils/parsers';
import {TextFieldFormikWrapper, TextFieldFormikWrapperProps} from "@/core/components/fields";
import {SliderBtnMinusIcon, SliderBtnPlusIcon} from '../customIcons/customIcons';

enum SliderAction {
  Inc = 'inc',
  Dec = 'dec',
}

interface ISliderActionProps {
  onClick: (type: SliderAction) => void;
  className: string;
}

interface SliderProps extends Partial<Omit<IProps, 'step' | 'onChange' | 'values'>> {
  values: Array<number>;
  name: string;
  currentValue: number;
  onChangeSlider?: (name: string, value: number) => void;
  changeOutputValue?: (v: string | number) => string | number;
  SliderLeftAction?: FC<ISliderActionProps>;
  SliderRightAction?: FC<ISliderActionProps>;
  HeaderComponent?: FC;
  FooterComponent?: FC;
  texFieldProps?: Omit<TextFieldFormikWrapperProps, 'formikProps' | 'name'>;
  colors?: Array<string>;
  prefix?: string;
  title?: string;
  classes?: {
    root?: string;
    header?: string;
    content?: string;
    footer?: string;
  };
}

export const Slider = (props: SliderProps) => {
  const {
    currentValue,
    min = 0,
    values,
    name,
    prefix = '',
    onChangeSlider,
    changeOutputValue,
    renderThumb,
    renderTrack,
    SliderLeftAction,
    SliderRightAction,
    HeaderComponent,
    FooterComponent,
    colors = ['#FF9900', '#E0E9F2'],
    classes = {},
    title,
    texFieldProps,
    ...rest
  } = props;

  const [value, setValue] = useState([min]);

  const max = useMemo(() => (values ? values.length - 1 : 1), [values]);

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

  const handleSubmit = (values: { [key in string]: string }) => {
    setFieldValue(name, values[name]);
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { [name]: '' },
  });

  const setSliderValue = (idx: number) => {
    if (!values.length || !values[idx]) return;
    setValue([idx]);
    onChangeSlider && onChangeSlider(name, values[idx]);
    formik.setFieldValue(name, values[idx]);
  };

  useEffect(() => {
    setSliderValue(currentValue);
  }, [currentValue]);

  const handleChangeSlider = (value: number[]) => setSliderValue(value[0]);

  const onChangeButton = (type: SliderAction) => () => {
    let prev = value[0];

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
    className: cn('slider-btn', min === value[0] && 'slider-btn__disabled'),
  };

  const sliderRightActionProps = {
    onClick: onChangeButton(SliderAction.Inc),
    className: cn('slider-btn', max === value[0] && 'slider-btn__disabled'),
  };

  return (
    <div className={cn('slider', classes.root)}>
      {HeaderComponent ? (
        <HeaderComponent />
      ) : (
        <form className={cn('slider-header', classes.header)} onSubmit={formik.handleSubmit}>
          <p className='slider-header__title'>{title}</p>
          <TextFieldFormikWrapper
            parsers={[onlyNumbers]}
            formikProps={formik}
            name={name}
            onBlur={setFieldValue}
            rightContent={prefix}
            classes={{
              root: 'input-box__slider',
            }}
            {...texFieldProps}
          />
        </form>
      )}
      <div className={cn('slider-content', classes.content)}>
        {SliderLeftAction ? (
          <SliderLeftAction {...sliderLeftActionProps} />
        ) : (
          <SliderBtnMinusIcon {...sliderLeftActionProps} />
        )}
        <Range
          step={1}
          min={min}
          max={max}
          values={value}
          onChange={handleChangeSlider}
          renderTrack={renderTrack ? renderTrack : Track({ value, min, max, colors })}
          renderThumb={renderThumb ? renderThumb : Thumb({ value, min, max })}
          {...rest}
        />
        {SliderRightAction ? (
          <SliderRightAction {...sliderRightActionProps} />
        ) : (
          <SliderBtnPlusIcon {...sliderRightActionProps} />
        )}
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
