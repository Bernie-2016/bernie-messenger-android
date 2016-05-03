const BASE_URL = 'https://organize.berniesanders.com';
import mock from '../../mock/assignments.json';

export function getAssignments () {
  return new Promise(resolve => {
    setTimeout(() => resolve(mock), 1000);
  });
  return fetch(`${BASE_URL}/contact-assignments.json`)
    .then(response => response.json());
}
