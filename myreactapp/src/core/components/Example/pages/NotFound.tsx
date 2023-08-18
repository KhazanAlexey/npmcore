import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Button} from "../../../../lib";


export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => navigate('/');

  return (
    <div className='container container-main container-main__not-found'>
      <h1>{t('page_not_found')}</h1>
      <Button classes={{ root: 'btn-main' }} onClick={handleGoHome}>
        Go home
      </Button>
    </div>
  );
};
