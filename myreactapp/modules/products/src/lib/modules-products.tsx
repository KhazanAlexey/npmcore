import styles from './modules-products.module.scss';
import {ModulesSharedUi} from "modules/shared/ui";

/* eslint-disable-next-line */
export interface ModulesProductsProps {}

export function ModulesProducts(props: ModulesProductsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ModulesProducts!</h1>
        {/*<ModulesSharedUi/>*/}
    </div>
  );
}

export default ModulesProducts;
