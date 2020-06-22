import { get } from './getters';

const standardTypes = ['number', 'string', 'boolean', 'array', 'enum', 'object'];

const getDataStructureId = (dataStructure) => (
  Array.isArray(dataStructure.content)
    ? dataStructure.content[0].meta.id.content
    : dataStructure.content.meta.id.content
);

export default class InheritanceResolver {
  constructor(categories = []) {
    this.categories = categories;
    this.usedStructuresMap = new Map();
  }

  resolveInheritance(valueMember, parent) {
    if (valueMember.recursive) {
      return valueMember;
    }

    const type = valueMember.element;
    const referencedDataStructure = this.categories.dataStructuresArray.find(ds => (
      getDataStructureId(ds) === (type === 'ref' ? valueMember.content : valueMember.element)
    ));
    const referencedSchemaStructure = this.categories.schemaStructuresArray.find(ss => (
      ss.meta.id.content === valueMember.element
    ));

    if (referencedDataStructure) {
      this.fillValueMemberWithDataStructureContent(referencedDataStructure, valueMember, parent);
      valueMember.recursive = referencedDataStructure.recursive;
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
      childElement = standardTypes.includes(elementType) ? valueMember.content.value : valueMember;
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
    const dataStructureId = getDataStructureId(referencedDataStructure);

    if (this.usedStructuresMap.has(dataStructureId)) {
      this.usedStructuresMap.get(dataStructureId).recursive = true;
      member.recursive = true;
      return;
    }

    this.usedStructuresMap.set(dataStructureId, referencedDataStructure);
    const refDSContent = referencedDataStructure.content;
    const enumContent = get('attributes', 'enumerations').from(refDSContent);
    const isEnum = !!enumContent;
    if (!standardTypes.includes(refDSContent.element)) {
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
      member.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
    } else if (!referencedObjectContent) {
      member.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
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
      member.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
      member.attributes = usefulContent.attributes;
      member.referenceDataStructure = dataStructureId;
    }
    this.usedStructuresMap.delete(dataStructureId);
  }
}