import { getRawDataOfOrganization } from '../index.js';

const newName = 'Metamorphosis Inc';
getRawDataOfOrganization().name = newName;

export const result = getRawDataOfOrganization().name;
