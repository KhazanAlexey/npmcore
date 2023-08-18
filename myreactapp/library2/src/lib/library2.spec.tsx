import { render } from '@testing-library/react';

import Library2 from './library2';

describe('Library2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Library2 />);
    expect(baseElement).toBeTruthy();
  });
});
