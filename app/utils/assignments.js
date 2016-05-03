import mock from '../../mock/assignments.json';

// const BASE_URL = 'https://organize.berniesanders.com';

export function getAssignments () {
  return new Promise(resolve => {
    setTimeout(() => resolve(mock), 1000);
  });
  // @TODO
  /*
  return fetch(`${BASE_URL}/contact-assignments.json`)
  .then(response => response.json());
  */
}
