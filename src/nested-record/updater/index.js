import { getCustomerData } from '../customer-data';

export function updateCustomerData() {
  getCustomerData().setUsage('1920', '2016', '1', 42);
}
