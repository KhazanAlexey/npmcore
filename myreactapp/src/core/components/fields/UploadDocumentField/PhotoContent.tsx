import { ReactElement } from 'react';
import cn from 'classnames';

export interface PhotoContentProps {
  file: File | null;
  src: string | null;
  plug?: string | ReactElement;
  classes?: string;
}

export const PhotoContent = (props: PhotoContentProps) => {
  const { file, src, plug, classes } = props;

  return (
    <div className={cn('photo-container', classes)}>
      {file && src ? <img src={src} alt={file.name} /> : plug}
    </div>
  );
};
