import attributesBlock from './attributes/attributes-block';
import singleAttribute from './attributes/single-attribute';

const body = require('./json/body.json');
const schema = require('./json/schema.json');

const transaction1 = {
  request: {
    title: 'With headers',
    headers: [{ key: 'X-NOKIA-MSISDN', value: '79173332211' }],
    attributes: [singleAttribute],
  },
  response: {
    statusCode: 200,
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-Auth-Token', value: 'Session token' }],
    attributes: attributesBlock,
    description: 'Custom transaction description',
    body,
    schema,
  },
};

const transaction2 = {
  request: {
    title: 'With body',
    body: 'Hello world',
  },
  response: {
    statusCode: 401,
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    attributes: attributesBlock,
  },
};

export default {
  content: [
    transaction1,
    transaction2,
  ],
  attributes: {
    method: 'POST',
    href: '/users/{id}?country=ru&active=true&votes=0',
  },
};
