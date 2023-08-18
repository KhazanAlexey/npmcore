import {Button} from '../../../../lib';
import {AwesomeLibrary} from "@awesomelibrary";
// import {OrderList} from "modules/orders";
// @ts-ignore
// import {Library2} from "library2";
import Library2 from "../../../../../library2/src/lib/library2";
// import {Library3} from "@library3";
import Library3 from "../../../../../library3/src/lib/library3";


export const Home = () => {
  return (
    <div className='container container-main container-main__home'>
      <h1>Home</h1>
        <Library3/>
        <Library2/>
        <Button>button</Button>
    </div>
  );
};
