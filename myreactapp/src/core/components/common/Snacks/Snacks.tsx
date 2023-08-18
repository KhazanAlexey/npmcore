import cn from 'classnames';

import { Snack, NoticeTypes, RemoveSnack } from '@/core/models';
import { Notices, INoticesProps } from '@/core/components/common';

export interface SnacksProps
  extends Omit<INoticesProps, 'removeNotice' | 'notices' | 'typeNotice'> {
  snacks: Array<Snack>;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  classes?: {
    root?: string;
  };
  removeSnack: RemoveSnack;
}

export const Snacks = (props: SnacksProps) => {
  const {
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    classes = {},
    snacks,
    removeSnack,
    ...rest
  } = props;

  return (
    <section
      className={cn('snackbar', `snackbar__${anchorOrigin.horizontal}`, classes.root)}
      style={{ [anchorOrigin.vertical]: 0, [anchorOrigin.horizontal]: 0 }}
    >
      <Notices
        notices={snacks}
        removeNotice={removeSnack}
        typeNotice={NoticeTypes.Snacks}
        {...rest}
      />
    </section>
  );
};
