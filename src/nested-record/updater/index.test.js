import { updateCustomerData } from '.';
import { customerData } from '../customer-data';

describe('updater', () => {
  it('should update the customer data', () => {
    updateCustomerData();
    expect(customerData._data['1920'].usages['2016']['1']).toEqual(42);
  });
});
