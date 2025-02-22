export default () => ({
  database: {
    type: process.env.DB_TYPE, // Should be set in environment
    host: process.env.DB_HOST, // Should be set in environment
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined, // Parse if set
    username: process.env.DB_USERNAME, // Should be set in environment
    password: process.env.DB_PASSWORD, // Should be set in environment
    name: process.env.DB_DATABASE, // Should be set in environment
  },
});
