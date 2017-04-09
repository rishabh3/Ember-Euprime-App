export function initialize(/* appInstance */) {
  // appInstance.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'sofa-develop',
  initialize(app) {
    window.store = app.lookup('service:store');
    window.log = console.log.bind(console);
    window.err = err => console.error(err.toJSON ? err.toJSON() : err.stack);
  }
};
