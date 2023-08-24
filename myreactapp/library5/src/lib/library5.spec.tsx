import { render } from '@testing-library/react';

import Library5 from './library5';

describe('Library5', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Library5 />);
    expect(baseElement).toBeTruthy();
  });
});
