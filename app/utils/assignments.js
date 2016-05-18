const BASE_URL = 'https://organize.berniesanders.com';

export function getAssignments () {
  return fetch(`${BASE_URL}/contact-assignments.json?platform=android`)
  .then(response => response.json());
}
