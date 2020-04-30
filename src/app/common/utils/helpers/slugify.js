import charMap from 'app/constants/char-map';

const defaultOptions = {
  replacement: '-',
  lower: true,
  remove: /[^\w\s$*_+~.()'"!\-:@]+/g,
  transliterate: true,
};

// based on https://github.com/simov/slugify with custom char map

/**
 *
 * @param {string} string - исходная строка
 * @param {Object=} options
 * @param {string=} options.replacement - символ, на который заменится пробел
 * @param {boolean=} options.lower - привести к нижнему регистру
 * @param {RegExp=} options.remove - символы, которые будут удалены
 */
export default function (string, options = {}) {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a string, got \`${typeof string}\``);
  }

  const appliedOptions = {
    ...defaultOptions,
    ...options,
  };

  const { remove, replacement } = appliedOptions;

  let slug = string
    .split('')
    // replace characters based on charMap
    .reduce((res, ch) => (res + (charMap[ch] || ch)), '')
    // remove not allowed characters
    .replace(remove, '')
    // trim leading/trailing spaces
    .trim()
    // convert spaces to replacement character
    // also remove duplicates of the replacement character
    .replace(new RegExp(`[\\s${replacement}]+`, 'g'), replacement);

  if (appliedOptions.lower) {
    slug = slug.toLowerCase();
  }

  return slug;
}
