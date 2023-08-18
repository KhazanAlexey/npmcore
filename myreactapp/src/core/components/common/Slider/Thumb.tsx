import { IRenderThumbParams } from 'react-range/lib/types';
import cn from 'classnames';

interface ThumbData {
  value: number[];
  max: number;
  min: number;
}

export const Thumb =
  ({ max, min, value }: ThumbData) =>
  (params: IRenderThumbParams) => {
    const { props } = params;

    const isMin = min === value[0];
    const isMax = max === value[0];

    return (
      <div {...props} className='slider-thumb'>
        <div
          className={cn(
            'slider-thumb__content',
            (isMin || isMax) && `slider-thumb__content_${isMin ? 'min' : 'max'}`,
          )}
        />
      </div>
    );
  };
