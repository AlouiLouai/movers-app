export default () => ({
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined, // Parse if set
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    name: process.env.DB_DATABASE, 
  },
});
