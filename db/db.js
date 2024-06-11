import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '99933262',
    database: 'vendas'
});

export default {
    query: (text, params) => pool.query(text, params)
};
