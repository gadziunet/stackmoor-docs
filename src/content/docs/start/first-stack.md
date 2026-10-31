---
title: Your first stack
description: Create, start and manage a Docker Compose stack in Stackmoor.
---

A **stack** is one app described by a `compose.yaml` – for example Nextcloud with its database. Each stack lives in its own folder: `/opt/stacks/<name>/`.

## Around the panel

- **Top menu:** Stacks · Backups · Domains · Network · Settings. On a phone it moves to the bottom of the screen.
- **Dashboard (Stacks):** a card for every stack – its state, address and last backup – with **Restart** (or **Start**, or **Update** when a new image is waiting) and **Open**. Under the cards: [proxies](/guides/proxy/) and recent events.
- **Status bar** at the bottom: Caddy, the certificate, VPN tunnels, proxies, the last backup and the version. Click an item to go to its page.
- **Search** (Ctrl K / ⌘ K): type part of a stack’s name; Enter opens the first match.
- **Account menu** (top right): **Account settings** (password and language), the **Light / Dark** theme and **Log out**.

<figure class="shot" data-shot="overview">
<img class="shot-light" src="/screens/en/overview-light.webp" alt="The dashboard: stack cards, proxies, recent events and the status bar" width="1280" height="860" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/overview-dark.webp" alt="The dashboard: stack cards, proxies, recent events and the status bar" width="1280" height="860" loading="lazy" decoding="async" />
</figure>

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
| **Open app ↗** | Opens the app in a new tab: at its [domain](/guides/local-domains/) if it has one, otherwise at the server's address with the published port. With several addresses it shows a short list. |

Every operation shows its live output and is saved in the **History** tab. Next to the editor you see the stack’s containers, its addresses and its latest backups; the list of all stacks stays on the left.

<figure class="shot" data-shot="stack">
<img class="shot-light" src="/screens/en/stack-light.webp" alt="A stack: the list of stacks, buttons, the compose editor and containers, addresses and backups" width="1280" height="860" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/stack-dark.webp" alt="A stack: the list of stacks, buttons, the compose editor and containers, addresses and backups" width="1280" height="860" loading="lazy" decoding="async" />
</figure>

## Ports

Before a stack starts, its published ports are checked. If a port is already used by another container, you see which one and a free port you can use instead.

## Deleting a stack

**Delete** asks you to type the stack's name, shuts it down and moves its folder to `/opt/stacks/.trash/`. Nothing is deleted for good – remove the folder from the trash yourself when you are sure.
