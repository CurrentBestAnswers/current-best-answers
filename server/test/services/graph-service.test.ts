import assert from 'assert';
import app from '../../src/app';

describe('\'graph-service\' service', () => {
  it('registered the service', () => {
    const service = app.service('graph-service');

    assert.ok(service, 'Registered the service');
  });
});
