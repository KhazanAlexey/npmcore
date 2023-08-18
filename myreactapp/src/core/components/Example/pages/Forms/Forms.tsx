import { NavLink, Outlet } from 'react-router-dom';

import './style.scss';

export const Forms = () => {
  return (
    <>
      <div className='sub-header mb15'>
        <NavLink to='formik_form'>Formik form</NavLink>
        <NavLink to='hook_form'>Hook form</NavLink>
      </div>
      <Outlet />
    </>
  );
};
