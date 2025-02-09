#!/usr/bin/env bash

set -e


# Run the application

echo "Running the application"

docker compose up -d

docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma migrate generate

docker compose up