import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ModalLayout } from '@/core/components/common';
import { FetchUsersInfo } from '@/core/components/Example/store/actions';
import { UserExample } from '@/core/components/Example/models';

interface GetUsersModalProps {
  fetchUsersInfo: FetchUsersInfo;
  users: null | UserExample[];
}

export const GetUsersModal = (props: GetUsersModalProps) => {
  const { fetchUsersInfo, users } = props;

  const { t } = useTranslation();
  const timerId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      timerId.current && clearTimeout(timerId.current);
    };
  }, []);

  const getUsers = () => {
    if (users) return;
    timerId.current = setTimeout(fetchUsersInfo, 1000);
  };

  return (
    <ModalLayout
      onClick={getUsers}
      title={t('list_users')}
      classes={{ root: 'full-width' }}
      isOutSideClick
      content={
        users ? (
          <table>
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('email')}</th>
                <th>{t('mobile_phone')}</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>{t('no_users')}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <h3>Loading...</h3>
        )
      }
    >
      <Button classes={{ root: 'btn-main mb15' }}>{t('get_users')}</Button>
    </ModalLayout>
  );
};
