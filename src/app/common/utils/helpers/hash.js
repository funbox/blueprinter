const HASH_DELIMITER = '-';
const ROUTE_DELIMITER = '/';

const hashFromComment = (comment) => {
  const anchorRegExp = /<!--\s*anchor:\s*([^\s]+)\s*-->/;
  const anchorMatch = comment.match(anchorRegExp);
  if (anchorMatch) return anchorMatch[1];
  return undefined;
};

const createHash = (title, parentTitle = '') => (
  `${parentTitle} ${title}`.trim().split(' ').join(HASH_DELIMITER).toLowerCase()
);

const combineHashes = (prefixHash, hash) => (prefixHash + HASH_DELIMITER + hash);

const createRoute = (title) => (
  ROUTE_DELIMITER.concat(createHash(title))
);

const combineRoutes = (parentRoute, route) => (parentRoute + route);

export {
  hashFromComment,
  createHash,
  combineHashes,
  createRoute,
  combineRoutes,
};
