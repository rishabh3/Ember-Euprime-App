import Model from 'ember-pouch/model';
import DS from 'ember-data';

const {
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
        title       : attr(),
        description : attr(),
        author: attr(),
        likes : attr()
});
