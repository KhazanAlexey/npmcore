import styles from './library3.module.css';

/* eslint-disable-next-line */
export interface Library3Props {}

export function Library3(props: Library3Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Library3!</h1>
    </div>
  );
}

export default Library3;
