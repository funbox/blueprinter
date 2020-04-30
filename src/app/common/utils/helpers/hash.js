import slugify from 'app/common/utils/helpers/slugify';

const HASH_DELIMITER = '-';
const ROUTE_DELIMITER = '/';

const hashFromComment = (comment) => {
  const anchorRegExp = /<!--\s*anchor:\s*([^\s]+)\s*-->/;
  const anchorMatch = comment.match(anchorRegExp);
  if (anchorMatch) return anchorMatch[1];
  return undefined;
};

const createHash = (title) => (
  slugify(title, {
    replacement: HASH_DELIMITER,
    remove: undefined,
    transliterate: false,
  })
);

const combineHashes = (prefixHash, hash) => (prefixHash + HASH_DELIMITER + hash);

const createSlug = (title) => (
  slugify(title, {
    replacement: HASH_DELIMITER,
  })
);

const createRoute = (title, transformFunction = createHash) => (
  ROUTE_DELIMITER.concat(transformFunction(title.replace(/\//g, ' ')))
  // здесь можно было бы энкодить заголовок, но в ReactRouter это не работает, он декодит обратно
  // https://github.com/ReactTraining/history/issues/505
);

const combineRoutes = (parentRoute, route) => (parentRoute + route);

export {
  hashFromComment,
  createHash,
  combineHashes,
  createSlug,
  createRoute,
  combineRoutes,
  ROUTE_DELIMITER,
  HASH_DELIMITER,
};
