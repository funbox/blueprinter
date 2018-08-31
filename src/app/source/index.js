import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';

const source = require('./refract.json');
const parsedSource = parseSourceFile(source);

export default parsedSource;
