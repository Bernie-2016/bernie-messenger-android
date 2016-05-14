const BASE_URL = 'https://organize.berniesanders.com';

export function getAssignments () {
  return fetch(`${BASE_URL}/contact-assignments.json`)
  .then(response => response.json());
}
