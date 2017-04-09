/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'task',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    localDb : 'data',
    remoteDb : 'http://localhost:5984/test',
    // contentSecurityPolicyHeader: 'Content-Security-Policy',
    // contentSecurityPolicy: {
    //   // ... other stuff here
    //   remoteDb : 'http://localhost:5984/test',
    // },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      usingCors: true,
      corsWithCreds: false,
      apiURL: 'http://localhost:5984/test'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }
  ENV.localDb = 'test';
  ENV.remoteDb = "http://localhost:5984/test";
  return ENV;
};
