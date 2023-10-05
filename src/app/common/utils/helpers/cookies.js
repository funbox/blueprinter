const DEFAULT_OPTIONS = {
  domain: window.location.hostname.split('.').slice(-2).join('.'),
};

const getCookie = ({ name }) => {
  const regex = `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`;
  const matches = document.cookie.match(new RegExp(regex));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = ({
  name,
  value,
  options = {},
}) => {
  const encodedValue = encodeURIComponent(value);
  let updatedCookie = `${name}=${encodedValue}`;

  const updatedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (!updatedOptions.expires) {
    const date = new Date();
    date.setFullYear(2100);
    updatedOptions.expires = date.toUTCString();
  }

  Object.keys(updatedOptions).forEach(propKey => {
    const propValue = updatedOptions[propKey];
    updatedCookie += `; ${propKey}=${propValue}`;
  });

  document.cookie = updatedCookie;
};

const removeCookie = ({ name }) => {
  setCookie({
    name,
    value: '',
    options: {
      expires: new Date(0).toUTCString(),
    },
  });
};

export default {
  get: getCookie,
  set: setCookie,
  remove: removeCookie,
};
