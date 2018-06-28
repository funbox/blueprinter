import attributesBlock from './attributes/attributes-block';
import singleAttribute from './attributes/single-attribute';

const body = require('./json/body.json');
const schema = require('./json/schema.json');

export default [
  {
    request: {
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
    attributes: {
      method: 'POST',
      uri: '/user',
    },
  },
];
