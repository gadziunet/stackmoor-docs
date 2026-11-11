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
4. prints the address and a one-time **setup code**, e.g. `http://192.168.1.50:5001` and `K7QM-4XWD-9TPA`.

Open that address, enter the setup code and create the administrator account – it is the only account in the panel. The password needs at least 10 characters.

The setup code makes sure that only someone who can see the server's console – you – creates the account or restores a server from a backup. Until the account exists, anyone on your network could otherwise do it first. The code works only once: it is gone as soon as the account exists. If you lost it, show it again on the server:

```bash
docker logs stackmoor | grep "Setup code"
```

<figure class="shot" data-shot="setup-code">
<img class="shot-light" src="/screens/en/setup-code-light.webp" alt="Creating the administrator account with the setup code" width="380" height="692" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/setup-code-dark.webp" alt="Creating the administrator account with the setup code" width="380" height="692" loading="lazy" decoding="async" />
</figure>

Next the panel asks **how you want to open it**: by IP address for now, or with your own domain right away (e.g. `https://my.home.example.com`) – see [Local domains](/guides/local-domains/). You can change this later at any time.

Moving from an old server? Choose **Restore a server from a backup** instead – see [Restore everything on a new server](/backups/restore/#restore-everything-on-a-new-server).

<figure class="shot" data-shot="setup-access">
<img class="shot-light" src="/screens/en/setup-access-light.webp" alt="After creating the account: IP address for now, or the domain right away" width="620" height="302" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/setup-access-dark.webp" alt="After creating the account: IP address for now, or the domain right away" width="620" height="302" loading="lazy" decoding="async" />
</figure>
<figure class="shot" data-shot="setup-domain">
<img class="shot-light" src="/screens/en/setup-domain-light.webp" alt="Setting up the domain in the first-run wizard" width="620" height="932" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/setup-domain-dark.webp" alt="Setting up the domain in the first-run wizard" width="620" height="932" loading="lazy" decoding="async" />
</figure>

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

Either click **Update** in the notice at the top of the panel (it also shows in the status bar and in **Settings → Updates**), or run the install command again. Your stacks and settings are kept.

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
