import { linearClient } from './client';

export async function testLinearConnection() {
  try {
    // Try to fetch organization data as a simple test
    const organization = await linearClient.organization;
    console.log('Linear connection successful!');
    console.log('Organization:', organization.name);
    return true;
  } catch (error) {
    console.error('Linear connection failed:', error);
    return false;
  }
}