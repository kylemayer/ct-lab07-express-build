import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Frogs from '../lib/models/Frogs';

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

  it('returns all frogs via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny' });
    const frogeth = await Frogs.insert({ name: 'frogeth', color: 'blue', size: 'medium' });
    const frogella = await Frogs.insert({ name: 'frogella', color: 'red', size: 'small' });

    return request(app)
      .get('/api/v1/frogs')
      .then((res) => {
        expect(res.body).toEqual([frogger, frogeth, frogella]);
      });
  });

  it('returns a single frog by id via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny' });

    const res = await request(app).get(`/api/v1/frogs/${frogger.id}`);

    expect(res.body).toEqual(frogger);
  });

  it('updates a frog by id via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny' });

    const res = await request(app)
      .put(`/api/v1/frogs/${frogger.id}`)
      .send({ size: 'medium' });

    expect(res.body).toEqual({ ...frogger, size: 'medium' });
  });


});
