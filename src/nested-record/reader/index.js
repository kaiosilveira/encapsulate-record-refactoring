import { getCustomerData } from "../customer-data";

export function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().rawData[customerID].usages[laterYear][month];
  const earlier = getCustomerData().rawData[customerID].usages[[laterYear - 1]][month];
  return { laterAmount: later, change: later - earlier };
}
