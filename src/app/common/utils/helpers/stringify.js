import { isString } from 'app/common/utils/helpers/guards';

export default function stringify(input) {
  return isString(input) ? input.trim() : JSON.stringify(input, null, 2);
}
