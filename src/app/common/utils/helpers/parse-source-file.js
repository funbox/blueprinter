import { GROUP_DEFAULT_TITLE } from 'app/constants/defaults';

import { htmlFromText } from './index';
import { get, getDescriptionWithoutHeaders } from './getters';

import extractCategories from './extract-categories';
import { createHash, combineHashes, createRoute, combineRoutes, createSlug, hashFromComment, getHashCode } from './hash';
import slugify from './slugify';
import ActionProcessor from './action-processor';
import InheritanceResolver from './inheritance-resolver';

/**
 * @param {Object} ast
 * @param {IdProvider} idProvider
 */
const parseSourceFile = (ast, idProvider) => {
  const { content } = ast;
  const [error, warnings] = detectErrorsAndWarnings(ast, idProvider);

  if (error) {
    return {
      topLevelMeta: {
        error,
        warnings,
      },
    };
  }

  const source = content[0];
  const resources = [];
  const actions = [];

  const topLevelDescription = source.content.find(i => i.element === 'copy');
  const topLevelDescriptionElement = topLevelDescription ? htmlFromText(topLevelDescription.content) : null;
  const topLevelContentItems = source.content;

  const topLevelMeta = {
    title: get('meta', 'title', 'content').from(source),
    description: topLevelDescriptionElement,
    host: getHost(),
    warnings,
  };

  const categories = extractCategories(topLevelContentItems);

  const resolver = new InheritanceResolver(categories);
  const actionProcessor = new ActionProcessor(resolver);

  const groups = categories.resourceGroupArray.map((group, gIndex) => {
    const groupTitle = get('meta', 'title', 'content').from(group) || `${GROUP_DEFAULT_TITLE} ${gIndex + 1}`;
    const groupDescription = getDescriptionWithoutHeaders(group);

    const gPresetHash = groupDescription && hashFromComment(groupDescription);
    const gHashBase = gPresetHash || `group-${groupTitle}`;
    const gHashBaseLegacy = gPresetHash || groupTitle;

    const groupLegacyHash = createHash(gHashBaseLegacy);
    const groupRoute = createRoute(gHashBase, createSlug);
    const groupMeta = {
      title: groupTitle,
      hashForLegacyUrl: groupLegacyHash,
      route: groupRoute,
    };

    group.hashForLegacyUrl = groupLegacyHash; // используется в app.jsx@convertLegacyUrl
    group.route = groupRoute;
    group.title = groupTitle;
    group.id = idProvider.getUniqueId();
    group.nestedRoutePresets = [];

    group.content = group.content.map((groupChild, rIndex) => {
      if (groupChild.element === 'copy') {
        return groupChild;
      }

      groupChild.id = idProvider.getUniqueId();
      groupChild.nestedRoutePresets = [];

      if (groupChild.element === 'message') {
        const message = actionProcessor.refactorMessage(groupChild, groupMeta);
        message.parentGroup = groupMeta;
        resources.push(message);
        if (message.routePreset) {
          group.nestedRoutePresets.push(message.routePreset);
        }
        return message;
      }

      const resourceHref = get('attributes', 'href', 'content').from(groupChild);
      const resourceTitle = get('meta', 'title', 'content').from(groupChild);
      const resourceDescription = getDescriptionWithoutHeaders(groupChild);

      const rActualIndex = groupDescription ? rIndex : (rIndex + 1);
      const rHashCode = getHashCode(`${resourceTitle || ''}-${resourceHref || ''}`);
      const rHashMidPart = resourceHref ? resourceHref.slice(1) : slugify(resourceTitle); // у SubGroup нет href

      const rPresetHash = resourceDescription && hashFromComment(resourceDescription);
      const rHashBase = `resource-${rHashMidPart}-${rHashCode.toString(16)}`;
      const rHashBaseLegacy = resourceTitle || String(rActualIndex);

      const resourceLegacyHash = rPresetHash ? createHash(rPresetHash) : combineHashes(group.hashForLegacyUrl, createHash(rHashBaseLegacy));
      const resourceRoute = rPresetHash ? createRoute(rPresetHash) : combineRoutes(groupRoute, createRoute(rHashBase));
      const resourceMeta = {
        title: resourceTitle || resourceHref,
        href: resourceHref,
        hashForLegacyUrl: resourceLegacyHash,
        route: resourceRoute,
        group: groupMeta,
      };

      if (rPresetHash) {
        group.nestedRoutePresets.push(resourceRoute);
      }

      groupChild.hashForLegacyUrl = resourceLegacyHash;
      groupChild.route = resourceRoute;
      groupChild.title = resourceTitle || resourceHref;

      groupChild.content = groupChild.content.map(resourceChild => {
        if (resourceChild.element === 'copy') return resourceChild;
        if (!resourceChild.attributes) {
          resourceChild.attributes = {};
        }

        resourceChild.attributes = { ...groupChild.attributes, ...resourceChild.attributes };
        resourceChild.id = idProvider.getUniqueId();

        const action = actionProcessor.refactorSource(resourceChild, resourceMeta);

        action.parentResource = resourceMeta;
        actions.push(action);

        if (action.routePreset) {
          groupChild.nestedRoutePresets.push(action.routePreset);
          group.nestedRoutePresets.push(action.routePreset);
        }

        return action;
      });

      groupChild.parentGroup = groupMeta;

      resources.push(groupChild);
      return groupChild;
    });

    return group;
  });

  return {
    topLevelMeta,
    groups,
    resources,
    actions,
  };
};

export default parseSourceFile;

function detectErrorsAndWarnings(ast, idProvider) {
  let eAnnotation;
  const { content } = ast;
  const warnings = [];
  const annotationType = (source) => get('meta', 'classes', 'content', '0', 'content').from(source);
  const isAnnotationOfType = (item, type) => {
    if (item.element !== 'annotation') return false;
    return annotationType(item) === type;
  };
  content.forEach(item => {
    if (isAnnotationOfType(item, 'error')) {
      eAnnotation = item;
      return;
    }
    if (isAnnotationOfType(item, 'warning')) {
      warnings.push(item);
    }
  });

  const consumableWarnings = warnings.map(annotation => ({
    ...extractAnnotationInfo(annotation),
    id: idProvider.getUniqueId(),
  }));

  if (!eAnnotation) {
    return [undefined, consumableWarnings];
  }

  const consumableError = {
    ...extractErrorInfo(eAnnotation, ast.attributes),
    id: idProvider.getUniqueId(),
  };

  return [consumableError, consumableWarnings];
}

function extractAnnotationInfo(annotation) {
  const text = annotation.content;
  const result = { text };

  if (annotation.attributes) {
    const sourceMap = annotation.attributes.sourceMap.content[0];
    const startPositionSourceMap = sourceMap.content[0];
    const sourceFile = sourceMap.file;
    const positionAttributes = startPositionSourceMap.content[0].attributes;
    result.positionDetails = {
      line: positionAttributes.line.content,
      column: positionAttributes.column.content,
      file: sourceFile,
    };
  }

  return result;
}

function extractErrorInfo(annotation, astAttributes) {
  const annotationInfo = extractAnnotationInfo(annotation);

  if (!astAttributes) {
    return annotationInfo;
  }

  const { errorDetails } = astAttributes;
  return {
    ...annotationInfo,
    positionDetails: {
      ...annotationInfo.positionDetails,
      file: errorDetails.file,
      lines: errorDetails.lines,
    },
  };
}

function getHost(source) {
  const metadata = get('attributes', 'metadata', 'content').from(source);
  const hostMetaElement = metadata && metadata.find(item => item.content.key.content === 'HOST');
  return hostMetaElement ? hostMetaElement.content.value.content : null;
}
