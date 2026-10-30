---
title: Updates
description: How Stackmoor checks for new versions of itself and of your stacks' images.
---

Stackmoor tells you when something new is available. **Nothing is ever updated without your confirmation.**

## Settings

**Settings → Updates:**

- **Check for updates automatically** – daily or weekly.
- **Also check stack images** – compares your local images with their registry (Docker Hub, GitHub Container Registry, …).
- **Check now** – runs the check immediately.

## Updating a stack

A stack with a new image shows an arrow in the list and a notice with the images. Open it and click **Update**: new images are pulled and the containers recreated. Data in `./data` is kept.

If [backups](/backups/setup/) are set up, the stack is backed up first. If that backup fails, the update does not run.

## Updating Stackmoor

When a new version is out, **Settings → Updates** shows what is new. How to update depends on how Stackmoor was installed:

| Installed with | How to update |
|---|---|
| The install script | Click **Update Stackmoor**. The panel restarts for a moment; your stacks keep running. |
| Unraid | Docker tab → **Check for Updates** → **Update** next to the container |
| A fixed version tag (e.g. `:0.5.0`) | Change the tag to `latest` or the new version and recreate the container |
| Your own compose file | `docker compose pull && docker compose up -d` in its folder |
