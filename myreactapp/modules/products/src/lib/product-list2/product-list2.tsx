import styles from './product-list.module.scss';

/* eslint-disable-next-line */
export interface ProductListProps2 {}

export function ProductList2(props: ProductListProps2) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProductList2!</h1>
    </div>
  );
}

export default ProductList2;
