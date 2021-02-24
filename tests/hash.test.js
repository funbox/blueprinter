import { createHash, createRoute, createSlug, hashFromComment, getHashCode, getCharHashCode } from 'app/common/utils/helpers/hash';

describe('createSlug', () => {
  it('creates a slug from a latin title', () => {
    const title = 'The quick brown fox jumps over the lazy dog';
    const slug = createSlug(title);
    expect(slug).toBe('the-quick-brown-fox-jumps-over-the-lazy-dog');
  });

  it('creates a slug from a cyrillic title', () => {
    const title = 'Аэрофотосъёмка ландшафта уже выявила земли богачей и процветающих крестьян';
    const slug = createSlug(title);
    expect(slug).toBe('aerofotosyomka-landshafta-uzhe-vyyavila-zemli-bogachej-i-procvetayushih-krestyan');
  });

  it('fails with non-string input', () => {
    expect(() => createSlug({})).toThrowError('Expected a string, got `object`');
    expect(() => createSlug(42)).toThrowError('Expected a string, got `number`');
    expect(() => createSlug(false)).toThrowError('Expected a string, got `boolean`');
  });

  it('can keep letters case', () => {
    const title = 'The quick Brown Fox jumps over the Lazy Dog';
    const slug = createSlug(title, { lower: false });
    expect(slug).toBe('The-quick-Brown-Fox-jumps-over-the-Lazy-Dog');
  });
});

describe('hash creator', () => {
  it('extracts hash from an anchor comment', () => {
    const anchorComment = '<!-- anchor: first-header -->';
    const plainComment = '<!-- plain comment -->';
    expect(hashFromComment(anchorComment)).toBe('first-header');
    expect(hashFromComment(plainComment)).toBeUndefined();
  });

  it('creates a hash from a latin title', () => {
    const title = 'The quick brown fox jumps over the lazy dog';
    const hash = createHash(title);
    expect(hash).toBe('the-quick-brown-fox-jumps-over-the-lazy-dog');
  });

  it('creates a hash from a cyrillic title', () => {
    const title = 'Аэрофотосъёмка ландшафта уже выявила земли богачей и процветающих крестьян';
    const hash = createHash(title);
    expect(hash).toBe('аэрофотосъёмка-ландшафта-уже-выявила-земли-богачей-и-процветающих-крестьян');
  });

  it('keeps special symbols in hash', () => {
    const title = 'Получить список сообщений /sms/chats/{id}/messages{?after,before,limit}';
    const hash = createHash(title);
    expect(hash).toBe('получить-список-сообщений-/sms/chats/{id}/messages{?after,before,limit}');
  });
});

describe('route creator', () => {
  it('creates a route from a latin title', () => {
    const title = 'The quick brown fox jumps over the lazy dog';
    const route = createRoute(title);
    expect(route).toBe('/the-quick-brown-fox-jumps-over-the-lazy-dog');
  });

  it('creates a route from a cyrillic title', () => {
    const title = 'Аэрофотосъёмка ландшафта уже выявила земли богачей и процветающих крестьян';
    const route = createRoute(title);
    expect(route).toBe('/аэрофотосъёмка-ландшафта-уже-выявила-земли-богачей-и-процветающих-крестьян');
  });

  it('removes special symbols from the route', () => {
    const title = 'Получить список сообщений /sms/chats/{id}/messages{?after,before,limit}';
    const route = createRoute(title);
    expect(route).toBe('/получить-список-сообщений-sms-chats-id-messagesafter,before,limit');
  });
});

describe('hash code generator', () => {
  it('creates a numeric hash code for a char', () => {
    const str = 'The quick brown fox jumps over the lazy dog';

    for (let charIndex = 0; charIndex < str.length; charIndex++) {
      const char = str[charIndex];
      expect(getCharHashCode(char)).toBe(str.charCodeAt(charIndex));
    }
  });

  it('creates a numeric hash code for a sequence of chars', () => {
    const sequence = ['b', 'a', 'r'];
    const hashCode1 = getCharHashCode(sequence[0]);
    const hashCode2 = getCharHashCode(sequence[1]);
    const hashCode3 = getCharHashCode(sequence[2]);

    // 31 здесь — магическое число, на котором базируется хэш-код
    expect(getHashCode('ba')).toBe(31 * hashCode1 + hashCode2);
    expect(getHashCode('bar')).toBe(31 * getHashCode('ba') + hashCode3);
  });

  it('casts hash code to int32', () => {
    const MAX_INT32_VALUE = 2 ** 31 - 1; // 2147483647

    const baseHashCode = getHashCode('test_');
    const overflowed = 31 * baseHashCode + getCharHashCode('a');
    const casted = getHashCode('test_a');

    expect(Math.abs(overflowed)).toBeGreaterThan(MAX_INT32_VALUE);
    expect(Math.abs(casted)).toBeLessThan(MAX_INT32_VALUE);
    expect(casted).toBeLessThan(0);
  });

  it('creates a numeric hash code for a string input', () => {
    const title = 'The quick brown fox jumps over the lazy dog';
    const hashCode = getHashCode(title);

    expect(typeof hashCode).toBe('number');
    expect(hashCode).toBe(-609428141);
  });

  it('denies to use non-string input', () => {
    expect(() => getHashCode({})).toThrowError('Expected a string, got `object`');
    expect(() => getHashCode(42)).toThrowError('Expected a string, got `number`');
    expect(() => getHashCode(false)).toThrowError('Expected a string, got `boolean`');
  });

  it('returns zero for an empty string', () => {
    expect(getHashCode('')).toBe(0);
  });
});
