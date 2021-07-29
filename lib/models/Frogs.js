import pool from '../utils/pool';

export default class Frogs  {
    id;
    name;
    color;
    size;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.color = row.color;
        this.size = row.size;
    }
    static async insert({ name, color, size }) {
        const { rows } = await pool.query(
            `INSERT INTO frogs (name, color, size)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, color, size]
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

    static async updateById(id, { name, color, size }) {
        const existingFrog = await Frogs.getById(id);
        const newName = name ?? existingFrog.name;
        const newColor = color ?? existingFrog.color;
        const newSize = size ?? existingFrog.size;

        const { rows } = await pool.query(
          'UPDATE frogs SET name=$1, color=$2, size=$3 WHERE id=$4 RETURNING *',
            [newName, newColor, newSize, id]
        );

        return new Frogs(rows[0]);
        }

};
