import { Router } from 'express';
import Frogs from '../models/Frogs';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const frog = await Frogs.insert(req.body);

      res.send(frog);

    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const frogs = await Frogs.getAll();

      res.send(frogs);
    } catch (err) {
      next(err);

    }
  });

