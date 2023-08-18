import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import {AppNavLinkContainer, LanguageSwitcherContainer, VersionView} from "../../../common";



const languageOptions = [
  { label: 'RU', value: 'ru' },
  { label: 'EN', value: 'en' },
  { label: 'KZ', value: 'kz' },
];

interface ExampleAppLayoutProps {
  classes?: string;
}

export const ExampleAppLayout = (props: ExampleAppLayoutProps) => {
  const { classes } = props;

  const { t } = useTranslation();

  return (
    <>
      <VersionView label='App version: ' />
      <header className='header'>
        <div className='container container-header'>
          <AppNavLinkContainer to='/' className='header__logo'>
            {t('logo')}
          </AppNavLinkContainer>
          <AppNavLinkContainer to='/notifier'>{t('snacks')}</AppNavLinkContainer>
          <AppNavLinkContainer to='/forms'>{t('forms')}</AppNavLinkContainer>
          <AppNavLinkContainer to='/modals'>{t('modals')}</AppNavLinkContainer>
          <AppNavLinkContainer to='/calculator'>{t('calculator')}</AppNavLinkContainer>
          <AppNavLinkContainer to='/other'>{t('other')}</AppNavLinkContainer>
        </div>
      </header>
      <main className='main'>
        <div className={cn('container container-main', classes)}>
          <Outlet />
        </div>
      </main>
      <footer className='footer'>
        <div className='container container-footer'>
          <h2>FOOTER</h2>
          <LanguageSwitcherContainer
            languageOptions={languageOptions}
            isUseLocationLanguage
            excludeLanguage='kz'
          />
        </div>
      </footer>
    </>
  );
};
