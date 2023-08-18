import styles from './library2.module.css';

/* eslint-disable-next-line */
export interface Library2Props {}

export function Library2(props: Library2Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Library2!</h1>
    </div>
  );
}

export default Library2;
