import { customerData } from "../customer-data";

export function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[[laterYear - 1]][month];
  return { laterAmount: later, change: later - earlier };
}
