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

const createSlug = (title, options = {}) => (
  slugify(title, {
    ...options,
    replacement: HASH_DELIMITER,
  })
);

const sanitizeRoute = (str) => decodeURIComponent(str).replace(/\//g, ' ').replace(/[?{}*[\]]/g, '');

const createRoute = (title, transform = createHash) => (
  ROUTE_DELIMITER.concat(
    transform(sanitizeRoute(title)),
  )
  // React Router doesn't allow us to encode a title; it decodes the title back
  // https://github.com/ReactTraining/history/issues/505
);

const combineRoutes = (parentRoute, route) => (parentRoute + route);

const getCharHashCode = (char, hashBase = 0) => {
  const charCode = char.charCodeAt(0);
  // A nice property of 31 is that the multiplication can be replaced
  // by a shift and a subtraction for better performance: 31 * i == (i << 5) - i.
  // https://stackoverflow.com/a/299748
  const hash = (hashBase << 5) - hashBase + charCode; // eslint-disable-line no-bitwise
  // Convert to 32bit integer
  return hash | 0; // eslint-disable-line no-bitwise
};

const getHashCode = (str) => {
  // Original hashCode sequence:
  // s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]

  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string, got \`${typeof str}\``);
  }

  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    hash = getCharHashCode(char, hash);
  }

  return hash;
};

export {
  hashFromComment,
  createHash,
  combineHashes,
  createSlug,
  createRoute,
  combineRoutes,
  getHashCode,
  getCharHashCode,
  ROUTE_DELIMITER,
  HASH_DELIMITER,
};
