module.exports = {
    apps: [
      {
        name: "worldnote-frontend",
        script: "npm",
        args: "run dev",
        watch: false,
        env: {
          ENV: "dev"
        },
        env_prod: {
          ENV: "prod"
        }
      }
    ]
};
  