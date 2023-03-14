import { getRawDataOfCustomers } from '../customer-data';

export function updateCustomerData() {
  getRawDataOfCustomers()['1920'].usages['2016']['1'] = 42;
}
