import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Frogs from '../lib/models/Frogs';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('returns all frogs via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny', gif: expect.any(String) });
    const frogeth = await Frogs.insert({ name: 'frogeth', color: 'blue', size: 'medium', gif: expect.any(String) });
    const frogella = await Frogs.insert({ name: 'frogella', color: 'red', size: 'small', gif: expect.any(String) });

    return request(app)
      .get('/api/v1/frogs')
      .then((res) => {
        expect(res.body).toEqual([frogger, frogeth, frogella]);
      });
  });

  it('returns a single frog by id via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny', gif: expect.any(String) });

    const res = await request(app).get(`/api/v1/frogs/${frogger.id}`);

    expect(res.body).toEqual(frogger);
  });

  it('updates a frog by id via GET', async () => {
    const frogger = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny', gif: expect.any(String) });

    const res = await request(app)
      .put(`/api/v1/frogs/${frogger.id}`)
      .send({ size: 'medium' });

    expect(res.body).toEqual({ ...frogger, size: 'medium' });
  });

  it('deletes an existing frog by id', async () => {
    const frog = await Frogs.insert({ name: 'frogger', color: 'green', size: 'tiny', gif: expect.any(String) });

    const res = await request(app).delete(`/api/v1/frogs/${frog.id}`);

    expect(res.body).toEqual({
      message: `${frog.name} has been deleted!`
    });
  });

  it('POST a frog and return a gif', async () => {
    const frogger = { name: 'frogger', color: 'green', size: 'tiny' };
    const res = await request(app).post('/api/v1/frogs').send(frogger);

    expect(res.body).toEqual({
      id: '1',
      gif: expect.any(String),
      ...frogger
    });
  });
});
