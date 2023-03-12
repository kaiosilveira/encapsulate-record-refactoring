import { result } from '.';

describe('client1', () => {
  it('should create a header using the organization name', () => {
    expect(result).toBe('<h1>Acme Gooseberries</h1>');
  });
});
