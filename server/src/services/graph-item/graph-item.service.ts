// Initializes the `graphItem` service on path `/graph-item`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GraphItem } from './graph-item.class';
import createModel from '../../models/graph-item.model';
import hooks from './graph-item.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'graph-item': GraphItem & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/graph-item', new GraphItem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('graph-item');

  service.hooks(hooks);
}
