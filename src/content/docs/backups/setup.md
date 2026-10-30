---
title: Set up backups
description: Back up every stack and the panel's settings, encrypted, to Backblaze B2, Amazon S3 or any S3-compatible storage.
---

Stackmoor backs up your stacks the way Cloudron does: databases are dumped while the apps keep running, then the files are encrypted and sent to a bucket. It uses [restic](https://restic.net).

## What gets backed up

- **Every stack:** its folder with `compose.yaml`, `.env` and everything in `./data` – one snapshot per stack.
- **Databases:** dumped first; the dump is stored instead of the database's raw files. See [Databases](/backups/databases/).
- **The panel itself:** its settings database, its encryption key and Caddy's files (certificates).

**Not** backed up: host paths on the allow-list (by default `/mnt` and `/media`, e.g. media libraries) and named Docker volumes outside the stack folder – which only exist if you turned [automatic volumes](/guides/automatic-volumes/) off.

## Storage

Any S3-compatible storage works:

| Provider | Address (endpoint) | Keys |
|---|---|---|
| Backblaze B2 | `s3.<region>.backblazeb2.com` – shown at the bucket | Application Keys → Add a New Application Key |
| Amazon S3 | `s3.<region>.amazonaws.com` | IAM user → Security credentials → Create access key |
| Cloudflare R2 | `<account-id>.r2.cloudflarestorage.com`, region `auto` | R2 → Manage API tokens (Object Read & Write) |
| Hetzner Object Storage | `<region>.your-objectstorage.com` (`fsn1`, `nbg1`, `hel1`) | Cloud Console → Object Storage → S3 credentials |
| Wasabi | `s3.<region>.wasabisys.com` | Access Keys → Create new access key |
| Other (MinIO, Garage, …) | its address, e.g. `minio.example.com:9000` | from that storage |

Create a **private bucket** and a key that can only access that bucket.

## Set it up

1. **Settings → Backups:** choose the provider. The address is filled in from the region.
2. Enter the **bucket**, optionally a **folder** inside it (default `stackmoor`), the **access key** and the **secret key**.
3. Set the **encryption password** – type one (at least 12 characters) or click **Generate**.
4. Choose the **days** and **time**, and the [retention](/backups/retention/).
5. Click **Save and test connection**. The first time, the backup repository is created in the bucket.

:::danger[Write the password down]
Backups are always encrypted. Without the password nobody can restore them – not even you. Keep it in a password manager. If the server dies, the bucket and this password are all you need.
:::

## Schedule

Backups run on the chosen days at the chosen time, in the time zone of the browser you saved the settings from. If the panel was restarted right at that time, the backup still runs up to an hour later.

**Back up now** starts a backup immediately. A single stack can also be backed up from its **Backups** tab.

<figure class="shot" data-shot="backups-settings">
<img class="shot-light" src="/screens/en/backups-settings-light.webp" alt="Settings → Backups" width="1020" height="1300" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/backups-settings-dark.webp" alt="Settings → Backups" width="1020" height="1300" loading="lazy" decoding="async" />
</figure>

## Before every update

With **Back up a stack before updating it** on, clicking **Update** on a stack first backs it up. If that backup fails, the update does not run.

## Checksums

restic stores every piece of data under its SHA-256 checksum, so damaged data can't go unnoticed:

- **after every backup** the repository's structure is checked (takes seconds, downloads nothing),
- **once a week** 10% of the data is downloaded and compared – over a few weeks practically everything gets checked,
- **Verify everything** downloads and checks all data. That uses your storage's download transfer.

The status at the top of **Settings → Backups** shows the last backup and the last verification.

## Costs and API calls

The list of backups is kept in the panel, so opening a **Backups** tab does not contact the storage. The list is refreshed after every backup, clean-up and restore – or when you click **Refresh**. Files that did not change are never uploaded again.
