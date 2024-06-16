module.exports = {
    apps: [
      {
        name: "worldnote-frontend",
        script: "npm",
        args: "run dev",
        watch: false,
        env: {
          PM2_ENV: "dev"
        },
        env_prod: {
          PM2_ENV: "prod"
        }
      }
    ]
};
  