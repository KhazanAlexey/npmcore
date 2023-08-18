import { render } from '@testing-library/react';

import Library3 from './library3';

describe('Library3', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Library3 />);
    expect(baseElement).toBeTruthy();
  });
});
