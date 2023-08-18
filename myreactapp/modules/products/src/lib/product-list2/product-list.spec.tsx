import { render } from '@testing-library/react';

import ProductList2 from './product-list2';

describe('ProductList2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductList2 />);
    expect(baseElement).toBeTruthy();
  });
});
