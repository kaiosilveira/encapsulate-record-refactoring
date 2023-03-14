import { customerData } from '../customer-data';

export function updateCustomerData() {
  customerData['1920'].usages['2016']['1'] = 42;
}
