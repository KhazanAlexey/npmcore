import TagManager from 'react-gtm-module';
import { SETTINGS } from '../settings/settings';

export const initialiseGTM = (): void => {
  if (!SETTINGS.gtmId || SETTINGS.isDevelop) return;

  const tagManagerArgs = {
    gtmId: SETTINGS.gtmId,
    dataLayerName: 'PageDataLayer',
  };

  TagManager.initialize(tagManagerArgs);
};

export const sendDataLayer = (dataLayer: any): void => {
  const tagManagerArgs = {
    dataLayer,
    dataLayerName: 'PageDataLayer',
  };

  TagManager.dataLayer(tagManagerArgs);
};
