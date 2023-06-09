import _ from 'lodash';

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  get rawData() {
    return _.cloneDeep(this._data);
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
}

export const customerData = new CustomerData({
  '1920': {
    name: 'kaio',
    id: '1920',
    usages: {
      '2016': {
        '1': 50,
        '2': 55,
        '3': 55,
        '4': 55,
        '5': 55,
        '6': 55,
        '7': 55,
        '8': 55,
        '9': 55,
        '10': 55,
        '11': 55,
        '12': 55,
      },
      '2015': {
        '1': 70,
        '2': 63,
        '3': 55,
        '4': 55,
        '5': 55,
        '6': 55,
        '7': 55,
        '8': 55,
        '9': 55,
        '10': 55,
        '11': 55,
        '12': 55,
      },
    }
  },
  '38673': {
    name: 'Margaret',
    id: '38673',
    usages: {
      '2016': {
        '1': 52,
        '2': 66,
        '3': 55,
        '4': 55,
        '5': 55,
        '6': 55,
        '7': 55,
        '8': 55,
        '9': 55,
        '10': 55,
        '11': 55,
        '12': 55,
      },
      '2015': {
        '1': 52,
        '2': 66,
        '3': 55,
        '4': 55,
        '5': 55,
        '6': 55,
        '7': 55,
        '8': 55,
        '9': 55,
        '10': 55,
        '11': 55,
        '12': 55,
      },
    }
  },
});

export function getCustomerData() {
  return customerData;
}
