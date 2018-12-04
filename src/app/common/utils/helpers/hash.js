const HASH_DELIMITER = '-';

const hashFromTitle = (title, parentTitle = '') => (
  `${parentTitle} ${title}`.trim().split(' ').join(HASH_DELIMITER).toLowerCase()
);

const combineHashes = (prefixHash, hash) => (prefixHash + HASH_DELIMITER + hash);

export { hashFromTitle, combineHashes };
