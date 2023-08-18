import { useActions } from '@/core/hooks/useActions';
import {setAlert, setSnack} from '@/core/store/actions/coreActions';
import { NoticeActions, NoticeActionsProps } from './NoticeActions';


interface NoticeActionsContainerProps extends Pick<NoticeActionsProps, 'noticeType'> {

}

export const NoticeActionsContainer = (props: NoticeActionsContainerProps) => {
  const actions = useActions({ setAlert, setSnack });

  return <NoticeActions {...actions} {...props} />;
};