import { InputState, Props as ReactInputMask } from 'react-input-mask';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

export interface MaskedProps extends ReactInputMask {
  beforeMaskedValueChange?: (
    newState: InputState,
    oldState: InputState,
    userInput: string,
  ) => InputState;
  formatChars?: {
    [key: string | number]: string;
  };
}

export type SelectOptionType = {
  value: string | number;
  label: string;
};

export type UseControllerCoreProps = Pick<UseControllerProps<any>, 'name' | 'control' | 'rules'>;
