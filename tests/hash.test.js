import { createHash } from 'app/common/utils/helpers/hash';

describe('hash creator', () => {
  it('creates a hash from a latin title', () => {
    const title = 'Group My Group 1';
    const hash = createHash(title);
    expect(hash).toBe('group-my-group-1');
  });
});
