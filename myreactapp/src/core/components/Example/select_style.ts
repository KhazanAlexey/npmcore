import { StylesConfig } from 'react-select';

const mobile = '@media (max-width: 768px)';

export const selectStyles: StylesConfig = {
  dropdownIndicator: (base, { selectProps }) => {
    const { isError, menuIsOpen } = selectProps;

    return {
      ...base,
      padding: 0,
      marginRight: '.625rem',
      color: isError ? '#FF2727' : '#67579C',
      transform: menuIsOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
      transition: 'transform .5s ease',
      '& path': {
        color: isError ? '#FF2727' : '#67579C',
      },
    };
  },
  indicatorSeparator: () => ({ display: 'none' }),
  clearIndicator: (base) => {
    return {
      ...base,
      padding: '.3125rem',
    };
  },
  menu: (base, { selectProps }) => {
    const { isError, menuIsOpen } = selectProps;

    return {
      ...base,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderWidth: '.0625rem',
      borderStyle: 'solid',
      borderColor: isError ? '#EA1717' : menuIsOpen ? '#6552D8' : '#BAC3D5',
      marginTop: 0,
      boxShadow: 'none',
      zIndex: 2,
      borderTop: 'none',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '3%',
        width: '94%',
        height: 1,
        backgroundColor: '#C4C4C4',
      },
    };
  },
  menuList: (base) => {
    return {
      ...base,
      maxHeight: '7.5rem',
      [mobile]: {
        maxHeight: '5.75rem',
      },
    };
  },
  valueContainer: (base) => {
    return {
      ...base,
      paddingLeft: '.5rem',
      fontSize: '1rem',
    };
  },
  singleValue: (base) => {
    return {
      ...base,
      fontSize: '1rem',
    };
  },
  control: (base, { selectProps }) => {
    const { isError, menuIsOpen } = selectProps;

    const data = {
      ...base,
      borderColor: isError ? '#EA1717' : menuIsOpen ? '#6552D8' : '#BAC3D5',
      boxShadow: 'none',
      borderWidth: '.0625rem',
      cursor: 'pointer',
      borderTopLeftRadius: '.625rem',
      borderTopRightRadius: '.625rem',
      borderBottomRightRadius: menuIsOpen ? 0 : '.625rem',
      borderBottomLeftRadius: menuIsOpen ? 0 : '.625rem',
      borderBottom: menuIsOpen ? 'none' : '',
      minHeight: '3.125rem',
      '&:hover': {
        borderColor: isError ? '#EA1717' : '#6552D8',
      },
    };

    if (menuIsOpen) data.borderBottom = 'none';

    return data;
  },
  option: (base, { isSelected }) => {
    return {
      ...base,
      backgroundColor: isSelected ? '#E5E5E5' : 'white',
      color: '#515151',
      cursor: 'pointer',
      pointerEvents: isSelected ? 'none' : 'initial',
      textAlign: 'left',
      padding: '.5rem 1rem',
      '&:hover': {
        backgroundColor: '#E5E5E5',
      },
      '&:active': {
        backgroundColor: '#E5E5E5',
      },
      [mobile]: {
        padding: '.25rem .75rem',
      },
    };
  },
};
