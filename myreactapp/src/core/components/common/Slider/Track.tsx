import { getTrackBackground } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';

interface TrackData {
  value: number[];
  max: number;
  min: number;
  colors: Array<string>;
}

export const Track = (data: TrackData) => (params: IRenderTrackParams) => {
  const { props, children } = params;

  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={props.style}
      className='slider-track'
    >
      <div
        ref={props.ref}
        style={{
          background: getTrackBackground({
            values: data.value,
            colors: data.colors,
            min: data.min,
            max: data.max,
          }),
        }}
        className='slider-track__range'
      >
        {children}
      </div>
    </div>
  );
};
