import { getRawDataOfCustomers } from "../customer-data";

export function compareUsage(customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
  const earlier = getRawDataOfCustomers()[customerID].usages[[laterYear - 1]][month];
  return { laterAmount: later, change: later - earlier };
}
