import api from './api/index.js';

export default function routes(app) {
  app.use('/api', api);
}