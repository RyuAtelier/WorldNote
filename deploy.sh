#!/bin/bash

# Ask for env
prompt_for_env() {
  while true; 
  do
    read -p "Enter the environment (prod or dev): " env
    if [[ "$env" == "prod" || "$env" == "dev" ]]; then
      break
    else
      echo "Invalid environment. Please enter 'prod' or 'dev'."
    fi
  done
}

prompt_for_env

# Install all dependencies
npm install

# Install only development dependencies
npm install --only=dev

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null
then
    npm install pm2 -g
fi

# Start the application with PM2 using the specified environment
pm2 start ecosystem.config.cjs --name worldnote-frontend-$env --env $env
