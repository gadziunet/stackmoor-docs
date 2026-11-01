---
title: Server
description: Restart the server from the panel or on a schedule, see when it needs a restart, and turn on automatic system patches.
---

**Settings → Server** is about the machine Stackmoor runs on: how long it has been running, whether it needs a restart, restarts (now or on a schedule) and security updates of the system itself.

<figure class="shot" data-shot="server">
<img class="shot-light" src="/screens/en/server-light.webp" alt="Settings → Server" width="996" height="1092" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/server-dark.webp" alt="Settings → Server" width="996" height="1092" loading="lazy" decoding="async" />
</figure>

## Restart the server

**Restart the server** restarts the whole machine after you confirm. The panel and all stacks stop for a minute or two; the page waits and reloads by itself when the panel is back.

After every restart – from the panel, on a schedule, after a patch or after a power cut – Stackmoor starts the stacks that were running before. That includes stacks without `restart:` in their compose file, which Docker would otherwise leave stopped. A stack you stopped yourself stays stopped.

When a backup or an automatic update is running, the panel doesn't restart the server – try again when it has finished.

## Scheduled restarts

Turn on **Restart the server on a schedule** and choose the days and the time, e.g. Sunday at 5:00. If a backup or an automatic update is still running at that time, the panel waits for it to finish (up to two hours). Right after a restart it never restarts again.

## System patches

On **Debian and Ubuntu** the system can install its own security updates every day (the standard `unattended-upgrades` package):

- **Turn on automatic patches** installs `unattended-upgrades` if needed and switches it on. The installer offers the same when you install Stackmoor.
- **Restart after a patch** – some patches (e.g. a new kernel) only work after a restart. With this on, the server restarts by itself at the chosen time, but only when a patch needs it. Pick a time after the nightly backup.

When the system needs a restart, the page shows it together with the packages that need it.

On Unraid the system is updated in Unraid itself (**Tools → Update OS**).

## Good to know

- Stackmoor runs in a container. To restart the server and read its state, it starts a short-lived helper container with access to the host. It controls Docker already, so this gives it nothing it didn't have.
- If the panel shows that it can't reach the server, Stackmoor isn't running as a container on that server (e.g. during development on a laptop).
