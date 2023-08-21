import {Button} from '../../../../lib';

import Library3 from "../../../../../library3/src/lib/library3";
import {ProductList3} from "@myreactapp/modules/products";
import {Library2} from "library2";


export const Home = () => {
  return (
    <div className='container container-main container-main__home'>
      <h1>Home</h1>
        <Library3/>
        <Library2/>
      <ProductList3/>
        <Button>button</Button>
    </div>
  );
};
