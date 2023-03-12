import { Organization } from './organization';

export const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

/**
 * @deprecated use getOrganization instead
 */
export function getRawDataOfOrganization() {
  return organization._data;
}

export function getOrganization() {
  return organization;
}
