const body = require('./body.json');
const schema = require('./schema.json');

const rawBody = '--BOUNDARY\n\nContent-Disposition: form-data; avatar="$filename"\nContent-Type: $mimetype\nContent-Transfer-Encoding: binary\n\n$binarydata\n--BOUNDARY--\n';

export {
  body,
  rawBody,
  schema,
};
