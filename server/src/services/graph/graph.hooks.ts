const { shallowPopulate } = require('feathers-shallow-populate');

const options = {
  include: [
    {
      service: 'graph-item',
      nameAs: 'data',
      keyHere: 'data',
      keyThere: '_id',
      asArray: true,
      params: {}
    }
  ]
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: shallowPopulate(options),
    get: shallowPopulate(options),
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
