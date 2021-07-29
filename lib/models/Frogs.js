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


};
