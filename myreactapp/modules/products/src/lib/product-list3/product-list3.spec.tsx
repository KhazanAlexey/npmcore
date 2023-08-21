import { render } from '@testing-library/react';

import ProductList3 from './product-list3';

describe('ProductList3', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductList3 />);
    expect(baseElement).toBeTruthy();
  });
});
