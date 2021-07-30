import Frogs from '../models/Frogs';
import getGif from '../utils/gifphy';

export default class FrogService {
  static async create({ name, color, size }) {
    const gif = await getGif();
    const frog = await Frogs.insert({ name, color, size, gif });
    return frog;
  }
}
