import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { formController } from './presentation/controllers/FormController';
import { responseController } from './presentation/controllers/ResponseController';

const app = new Hono()
  .use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
    }),
  )
  .get('/', (c) => {
    return c.json({ message: 'Hello from Hono backend!' });
  })
  .get('/api/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  })
  .route('/api/forms', formController)
  .route('/api/responses', responseController);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
