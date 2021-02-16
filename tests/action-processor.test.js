import ActionProcessor from 'app/common/utils/helpers/action-processor';
import InheritanceResolver from 'app/common/utils/helpers/inheritance-resolver';
import { getActions, getMessages, getCategories } from './utils';

const actionFixtures = require('./fixtures/actions');
const messageFixtures = require('./fixtures/messages');

describe('action processor', () => {
  it('can be instantiated', () => {
    const resolver = new InheritanceResolver();
    const actionProcessor = new ActionProcessor(resolver);
    expect(actionProcessor).toBeInstanceOf(ActionProcessor);
  });

  it('can process a simple action', async () => {
    await testAction(
      actionFixtures.simple.source,
      actionFixtures.simple.parentElement,
      actionFixtures.simple.processed,
    );
  });

  it('can process an action with description', async () => {
    await testAction(
      actionFixtures.withDescription.source,
      actionFixtures.withDescription.parentElement,
      actionFixtures.withDescription.processed,
    );
  });

  it('removes duplicated transactions', async () => {
    await testAction(
      actionFixtures.withDuplicates.source,
      actionFixtures.withDuplicates.parentElement,
      actionFixtures.withDuplicates.processed,
    );
  });

  it('adds type attributes to nested members of a fixed object', async () => {
    await testAction(
      actionFixtures.withFixedObject.source,
      actionFixtures.withFixedObject.parentElement,
      actionFixtures.withFixedObject.processed,
    );
  });

  it('removes redundant «fixed-type» attribute when «fixed» is provided', async () => {
    await testAction(
      actionFixtures.withFixedAndFixedType.source,
      actionFixtures.withFixedAndFixedType.parentElement,
      actionFixtures.withFixedAndFixedType.processed,
    );
  });

  it('can extract hash anchor from action description', async () => {
    await testAction(
      actionFixtures.withHashAnchor.source,
      actionFixtures.withHashAnchor.parentElement,
      actionFixtures.withHashAnchor.processed,
    );
  });

  it('can acquire action attributes from a named structure', async () => {
    await testAction(
      actionFixtures.withNamedStructure.source,
      actionFixtures.withNamedStructure.parentElement,
      actionFixtures.withNamedStructure.processed,
    );
  });

  it('can process a message', async () => {
    await testMessage(
      messageFixtures.simple.source,
      messageFixtures.simple.parentElement,
      messageFixtures.simple.processed,
    );
  });

  it('can extract hash anchor from message description', async () => {
    await testMessage(
      messageFixtures.withHashAnchor.source,
      messageFixtures.withHashAnchor.parentElement,
      messageFixtures.withHashAnchor.processed,
    );
  });

  it('can process both messages and actions', async () => {
    const actionCategories = await getCategories(actionFixtures.simple.source);
    const messageCategories = await getCategories(messageFixtures.simple.source);
    const action = getActions(actionCategories)[0];
    const message = getMessages(messageCategories)[0];
    const resolver = new InheritanceResolver();
    const actionProcessor = new ActionProcessor(resolver);

    const processedAction = actionProcessor.refactorSource(action, actionFixtures.simple.parentElement);
    const processedMessage = actionProcessor.refactorSource(message, messageFixtures.simple.parentElement);

    expect(processedAction).toEqual(actionFixtures.simple.processed);
    expect(processedMessage).toEqual(messageFixtures.simple.processed);
  });
});

async function testAction(source, parentElement, expected) {
  const categories = await getCategories(source);
  const action = getActions(categories)[0];
  const resolver = new InheritanceResolver(categories);
  const actionProcessor = new ActionProcessor(resolver);

  const processed = actionProcessor.refactorAction(action, parentElement);
  expect(processed).toEqual(expected);
}

async function testMessage(source, parentElement, expected) {
  const categories = await getCategories(source);
  const message = getMessages(categories)[0];
  const resolver = new InheritanceResolver(categories);
  const actionProcessor = new ActionProcessor(resolver);

  const processed = actionProcessor.refactorMessage(message, parentElement);
  expect(processed).toEqual(expected);
}
