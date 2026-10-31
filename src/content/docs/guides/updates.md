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

<figure class="shot" data-shot="updates">
<img class="shot-light" src="/screens/en/updates-light.webp" alt="Settings → Updates" width="996" height="686" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/updates-dark.webp" alt="Settings → Updates" width="996" height="686" loading="lazy" decoding="async" />
</figure>

## Updating a stack

A stack with a new image is marked **Update** on the dashboard and gets an arrow in the stack list. Click **Update** on its card (or open it and click **Update**): new images are pulled and the containers recreated. Data in `./data` is kept.

If [backups](/backups/setup/) are set up, the stack is backed up first. If that backup fails, the update does not run.

## Caddy updates with the panel

If you use [local domains](/guides/local-domains/), there is nothing separate to update. Every Stackmoor release comes with its own Caddy image (with the newest Caddy fixes at the time), and after you update the panel it switches Caddy to that image by itself. Certificates are kept; addresses are unavailable only for a few seconds.

If the new Caddy image can't be downloaded (for example without internet), the current Caddy keeps working, the **Domains** tab shows a note, and the panel tries again every few hours.

## Updating Stackmoor

When a new version is out, a black bar appears under the top menu – *New panel version* – and the version in the status bar at the bottom gets an arrow. **What’s new** or **Update** opens a window with the release notes; **×** hides the bar until the next version. The same is in **Settings → Updates**.

After you click **Update now**, the window shows the steps. The page reloads by itself as soon as the new panel answers – after 30 seconds at the latest – and then checks the version once more, so no stale notice stays behind.

How to update depends on how Stackmoor was installed:

| Installed with | How to update |
|---|---|
| The install script | Click **Update now**. The panel restarts for a moment; your stacks keep running. |
| Unraid | Docker tab → **Check for Updates** → **Update** next to the container |
| A fixed version tag (e.g. `:0.5.0`) | Change the tag to `latest` or the new version and recreate the container |
| Your own compose file | `docker compose pull && docker compose up -d` in its folder |

<figure class="shot" data-shot="update-dialog">
<img class="shot-light" src="/screens/en/update-dialog-light.webp" alt="A new panel version: the bar under the menu and the window with release notes" width="1280" height="860" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/update-dialog-dark.webp" alt="A new panel version: the bar under the menu and the window with release notes" width="1280" height="860" loading="lazy" decoding="async" />
</figure>
