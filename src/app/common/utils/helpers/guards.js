export function isHotkey(event, code) {
  const isTargetInput = event.target.tagName.toLowerCase() === 'input';
  return !isTargetInput && !event.ctrlKey && event.keyCode === code;
}

export function isString(s) {
  return (typeof s === 'string' || s instanceof String);
}
