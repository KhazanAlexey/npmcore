import styles from './product-list3.module.scss';

/* eslint-disable-next-line */
export interface ProductList3Props {}

export function ProductList3(props: ProductList3Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProductList3!</h1>
    </div>
  );
}

export default ProductList3;
