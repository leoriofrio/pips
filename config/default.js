module.exports = {
    api: {
      url: process.env.NIAAA_URL
    },
    services: {
      auth: {
        url: process.env.SERVICES_AUTH_URL,
        clientId: process.env.SERVICES_AUTH_CLIENT_ID,
        tenant: process.env.SERVICES_AUTH_TENANT,
        disableRouting: true
      }
    }
  };
  