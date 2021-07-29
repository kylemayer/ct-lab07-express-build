import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a single frog via POST', async () => {
    const frogger = { name: 'frogger', color: 'green', size: 'tiny' };
    const res = await request(app).post('/api/v1/frogs').send(frogger);

    expect(res.body).toEqual({
      id: '1',
      ...frogger
    });
  });


});
