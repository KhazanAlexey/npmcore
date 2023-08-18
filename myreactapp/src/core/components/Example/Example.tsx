import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-US';
import kz from 'date-fns/locale/kk';

// import * as Pages from '@/core/components/Example/pages';

import './style.scss';
import {initialLocalization} from "../../localization";
import {Forms, Home, HookFormContainer, NotFound} from './pages';
import {ExampleAppLayoutContainer} from "./components";
import {resources} from "./localization";

registerLocale('ru', ru);
registerLocale('en', en);
registerLocale('kz', kz);

initialLocalization(resources).then();

const formsChildren = [
  {
    index: true,
    element: <Navigate to='hook_form' />,
  },
  {
    path: 'hook_form',
    element: <HookFormContainer />,
  },


];

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExampleAppLayoutContainer />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ':lang',
        element: <Home />,
      },
      // {
      //   path: 'notifier',
      //   element: <Pages.Notifier />,
      // },
      // {
      //   path: ':lang/notifier',
      //   element: <Pages.Notifier />,
      // },
      {
        path: 'forms',
        element: <Forms />,
        children: formsChildren,
      },
      {
        path: ':lang/forms',
        element: <Forms />,
        children: formsChildren,
      },
      // {
      //   path: 'modals',
      //   element: <Pages.Modals />,
      // },
      // {
      //   path: ':lang/modals',
      //   element: <Pages.Modals />,
      // },
      // {
      //   path: 'calculator',
      //   element: <Pages.Calculator />,
      // },
      // {
      //   path: ':lang/calculator',
      //   element: <Pages.Calculator />,
      // },
      // {
      //   path: 'other',
      //   element: <Pages.Other />,
      // },
      // {
      //   path: ':lang/other',
      //   element: <Pages.Other />,
      // },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const Example = () => {
  useEffect(() => {
    document.body.className = 'core-example';
  }, []);

  return <RouterProvider router={router} />;
};
