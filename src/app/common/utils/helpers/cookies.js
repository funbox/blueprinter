const getCookie = ({ name }) => {
  const regex = `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`;
  const matches = document.cookie.match(new RegExp(regex));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = ({ name, value, options = { path: '/' } }) => {
  const encodedValue = encodeURIComponent(value);
  let updatedCookie = `${name}=${encodedValue}`;

  if (!options.expires) {
    const date = new Date();
    date.setFullYear(2100);
    options.expires = date.toUTCString();
  }

  Object.keys(options).forEach(propKey => {
    const propValue = options[propKey];
    updatedCookie += `; ${propKey}=${propValue}`;
  });

  document.cookie = updatedCookie;
};

export default {
  get: getCookie,
  set: setCookie,
};
