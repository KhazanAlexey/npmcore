import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ModalLayout } from '@/core/components/common';

export const TestModal = () => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = (isOpen: boolean) => () => setIsOpenModal(isOpen);

  return (
    <>
      <ModalLayout
        isOpenModal={isOpenModal}
        onClose={toggleModal(false)}
        content={<h1>{t('second_variant')}</h1>}
      />
      <Button classes={{ root: 'btn-main' }} type='button' onClick={toggleModal(true)}>
        {t('second_variant')}
      </Button>
    </>
  );
};
