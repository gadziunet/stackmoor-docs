---
title: Restore
description: Restore a stack from a backup, or make a copy of it.
---

## Restore a stack

1. Open the stack → **Backups** tab. Every backup is listed with its date and size; backups made before an update are marked.
2. Click **Restore** next to the backup you want.
3. Type the stack's name to confirm and click **Restore**.

What happens:

1. the stack is shut down,
2. its current folder is moved to `/opt/stacks/.trash/<name>-before-restore-<date>` – nothing is deleted,
3. the files from the backup come back,
4. the databases start empty and are loaded from their dumps,
5. the whole stack starts again.

The output is shown live and saved in the stack's **History**.

<figure class="shot" data-shot="stack-backups">
<img class="shot-light" src="/screens/en/stack-backups-light.webp" alt="A stack’s Backups tab" width="956" height="297" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/stack-backups-dark.webp" alt="A stack’s Backups tab" width="956" height="297" loading="lazy" decoding="async" />
</figure>

## Backup runs

**Settings → Backups** lists backups by **run**: one nightly run contains every stack and the panel's own settings; a backup of a single stack or a backup before an update is a run of its own. Open a run to see its stacks – including ones you have deleted since – and restore any of them.

<figure class="shot" data-shot="backups-runs">
<img class="shot-light" src="/screens/en/backups-runs-light.webp" alt="Backup runs with the stacks in each" width="956" height="495" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/backups-runs-dark.webp" alt="Backup runs with the stacks in each" width="956" height="495" loading="lazy" decoding="async" />
</figure>

## Restore all stacks of a run

Open a run and click **Restore all stacks**. Every stack of that run is restored one after another, exactly as above. The panel's own settings stay as they are.

## Restore a deleted stack

Open a run in **Settings → Backups** that still contains the stack, and click **Restore** next to it.

## Make a copy (clone)

In the restore form, change **Restore as stack** to a new name, e.g. `nextcloud-test`. The backup is restored as a new stack next to the original.

:::caution
The copy won't start if its `compose.yaml` uses the same published ports or `container_name` as the original. Change them in the copy's editor and start it.
:::

## Restore everything on a new server

When a server dies, install Stackmoor on a new one ([Linux](/start/install/) or [Unraid](/start/unraid/)) and open the panel. Instead of creating an account:

1. click **Restore a server from a backup**,
2. enter the storage (provider, address, bucket, folder, keys) and the **encryption password** of the old server, and click **Connect**,
3. choose a backup – only complete runs are offered (they contain the panel's settings),
4. click **Restore this backup** and follow the progress.

Stackmoor restores, in this order:

- the panel's settings: your administrator account (with its password), backup schedule and retention, local domains and DNS keys,
- every stack of that run, with its databases,
- Caddy with its certificates, if you used local domains.

Then log in with your **previous** account.

:::tip
The new server may use a different stacks folder – stacks are restored into the folder of the new installation. Point your DNS record to the new server's IP if it changed.
:::

Backups made by version 0.5 can be used too: their snapshots are grouped into runs by time.

<figure class="shot" data-shot="setup-restore">
<img class="shot-light" src="/screens/en/setup-restore-light.webp" alt="Restoring a whole server in the first-run wizard" width="620" height="706" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/setup-restore-dark.webp" alt="Restoring a whole server in the first-run wizard" width="620" height="706" loading="lazy" decoding="async" />
</figure>

## Only one app, only its data

All stacks share one repository in the bucket, but a restore only downloads the data of the backup you picked. Restoring a 500 MB app does not download a 50 GB one stored next to it.
