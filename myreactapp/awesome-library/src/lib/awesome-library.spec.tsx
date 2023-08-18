import { render } from '@testing-library/react';

import AwesomeLibrary from './awesome-library';

describe('AwesomeLibrary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AwesomeLibrary />);
    expect(baseElement).toBeTruthy();
  });
});
