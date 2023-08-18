
import { useActions } from './useActions';
import {NoticeType, NoticeTypes} from "../models";
import {setAlert, setSnack} from "../store/actions";

export const useSetNotice = (noticeType?: NoticeTypes) => {
  const actions = useActions({ setAlert, setSnack });

  return (type: NoticeType, message: string, data?: any, isUniq?: boolean) => {
    const isSnack = noticeType === NoticeTypes.Snacks;

    const { setSnack, setAlert } = actions;

    (isSnack ? setSnack : setAlert)({
      type,
      message,
      data,
      isUniq,
    });
  };
};
