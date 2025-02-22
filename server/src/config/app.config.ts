export default () => ({
  app: {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined, // No fallback
    env: process.env.APP_ENV, // Should be set in environment
  },
});
