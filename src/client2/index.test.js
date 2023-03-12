import { result } from '.';

describe('client2', () => {
  it('should update the organization name', () => {
    expect(result).toBe('Metamorphosis Inc');
  });
});
