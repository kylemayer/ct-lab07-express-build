import { Router } from 'express';
import Frogs from '../models/Frogs';
import FrogService from '../services/FrogService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const frog = await FrogService.create(req.body);

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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const frog = await Frogs.getById(id);

      res.send(frog);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, color, size, gif } = req.body;

      const updatedFrog = await Frogs.updateById(id, { name, color, size, gif });

      res.send(updatedFrog);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const frog = await Frogs.deleteById(id);

      res.send({
        message: `${frog.name} has been deleted!`,
      });
    } catch (err) {
      next(err);
    }
  });


