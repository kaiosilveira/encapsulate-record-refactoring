import { getOrganization } from '../index.js';

const newName = 'Metamorphosis Inc';

getOrganization().name = newName;

export const result = getOrganization().name;
