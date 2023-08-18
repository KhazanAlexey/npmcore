import { ChangeEvent } from 'react';
import { AsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface LangOption {
  value: string;
  label: string;
  isActive: boolean;
}

export enum PlacementLangLocationType {
  Start = 'start',
  End = 'end',
  // QUERY = 'query'
}

export interface RequestBase {
  successCb?: <T>(data?: T) => void;
  errorCb?: <T>(data?: T) => void;
}

export enum NoticeType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

export enum NoticeTypes {
  Alerts = 'alerts',
  Snacks = 'snacks',
}

export interface Alert {
  message: string;
  data?: any;
  type: NoticeType;
  id: string;
  isUniq?: boolean;
}

export interface Snack extends Alert {}

type DispatchedActionFn = ((...args: any) => any) | AsyncThunk<any, any, any>;

export type DispatchedAction<M extends DispatchedActionFn> = ReturnType<M> extends AsyncThunkAction<
  any,
  any,
  any
>
  ? (...args: Parameters<M>) => ReturnType<ReturnType<M>>
  : M;

export type ChangeCoreEventHandler = (
  name: string,
  value: string,
  e: ChangeEvent<HTMLInputElement>,
) => void;

export type SubmitCoreHandler<T extends FieldValues, F = object> = (
  data: T,
  form: Partial<
    Pick<
      UseFormReturn<T>,
      'setValue' | 'setError' | 'setFocus' | 'clearErrors' | 'reset' | 'resetField' | 'unregister'
    >
  > &
    F,
) => ReturnType<SubmitHandler<T>>;

export interface TimerValueReturned {
  fullString: string;
  hoursString: string;
  secondString: string;
  minutesString: string;
  secondsNumber: number;
}
