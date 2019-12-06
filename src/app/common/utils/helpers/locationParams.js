export default {
  parse: function parse(location) {
    return this.parseParams(location.search);
  },

  parseParams: function parseParams(paramsString) {
    if (!paramsString) return {};

    const params = paramsString
      .substr(1)
      .split('&')
      .reduce((acc, paramString) => {
        const [paramName, paramValue] = paramString.split('=');
        acc[decodeURIComponent(paramName)] = decodeURIComponent(paramValue);
        return acc;
      }, {});

    return params;
  },

  combine: (params) => {
    const result = Object.entries(params).reduce((acc, param) => {
      const [key, value] = param;
      acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      return acc;
    }, []).join('&');
    if (result) {
      return `?${result}`;
    }
    return result;
  },

  omit: (paramsString, paramToOmit) => {
    if (!paramsString) return '';

    const params = paramsString
      .substr(1)
      .split('&')
      .reduce((acc, paramString) => {
        const [paramName, paramValue] = paramString.split('=');
        if (decodeURIComponent(paramName) === paramToOmit) return acc;
        acc.push(`${paramName}=${paramValue}`);
        return acc;
      }, []).join('&');
    return params;
  },
};
