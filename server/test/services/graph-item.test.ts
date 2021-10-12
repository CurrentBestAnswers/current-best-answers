import assert from 'assert';
import app from '../../src/app';

describe('\'graphItem\' service', () => {
  it('registered the service', () => {
    const service = app.service('graph-item');

    assert.ok(service, 'Registered the service');
  });
});
