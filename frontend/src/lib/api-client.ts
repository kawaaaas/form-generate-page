import type { AppType } from '../../../backend/src/index';
import { hc } from 'hono/client';

const client = hc<AppType>('http://localhost:3000/');

export { client };
