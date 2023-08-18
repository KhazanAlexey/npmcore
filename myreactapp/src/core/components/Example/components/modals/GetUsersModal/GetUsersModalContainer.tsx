import { useActions } from '@/core/hooks/useActions';
import { GetUsersModal } from './GetUsersModal';
import {fetchUsersInfo} from "@/core/components/Example/store/actions";
import { useTypedSelector } from '@/core/hooks/useTypedSelector';
import { getUsersSelector } from '../../../store/selectors/selectors';

export const GetUsersModalContainer = () => {
  const actions = useActions({ fetchUsersInfo });

  const users = useTypedSelector(getUsersSelector);

  return <GetUsersModal {...actions} users={users} />;
};
