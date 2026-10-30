---
title: Install on Linux
description: Install Stackmoor with one command on Debian, Ubuntu or Raspberry Pi OS.
---

Stackmoor runs on any Linux machine with Docker. The install script works on a clean **Debian**, **Ubuntu** or **Raspberry Pi OS** (x86_64 or arm64).

## Install

Run as root (or with `sudo`):

```bash
curl -fsSL https://raw.githubusercontent.com/gadziunet/stackmoor/main/install.sh | sudo bash
```

The script:

1. installs Docker if it is missing,
2. creates `/opt/stackmoor` (the panel) and `/opt/stacks` (your stacks),
3. starts the `stackmoor` container,
4. prints the address, e.g. `http://192.168.1.50:5001`.

Open that address and create the administrator account – it is the only account in the panel. The password needs at least 10 characters.

Moving from an old server? Choose **Restore a server from a backup** instead – see [Restore everything on a new server](/backups/restore/#restore-everything-on-a-new-server).

## Options

Set them in front of `bash`, e.g. `curl … | sudo PORT=8080 bash`:

| Variable | Default | What it does |
|---|---|---|
| `PORT` | `5001` | Port of the panel |
| `STACKS_DIR` | `/opt/stacks` | Where stacks are stored (must be an absolute path) |
| `INSTALL_DIR` | `/opt/stackmoor` | Where the panel's own files live |
| `STACKMOOR_IMAGE` | `ghcr.io/gadziunet/stackmoor:latest` | Image to run, e.g. `:edge` for test builds |

The choices are saved in `/opt/stackmoor/.env`. Change settings there, not in the generated `compose.yaml` – the script rewrites that file on every run.

If the port is already taken, the script stops and tells you; pick another one with `PORT=`.

## Update

Either click **Update** in **Settings → Updates**, or run the install command again. Your stacks and settings are kept.

## Test builds

To try the newest, unreleased build, switch the image to `edge`:

```bash
cd /opt/stackmoor
sed -i 's|^STACKMOOR_IMAGE=.*|STACKMOOR_IMAGE=ghcr.io/gadziunet/stackmoor:edge|' .env
docker compose pull && docker compose up -d
```

Go back with `:latest` the same way.

:::caution[Keep the panel private]
Stackmoor controls Docker, which means full control over the machine. Keep it on your local network or behind a VPN – never expose port 5001 to the internet.
:::
