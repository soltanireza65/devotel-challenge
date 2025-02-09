#!/usr/bin/env bash

set -e


# Run the application

docker compose up -d

docker compose exec api pnpm test