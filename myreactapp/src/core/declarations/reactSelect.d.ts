import 'react-select';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props {
    isError?: boolean;
  }
}
