/* eslint-disable no-param-reassign, no-underscore-dangle */

import {normalize, arrayOf, Schema} from 'normalizr';

const Assignment = new Schema('assignment');
const Contact = new Schema('contact', {
  idAttribute: entity => entity.recordID
});

function idsFromResponse (response) {
  if (Array.isArray(response)) {
    return response.map(entity => entity.id);
  }
  return response.id;
}

function entitiesFromCollection (collection, type) {
  var now = Date.now();
  var options = {
    assignEntity (obj, key, val) {
      obj[key] = val;
      if (key === 'id') {
        obj._lastUpdated = now;
      }
    }
  };

  var entities = {};

  if (Array.isArray(collection)) {
    entities = normalize(collection, arrayOf(type), options).entities;
  } else if (collection) {
    entities = normalize(collection, type, options).entities;
  }
  return entities;
}

function entitiesFromResponse (response, type) {
  if (!response) {
    return {};
  }
  return entitiesFromCollection(response, type);
}

const Schemas = {
  Assignment,
  Contact
};

export {
  Schemas,
  entitiesFromCollection,
  entitiesFromResponse,
  idsFromResponse
};
