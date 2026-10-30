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

## Restore a deleted stack

**Settings → Backups** lists the backups of all stacks, including ones you have deleted. Click **Restore** there.

## Make a copy (clone)

In the restore form, change **Restore as stack** to a new name, e.g. `nextcloud-test`. The backup is restored as a new stack next to the original.

:::caution
The copy won't start if its `compose.yaml` uses the same published ports or `container_name` as the original. Change them in the copy's editor and start it.
:::

## Restore everything on a new server

Restoring the whole server – the panel's settings and all stacks at once – will come with the setup wizard. The panel's settings are already included in every backup, so backups made today can be used for it.

## Only one app, only its data

All stacks share one repository in the bucket, but a restore only downloads the data of the backup you picked. Restoring a 500 MB app does not download a 50 GB one stored next to it.
