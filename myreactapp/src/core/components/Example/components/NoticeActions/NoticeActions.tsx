import { NoticeType, NoticeTypes, SetAlert, SetSnack } from '@/core/models';
import {Button} from "@/lib";

export interface NoticeActionsProps {
  noticeType?: NoticeTypes;
  setAlert: SetAlert;
  setSnack: SetSnack;
}

let count = 1;
export const NoticeActions = (props: NoticeActionsProps) => {
  const { noticeType = NoticeTypes.Alerts, setAlert, setSnack } = props;

  const handleSetNotice = (type: NoticeType) => () => {
    const payload = {
      type,
      message: `${type} snack - ${count}`,
    };
    noticeType === NoticeTypes.Alerts ? setAlert(payload) : setSnack(payload);

    count++;
  };

  return (
    <div className='btn-actions'>
      {Object.values(NoticeType).map((action) => (
        <Button key={action} classes={{ root: `btn__${action}` }} onClick={handleSetNotice(action)}>
          {action}
        </Button>
      ))}
    </div>
  );
};
