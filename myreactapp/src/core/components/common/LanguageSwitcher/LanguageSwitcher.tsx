import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { LangOption, PlacementLangLocationType, SetLanguagePath } from '@/core/models';

export interface LanguageSwitcherProps {
  languageOptions: Array<Omit<LangOption, 'isActive'>>;
  excludeLanguage?: string;
  isUseLocationLanguage?: boolean;
  placementLangLocation?: PlacementLangLocationType;
  setLanguagePath: SetLanguagePath;
  LanguageSwitcherComponent?: FC<{
    options: Array<LangOption>;
    changeLanguage(lang: string): () => void;
  }>;
  classes?: {
    root?: string;
    item?: string;
  };
}

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const {
    languageOptions,
    excludeLanguage,
    isUseLocationLanguage,
    setLanguagePath,
    classes,
    LanguageSwitcherComponent,
    placementLangLocation = PlacementLangLocationType.Start,
  } = props;

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang: langParam } = useParams<{ lang: string }>();

  const [options, setOptions] = useState<Array<LangOption>>([]);

  useEffect(() => {
    isUseLocationLanguage && changeLocation(i18n.language);
    setOptions(
      languageOptions.map((option) => ({ ...option, isActive: i18n.language === option.value })),
    );
  }, []);

  const changeLanguage = (lng: string) => () => {
    i18n.changeLanguage(lng).then(() => {
      const options = languageOptions.map((o) => ({ ...o, isActive: o.value === lng }));
      setOptions(options);

      isUseLocationLanguage && changeLocation(lng);
    });
  };

  const getPathLang = (newLangPath: string, emptyPath: string) => {
    const path = emptyPath === '/' ? '' : emptyPath;

    switch (placementLangLocation) {
      case PlacementLangLocationType.Start:
        return `${newLangPath}${path}`;
      case PlacementLangLocationType.End:
        return `${path}${newLangPath}`;
      // case PlacementLangLocationType.QUERY:
      //   return `${emptyPath}?lang=${newLangPath.replace('/', '')}`;
      default:
        return `${newLangPath}${path}`;
    }
  };

  const changeLocation = (language: string) => {
    const newLangPath = excludeLanguage?.includes(language) ? '' : `/${language}`;
    const emptyPath = pathname.replace(langParam ? `/${langParam}` : '', '');
    const path = getPathLang(newLangPath, emptyPath);
    navigate(path);
    setLanguagePath(newLangPath);
  };

  return LanguageSwitcherComponent ? (
    <LanguageSwitcherComponent options={options} changeLanguage={changeLanguage} />
  ) : (
    <ul className={cn('language-block', classes?.root)}>
      {options?.map(({ value, isActive, label }) => (
        <li
          key={value}
          onClick={changeLanguage(value)}
          className={cn(
            'language-block__item',
            isActive && 'language-block__item_active',
            classes?.item,
          )}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};
