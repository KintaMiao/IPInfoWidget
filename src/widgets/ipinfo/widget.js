import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    ip: {
      endpoint: "?format=json",
    },
    details: {
      endpoint: "json",
      map: (data) => ({
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      }),
    },
  },
};

export default widget; 