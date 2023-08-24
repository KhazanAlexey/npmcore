import styles from './library5.module.scss';

/* eslint-disable-next-line */
export interface Library5Props {}

export function Library5(props: Library5Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Library5!</h1>
    </div>
  );
}

export default Library5;
