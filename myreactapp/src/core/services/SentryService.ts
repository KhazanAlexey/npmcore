import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { SETTINGS } from '@/core/settings';

export const initialiseSentry = (): void => {
  if (!SETTINGS.sentryDsn || SETTINGS.isDevelop) return;

  const SentryArgs = {
    dsn: SETTINGS.sentryDsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  };

  Sentry.init(SentryArgs);
};
