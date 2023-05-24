import { isString } from 'app/common/utils/helpers/guards';

export default function stringify(input) {
  return isString(input) ? input : JSON.stringify(input, null, 2);
}
