import styles from './awesome-library.module.css';

/* eslint-disable-next-line */
export interface AwesomeLibraryProps {}

export function AwesomeLibrary(props: AwesomeLibraryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AwesomeLibrary!</h1>
    </div>
  );
}

export default AwesomeLibrary;
