import { useActions, useTypedSelector } from '@/core/hooks';
import { removeAlert } from '@/core/store/actions';
import { getAlertsSelector } from '@/core/store/selectors';
import { INoticesProps, Notices } from './Notices';

export type NoticesContainer = Omit<INoticesProps, 'notices' | 'removeNotice'>;

export const NoticesContainer = (props: NoticesContainer) => {
  const actions = useActions({ removeAlert });

  const alerts = useTypedSelector(getAlertsSelector);

  return <Notices notices={alerts} removeNotice={actions.removeAlert} {...props} />;
};
