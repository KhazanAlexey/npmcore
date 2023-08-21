import styles from './product-list.module.scss';
import {OrderList} from "modules/orders";

/* eslint-disable-next-line */
export interface ProductListProps {}

export function ProductList(props: ProductListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProductList!</h1>sss
        {/*<OrderList />*/}
    </div>
  );
}

export default ProductList;
