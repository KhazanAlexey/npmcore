import { Button, NoticesContainer, SnacksContainer } from '@/core/components/common';
import { useSetNotice } from '@/core/hooks/useSetNotice';
import {NoticeType, NoticeTypes } from '@/core/models/common';
import { NoticeActionsContainer } from '../components/NoticeActions/NoticeActionsContainer';


export const Notifier = () => {
  const setAlert = useSetNotice();
  const setSnack = useSetNotice(NoticeTypes.Snacks);

  const handleSetSnack = () => {
    setSnack(NoticeType.Success, 'Send snack use hook');
  };

  const handleSetAlert = () => {
    setAlert(NoticeType.Success, 'Send alert use hook');
  };

  return (
    <div className='container container-main container-main__notifier'>
      <h2 className='title'>SNACKS</h2>
      <SnacksContainer autoHideDuration={5000} maxNotices={7} />
      <NoticeActionsContainer noticeType={NoticeTypes.Snacks} />

      <hr />

      <h2 className='title'>ALERTS</h2>
      <NoticesContainer typeNotice={NoticeTypes.Alerts} />
      <NoticeActionsContainer />

      <hr />
      <h2 className='title'>Use notice hook</h2>
      <Button onClick={handleSetSnack} classes={{ root: 'btn-main mb15' }} type='button'>
        Send snack
      </Button>
      <Button onClick={handleSetAlert} classes={{ root: 'btn-main' }} type='button'>
        Send alert
      </Button>
    </div>
  );
};
