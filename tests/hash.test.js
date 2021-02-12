import { createHash, createRoute, createSlug, hashFromComment, getHashCode } from 'app/common/utils/helpers/hash';

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
