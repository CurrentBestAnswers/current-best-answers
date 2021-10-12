import assert from 'assert';
import app from '../../src/app';

describe('\'GraphService\' service', () => {
  it('registered the service', () => {
    const service = app.service('graph');

    assert.ok(service, 'Registered the service');
  });
});
