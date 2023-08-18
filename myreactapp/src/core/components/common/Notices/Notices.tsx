import {Alert, NoticeType, Snack} from '@/core/models/common';
import { FC } from 'react';
import { AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, AlertWarningIcon } from '../customIcons/customIcons';


import { NoticeProps, Notice } from './Notice';

interface NoticeComponentProps extends Omit<NoticeProps, 'notice' | 'typeIcon'> {
  maxNotices?: number;
  notices: Array<Alert | Snack>;
  typeIcons: { [key in NoticeType]: JSX.Element };
}

export interface INoticesProps extends Omit<NoticeComponentProps, 'typeIcons'> {
  ErrorIcon?: JSX.Element;
  InfoIcon?: JSX.Element;
  SuccessIcon?: JSX.Element;
  WarningIcon?: JSX.Element;
  NoticeComponent?: FC<NoticeComponentProps>;
}

export const Notices = (props: INoticesProps) => {
  const {
    notices,
    maxNotices = 100000,
    ErrorIcon,
    InfoIcon,
    SuccessIcon,
    WarningIcon,
    NoticeComponent,
    typeNotice,
    ...rest
  } = props;

  const typeIcons = {
    [NoticeType.Error]: ErrorIcon || (
      <AlertErrorIcon className={`${typeNotice}-icon alert-icon__type`} />
    ),
    [NoticeType.Info]: InfoIcon || (
      <AlertInfoIcon className={`${typeNotice}-icon alert-icon__type`} />
    ),
    [NoticeType.Success]: SuccessIcon || (
      <AlertSuccessIcon className={`${typeNotice}-icon alert-icon__type`} />
    ),
    [NoticeType.Warning]: WarningIcon || (
      <AlertWarningIcon className={`${typeNotice}-icon alert-icon__type`} />
    ),
  };

  return NoticeComponent ? (
    <NoticeComponent typeIcons={typeIcons} notices={notices} typeNotice={typeNotice} {...rest} />
  ) : (
    <>
      {(notices.length < maxNotices ? notices : notices.slice(0, maxNotices)).map((notice) => (
        <Notice
          key={notice.id}
          typeIcon={typeIcons[notice.type]}
          notice={notice}
          typeNotice={typeNotice}
          {...rest}
        />
      ))}
    </>
  );
};
