import { STANDARD_TYPES } from 'app/constants/defaults';
import { get } from './getters';
import extractCategories from './extract-categories';

const defaultCategories = extractCategories();

export default class InheritanceResolver {
  constructor(categories = defaultCategories) {
    this.categories = categories;
    this.usedStructuresMap = new Map();
    this.cachedDataStructures = new Map();
  }

  getCache() {
    return this.cachedDataStructures;
  }

  getCacheSize() {
    return this.cachedDataStructures.size;
  }

  canUseCache(memberSource) {
    const hasContentOverridden = !!memberSource.content;

    return !hasContentOverridden;
  }

  getCachedDataStructure(member) {
    const canUseFromCache = this.canUseCache(member);

    if (!canUseFromCache) return null;

    const cacheKey = this.getCacheKey(member);

    return this.cachedDataStructures.get(cacheKey);
  }

  cacheDataStructure(member) {
    const cacheKey = this.getCacheKey(member);

    if (!cacheKey) return;

    this.cachedDataStructures.set(cacheKey, member);
  }

  getCacheKey(member) {
    const referenceDataStructure = member.referenceDataStructure || member.element;

    if (!referenceDataStructure) return null;

    const attrs = this.getSortedAttributesString(member);

    return (referenceDataStructure + attrs);
  }

  getSortedAttributesString(member) {
    const attrsContent = get('attributes', 'typeAttributes', 'content').from(member);

    return attrsContent ? JSON.stringify(attrsContent.map(attr => attr.content).sort()) : '';
  }

  resolveInheritance(valueMember, parent) {
    if (valueMember.recursive) {
      return valueMember;
    }

    const type = valueMember.element;
    const referencedDataStructure = this.categories.dataStructuresArray.find(ds => (
      ds.id === (type === 'ref' ? valueMember.content : valueMember.element)
    ));
    const referencedSchemaStructure = this.categories.schemaStructuresArray.find(ss => (
      ss.meta.id.content === valueMember.element
    ));

    if (referencedDataStructure) {
      const canCache = this.canUseCache(valueMember);

      this.fillValueMemberWithDataStructureContent(referencedDataStructure, valueMember, parent);
      valueMember.recursive = referencedDataStructure.recursive;

      if (canCache) this.cacheDataStructure(valueMember);
    }

    if (referencedSchemaStructure) {
      const refSSContent = referencedSchemaStructure.content;
      if (Array.isArray(refSSContent) && refSSContent.every(item => item.element === 'asset')) {
        valueMember.element = 'schema type';
      }
    }

    let childElement;
    if (type === 'member') {
      const elementType = valueMember.content.value.element;
      childElement = STANDARD_TYPES.includes(elementType) ? valueMember.content.value : valueMember;
    } else {
      childElement = valueMember;
    }
    const childElementContent = childElement.content;

    if (Array.isArray(childElementContent)) {
      childElementContent.map(item => this.resolveInheritance(item, childElement));
    } else if (childElementContent && childElementContent.value) {
      this.resolveInheritance(childElementContent.value, valueMember);
    }

    return valueMember;
  }

  fillValueMemberWithDataStructureContent(referencedDataStructure, member, memberParent) {
    const type = member.element;
    const dataStructureId = referencedDataStructure.id;

    if (this.usedStructuresMap.has(dataStructureId)) {
      this.usedStructuresMap.get(dataStructureId).recursive = true;
      member.recursive = true;
      return;
    }

    this.usedStructuresMap.set(dataStructureId, referencedDataStructure);
    const refDSContent = referencedDataStructure.content;
    const enumContent = get('attributes', 'enumerations').from(refDSContent);
    const isEnum = !!enumContent;
    if (!STANDARD_TYPES.includes(refDSContent.element)) {
      this.resolveInheritance(refDSContent);
    }
    const referencedObjectType = refDSContent.element;
    const usefulContent = isEnum ? enumContent : refDSContent;

    let referencedObjectContent;
    if (Array.isArray(usefulContent.content)) {
      usefulContent.content.forEach(item => this.resolveInheritance(item, usefulContent));
      referencedObjectContent = [...usefulContent.content];
    }

    if (type === 'ref') {
      const refMemberIndex = memberParent.content.indexOf(member);
      const refilledArray = memberParent.content.slice(0, refMemberIndex)
        .concat(referencedObjectContent)
        .concat(memberParent.content.slice(refMemberIndex + 1));
      memberParent.content = [...refilledArray];
    } else if (isEnum) {
      member.attributes = member.attributes || {};
      member.attributes.enumerations = member.attributes.enumerations || {};
      member.attributes.enumerations.content = member.attributes.enumerations.content || [];
      member.attributes.enumerations.content.unshift(...referencedObjectContent);
      member.element = STANDARD_TYPES.includes(referencedObjectType) ? referencedObjectType : 'object';
    } else if (!referencedObjectContent) {
      member.element = STANDARD_TYPES.includes(referencedObjectType) ? referencedObjectType : 'object';
      member.attributes = usefulContent.attributes;
    } else {
      if (!Array.isArray(member.content)) member.content = [];
      if (member.content.length && referencedObjectContent.length) {
        referencedObjectContent = referencedObjectContent.filter(rfcItem => !member.content.find(vmcItem => {
          if (rfcItem.element === 'member' && vmcItem.element === 'member') {
            return rfcItem.content.key.content === vmcItem.content.key.content;
          }
          return false;
        }));
      }

      member.content.unshift(...referencedObjectContent);
      member.element = STANDARD_TYPES.includes(referencedObjectType) ? referencedObjectType : 'object';

      if (!member.attributes) {
        member.attributes = usefulContent.attributes;
      } else {
        const usefulContentAttrs = get('attributes', 'typeAttributes', 'content').from(usefulContent);
        const memberAttrs = get('attributes', 'typeAttributes', 'content').from(member);

        if (usefulContentAttrs) {
          usefulContentAttrs.forEach(attr => {
            const memberHasAttr = memberAttrs.some(memberAttr => memberAttr.content === attr.content);

            if (!memberHasAttr) memberAttrs.push(attr);
          });
        }
      }

      member.referenceDataStructure = dataStructureId;
    }
    this.usedStructuresMap.delete(dataStructureId);
  }
}
