import { render } from '@testing-library/react';

import CoreFields from './core-fields';

describe('CoreFields', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoreFields />);
    expect(baseElement).toBeTruthy();
  });
});
