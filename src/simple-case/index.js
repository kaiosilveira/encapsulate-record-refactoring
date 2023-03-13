import { Organization } from './organization';

export const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

export function getOrganization() {
  return organization;
}
