import pool from '../utils/pool';

export default class Frogs  {
    id;
    name;
    color;
    size;
    gif;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.color = row.color;
        this.size = row.size;
        this.gif = row.gif;
    }
    static async insert({ name, color, size, gif }) {
        const { rows } = await pool.query(
            `INSERT INTO frogs (name, color, size, gif)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [name, color, size, gif]
        );

        return new Frogs(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM frogs');

        return rows.map((row) => new Frogs(row));
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM frogs WHERE id=$1', [id]);

        return new Frogs(rows[0]);
    }

    static async updateById(id, { name, color, size, gif }) {
        const existingFrog = await Frogs.getById(id);
        const newName = name ?? existingFrog.name;
        const newColor = color ?? existingFrog.color;
        const newSize = size ?? existingFrog.size;
        const newGif = gif ?? existingFrog.gif;

        const { rows } = await pool.query(
          'UPDATE frogs SET name=$1, color=$2, size=$3, gif=$4 WHERE id=$5 RETURNING *',
            [newName, newColor, newSize, newGif, id]
        );

        return new Frogs(rows[0]);
        }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM frogs WHERE id=$1 RETURNING *',
            [id]
        );

        return new Frogs(rows[0]);
    }

};
