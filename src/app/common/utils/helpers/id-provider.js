/**
 * @typedef {Object} IdProvider
 * @property {Function} getUniqueId
 */

/**
 * @param {Function} idGeneratorFunction
 * @return {IdProvider}
 */
export default function idProvider(idGeneratorFunction) {
  return {
    getUniqueId(...fnArgs) {
      return idGeneratorFunction(...fnArgs);
    },
  };
}
