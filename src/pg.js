import pg from 'pg'
const { Client } = pg

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'test',
    password: 'toor',
    port: 5432,  
 // Port default PostgreSQL
});

await client.connect()

export default client