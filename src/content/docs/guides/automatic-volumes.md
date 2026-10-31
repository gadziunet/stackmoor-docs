---
title: Automatic volumes
description: How Stackmoor keeps every app's data in its own stack folder.
---

You never have to invent host paths. Each stack lives in `/opt/stacks/<name>/` and its data in `/opt/stacks/<name>/data/`. That keeps everything about an app in one place – easy to move and easy to [back up](/backups/setup/).

## What gets changed

When you save a stack, volumes are rewritten like this:

| In your compose | After saving |
|---|---|
| `- /config` | `- ./data/app-config:/config` |
| `- /some/host/path:/config` | `- ./data/app-config:/config` |
| `- db_data:/var/lib/mysql` | `- ./data/db_data:/var/lib/mysql` |
| nothing, but the image declares `VOLUME /data` | `- ./data/app-data:/data` is added on start |

The panel always lists the changes after saving. Comments in your file are kept.

## What is left alone

- System paths such as `/var/run/docker.sock`, `/dev`, `/etc/localtime`.
- Host paths on the **allow-list** in **Settings → Folders** – by default `/mnt` and `/media`. Use it for media libraries and other large folders. They are **not** backed up.
- Paths that use `${VARIABLES}`.
- Relative paths inside the stack, like `./config`.
- Volumes marked `external`.

## Owners

Folders are created before the stack starts, owned by `PUID:PGID` – by default `1000:1000`, changeable in **Settings → Folders**. That way they don't end up owned by root.

## Single files

If an app mounts a single **file** (for example `./nginx.conf:/etc/nginx/nginx.conf`) and the file does not exist, the panel won't start the stack. Docker would otherwise create an empty folder with that name. Create the file first, then start the stack.

## Turning it off

Automatic volumes can be switched off for a single stack with the checkbox under the editor. The compose file is then used exactly as written.
