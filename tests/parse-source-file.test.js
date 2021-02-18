import parseSourceFile from 'app/common/utils/helpers/parse-source-file';
import IdProvider from 'app/common/utils/helpers/id-provider';

const Crafter = require('@funbox/crafter');
const blueprintFixtures = require('./fixtures/blueprints');

const idProvider = IdProvider(() => 0);

describe('parse-source-file', () => {
  it('detects errors in the source ast', async () => {
    await testBlueprint(
      blueprintFixtures.withError.source,
      blueprintFixtures.withError.processed,
    );
  });

  it('detects errors and warnings in the source ast', async () => {
    await testBlueprint(
      blueprintFixtures.withErrorAndWarning.source,
      blueprintFixtures.withErrorAndWarning.processed,
    );
  });

  it('handles an error without position details', async () => {
    await testBlueprint(
      blueprintFixtures.withReducedError.source,
      blueprintFixtures.withReducedError.processed,
    );
  });

  it('parses title, metadata and description of a blueprint', async () => {
    await testBlueprint(
      blueprintFixtures.withMeta.source,
      blueprintFixtures.withMeta.processed,
    );
  });

  it('parses a simple blueprint doc', async () => {
    await testBlueprint(
      blueprintFixtures.simple.source,
      blueprintFixtures.simple.processed,
    );
  });

  it('parses a blueprint doc with descriptions at all levels', async () => {
    await testBlueprint(
      blueprintFixtures.withDescriptions.source,
      blueprintFixtures.withDescriptions.processed,
    );
  });

  it('parses a blueprint doc with messages and subgroups', async () => {
    await testBlueprint(
      blueprintFixtures.withMessages.source,
      blueprintFixtures.withMessages.processed,
    );
  });

  it('parses a blueprint doc with hash anchors in comments', async () => {
    await testBlueprint(
      blueprintFixtures.withAnchors.source,
      blueprintFixtures.withAnchors.processed,
    );
  });

  it('handles the situation when titles are not defined', async () => {
    await testBlueprint(
      blueprintFixtures.withNamelessSections.source,
      blueprintFixtures.withNamelessSections.processed,
    );
  });
});

async function testBlueprint(source, expected) {
  const [result] = await Crafter.parse(source);
  const ast = result.toRefract();
  const parsed = parseSourceFile(ast, idProvider);

  expect(parsed).toEqual(expected);
}
