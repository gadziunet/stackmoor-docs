---
title: Your first stack
description: Create, start and manage a Docker Compose stack in Stackmoor.
---

A **stack** is one app described by a `compose.yaml` – for example Nextcloud with its database. Each stack lives in its own folder: `/opt/stacks/<name>/`.

## Create a stack

1. Click **+ New stack**.
2. Give it a name: lowercase letters, digits, `-` and `_`, e.g. `miniflux`.
3. Paste the `compose.yaml` – for example from the app's documentation.
4. Optionally add a `.env` file with variables.
5. Click **Create and start**.

Before saving, the file is checked with `docker compose config`. A broken file is never saved – you see the error instead.

After saving, the panel shows exactly what it changed – usually where app data will be stored (see [Automatic volumes](/guides/automatic-volumes/)).

## Example: Miniflux with PostgreSQL

```yaml
services:
  miniflux:
    image: miniflux/miniflux:latest
    ports:
      - "8090:8080"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://miniflux:secret@db/miniflux?sslmode=disable
      RUN_MIGRATIONS: 1
      CREATE_ADMIN: 1
      ADMIN_USERNAME: admin
      ADMIN_PASSWORD: change-me-please
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: miniflux
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miniflux
    volumes:
      - db:/var/lib/postgresql/data
volumes:
  db:
```

The named volume `db` becomes the folder `./data/db` inside the stack – no paths to type.

## Buttons

| Button | What it does |
|---|---|
| **Start** | `docker compose up -d` |
| **Restart** | Restarts the containers |
| **Update** | Pulls new images and recreates the containers (with a [backup first](/backups/setup/), if set up) |
| **Stop** | Stops the containers, keeps them |
| **Shut down** | Stops and removes the containers – the data in `./data` stays |

Every operation shows its live output and is saved in the **History** tab.

## Ports

Before a stack starts, its published ports are checked. If a port is already used by another container, you see which one and a free port you can use instead.

## Deleting a stack

**Delete** asks you to type the stack's name, shuts it down and moves its folder to `/opt/stacks/.trash/`. Nothing is deleted for good – remove the folder from the trash yourself when you are sure.
