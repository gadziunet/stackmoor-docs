---
title: Install on Unraid
description: Run Stackmoor as a Docker container on Unraid.
---

On Unraid you add Stackmoor as a regular container: **Docker → Add Container**.

## Container settings

| Field | Value |
|---|---|
| Name | `stackmoor` |
| Repository | `ghcr.io/gadziunet/stackmoor:latest` |
| Network type | `bridge` |
| WebUI | `http://[IP]:[PORT:5001]/` |

Then add these with **Add another Path, Port, Variable…**:

| Type | Container | Host |
|---|---|---|
| Port | `5001` | `5001` |
| Path | `/var/run/docker.sock` | `/var/run/docker.sock` |
| Path | `/mnt/user/appdata/stackmoor/stacks` | `/mnt/user/appdata/stackmoor/stacks` |
| Variable | `STACKS_DIR` | `/mnt/user/appdata/stackmoor/stacks` |
| Path | `/app/data` | `/mnt/user/appdata/stackmoor/data` |

- **Port** – any free port on the host.
- **`docker.sock`** – gives the panel access to Docker.
- **Stacks folder** – the same path on both sides, and `STACKS_DIR` set to exactly that path.
- **`/app/data`** – the panel's own settings (SQLite).

:::caution[Same path inside and outside]
The panel tells the host's Docker where your stacks are, so the stacks folder must have **the same path in the container and on the host**, and `STACKS_DIR` must point to it. If it does not, your stacks disappear from the panel after an update. The panel shows a warning when the folder is not mounted correctly.
:::

## First start

Open the panel (**WebUI** in Unraid's Docker tab). It asks for a one-time **setup code** before you create the account or restore a server from a backup. You find it in the container's log: click the `stackmoor` icon → **Logs**, and look for the line `Setup code: …`. Or in Unraid's terminal:

```bash
docker logs stackmoor | grep "Setup code"
```

## Updates on Unraid

The panel can't replace a container that Unraid manages. When an update is available, update it in Unraid: **Docker → Check for Updates → Update** next to `stackmoor`.

## Local domains on Unraid

Unraid's own web UI uses ports 80 and 443. If you set up [local domains](/guides/local-domains/), choose other ports for Caddy in the **Domains** tab under **Advanced: ports** – or move Unraid's web UI to other ports first.
