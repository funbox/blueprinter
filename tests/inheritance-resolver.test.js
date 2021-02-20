import Crafter from '@funbox/crafter';
import InheritanceResolver from 'app/common/utils/helpers/inheritance-resolver';
import extractCategories from 'app/common/utils/helpers/extract-categories';

import fixtures from './fixtures/structures';

describe('Inheritance resolver', () => {
  it('can be instantiated', () => {
    const resolver = new InheritanceResolver();
    expect(resolver).toBeInstanceOf(InheritanceResolver);
  });

  it('resolves inheritance from a data structure', async () => {
    await testInheritanceFromStructure(
      fixtures.dataStructure.source,
      fixtures.dataStructure.parentElement,
      fixtures.dataStructure.processed,
    );
  });

  it('resolves inheritance from a schema structure', async () => {
    await testInheritanceFromStructure(
      fixtures.schemaStructure.source,
      fixtures.schemaStructure.parentElement,
      fixtures.schemaStructure.processed,
    );
  });

  it('resolves nested inheritance', async () => {
    await testInheritanceFromStructure(
      fixtures.nestedInheritance.source,
      fixtures.nestedInheritance.parentElement,
      fixtures.nestedInheritance.processed,
    );
  });

  it('resolves inheritance from a mixin', async () => {
    await testInheritanceFromStructure(
      fixtures.mixinInheritance.source,
      fixtures.mixinInheritance.parentElement,
      fixtures.mixinInheritance.processed,
    );
  });

  it('resolves inheritance from an enum structure', async () => {
    await testInheritanceFromStructure(
      fixtures.enumInheritance.source,
      fixtures.enumInheritance.parentElement,
      fixtures.enumInheritance.processed,
    );
  });

  it('manages a simple recursive value member', async () => {
    await testInheritanceFromStructure(
      fixtures.simpleRecursion.source,
      fixtures.simpleRecursion.parentElement,
      fixtures.simpleRecursion.processed,
    );
  });

  it('manages a deep recursive value member', async () => {
    await testInheritanceFromStructure(
      fixtures.deepRecursion.source,
      fixtures.deepRecursion.parentElement,
      fixtures.deepRecursion.processed,
    );
  });

  it('saves data structure attributes', async () => {
    await testInheritanceFromStructure(
      fixtures.structureWithAttributes.source,
      fixtures.structureWithAttributes.parentElement,
      fixtures.structureWithAttributes.processed,
    );
  });

  it('can cache member with referenced data structure', async () => {
    const categories = await getCategories(fixtures.cache.source);
    const resolver = new InheritanceResolver(categories);
    resolver.cacheDataStructure(fixtures.cache.memberWithReference);

    expect(resolver.cachedDataStructures.size).toBe(1); // TODO: по-хорошему, cachedDataStructures — приватное поле и к нему нельзя обращаться
  });

  it('a member without referenced data structure cannot be cached', async () => {
    const categories = await getCategories(fixtures.cache.source);
    const resolver = new InheritanceResolver(categories);
    resolver.cacheDataStructure(fixtures.cache.memberWithoutReference);

    expect(resolver.cachedDataStructures.size).toBe(0);
  });

  it('cached member can be obtained', async () => {
    const categories = await getCategories(fixtures.cache.source);
    const resolver = new InheritanceResolver(categories);
    resolver.cacheDataStructure(fixtures.cache.memberWithReference);

    const cached = resolver.getCachedDataStructure(fixtures.cache.memberWithReference);

    expect(cached).toBe(fixtures.cache.memberWithReference);
    expect(cached).toEqual(fixtures.cache.memberWithReference);
  });

  it('accounts members attributes when caching', async () => {
    const categories = await getCategories(fixtures.cacheAttributes.source);
    const resolver = new InheritanceResolver(categories);
    resolver.cacheDataStructure(fixtures.cacheAttributes.memberToCache);

    const cached = resolver.getCachedDataStructure(fixtures.cacheAttributes.memberToObtain);

    expect(cached).toBeNull();
  });

  it('handles attributes override', async () => {
    await testInheritanceFromStructure(
      fixtures.attributesOverride.source,
      fixtures.attributesOverride.parentElement,
      fixtures.attributesOverride.processed,
    );
  });

  it('can inherit type attributes from a primitive data structure', async () => {
    await testInheritanceFromStructure(
      fixtures.primitiveStructure.source,
      fixtures.primitiveStructure.parentElement,
      fixtures.primitiveStructure.processed,
    );
  });
});

async function getCategories(apib) {
  const [result] = await Crafter.parse(apib);
  const ast = result.toRefract();
  const content = ast.content[0].content;

  return extractCategories(content);
}

async function testInheritanceFromStructure(source, parentElement, expected) {
  const categories = await getCategories(source);
  const valueMember = parentElement.content;
  const resolver = new InheritanceResolver(categories);

  resolver.resolveInheritance(valueMember, parentElement);

  expect(valueMember).toEqual(expected);
}
