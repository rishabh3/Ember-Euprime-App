import { Store } from 'sofa';

export default Store.extend({

  databaseOptionsForIdentifier(identifier) {
    let url = 'http://127.0.0.1:5984';
    if(identifier === 'main') {
      return { url, name: 'test' };
    }
    if(identifier === 'session'){
            return {url, name: 'sessions_eu-app'}
    }
    if(identifier === 'post'){
            return {url, name: 'post'}
    }
  }

});
