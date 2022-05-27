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
 * @param {string} string - source string
 * @param {Object=} options
 * @param {string=} options.replacement - char to replace space
 * @param {boolean=} options.lower - cast to lowercase
 * @param {RegExp=} options.remove - chars to be deleted
 * @param {boolean=} options.transliterate - apply transliteration
 */
export default function slugify(string, options = {}) {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a string, got \`${typeof string}\``);
  }

  const appliedOptions = {
    ...defaultOptions,
    ...options,
  };

  const { transliterate, remove, replacement } = appliedOptions;

  let slug = string
    .split('')
    // replace characters based on charMap
    .reduce((res, ch) => {
      if (!transliterate) {
        return (res + ch);
      }
      return res + (charMap[ch] || ch);
    }, '')
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
