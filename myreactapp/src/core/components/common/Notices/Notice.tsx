import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { CloseIcon } from '@/core/components/common';
import { Alert, RemoveAlert, Snack, RemoveSnack, NoticeTypes } from '@/core/models';

export interface NoticeProps {
  notice: Alert | Snack;
  typeIcon: JSX.Element;
  removeNotice: RemoveAlert | RemoveSnack;
  autoHideDuration?: number;
  animationDuration?: number;
  typeNotice: NoticeTypes;
}

export const Notice = (props: NoticeProps) => {
  const {
    notice,
    autoHideDuration,
    typeIcon,
    removeNotice,
    typeNotice,
    animationDuration = 300,
  } = props;

  const { t } = useTranslation();
  const noticeRef = useRef<HTMLDivElement>(null);

  const hideTimerId = useRef<NodeJS.Timeout | null>(null);
  const animationTimerId = useRef<NodeJS.Timeout | null>(null);

  const [timers, setTimers] = useState<{ animate: number; autoHide: number } | null>(null);

  const handleCloseNotice = () => setTimers({ animate: 0, autoHide: animationDuration });

  useEffect(() => {
    if (autoHideDuration) {
      const animate = autoHideDuration - animationDuration;
      setTimers({ animate, autoHide: autoHideDuration });
    }
  }, []);

  useEffect(() => {
    if (timers) {
      hideTimerId.current = setTimeout(() => {
        removeNotice(notice.id);
      }, timers.autoHide);

      animationTimerId.current = setTimeout(() => {
        noticeRef.current?.classList.add(`${typeNotice}-item__closing`);
      }, timers.animate);
    }

    return () => {
      hideTimerId.current && clearTimeout(hideTimerId.current);
      animationTimerId.current && clearTimeout(animationTimerId.current);
    };
  }, [timers]);

  return (
    <div
      className={cn(`${typeNotice}-item ${typeNotice}-item__${notice.type}`)}
      key={notice.id}
      ref={noticeRef}
      style={{ animationDuration: `${animationDuration}ms` }}
    >
      <span className={`${typeNotice}-icon__wrapper`}>{typeIcon}</span>
      <p className={`${typeNotice}-message`}>{t(notice.message, notice.data)}</p>
      <span className={`${typeNotice}-icon__wrapper`}>
        <CloseIcon
          className={`${typeNotice}-icon ${typeNotice}-icon__close`}
          onClick={handleCloseNotice}
        />
      </span>
    </div>
  );
};
