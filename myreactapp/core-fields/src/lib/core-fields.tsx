import styles from './core-fields.module.scss';

/* eslint-disable-next-line */
export interface CoreFieldsProps {}

export function CoreFields(props: CoreFieldsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CoreFields!</h1>
    </div>
  );
}

export default CoreFields;
