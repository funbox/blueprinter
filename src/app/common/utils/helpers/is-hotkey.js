export default function isHotkey(event, code) {
  const isTargetInput = event.target.tagName.toLowerCase() === 'input';
  return !isTargetInput && !event.ctrlKey && event.keyCode === code;
}
