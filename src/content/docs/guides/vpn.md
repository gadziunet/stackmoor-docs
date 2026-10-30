---
title: Connect through VPN
description: Send chosen apps through your WireGuard tunnel – like a second internet connection only for them.
---

## Why this exists

Stackmoor runs at home, and a home connection usually has a **changing IP address**. Servers outside – VPSes, for example – often have a firewall that allows SSH only from known addresses. With a changing home IP, that firewall either lets everyone in or locks you out.

The usual answer is a **WireGuard tunnel to a server with a fixed address**: the VPS firewalls allow only that address. Your laptop can use the tunnel – but an app running in Docker on your home server, such as the web SSH client [Termix](https://github.com/Termix-SSH/Termix), cannot.

**Connect through VPN** gives such an app its own way out: its traffic goes through your tunnel, so your servers see the tunnel's fixed address. The rest of the home server keeps using your normal connection.

## How it works

It works like a **second internet connection, only for the apps you choose**:

- Stackmoor starts a small container with your WireGuard config (`stackmoor-vpn-<name>`).
- The services you pick share that container's network. Everything they send out goes through the tunnel.
- **What goes through the tunnel follows `AllowedIPs` in your file:** `0.0.0.0/0` sends all of the app's traffic; specific addresses (e.g. your VPSes) send only that, the rest uses your normal connection.
- Your local network keeps working: you still open the app in the browser by its [domain](/guides/local-domains/) or `IP:port`, and the app still reaches its own database.

:::caution[Kill switch – always on]
If the tunnel is down, the apps behind it have **no internet at all**. They never fall back to your home connection, so they never show your home IP to the outside. The panel shows a red warning on every page and marks the stack with **VPN ✕**.
:::

## Add a tunnel

1. **Settings → VPN → Add a tunnel.**
2. Enter a name (e.g. `home`) and paste your WireGuard config, or choose the `.conf` file.
3. Click **Add and start**. After a few seconds the tunnel shows **connected** and the time of the last contact with the server.

For safety, commands in the file (`PostUp`, `PostDown`, …) and `DNS` lines are removed. A keepalive is added so the tunnel stays open behind your router.

## Send an app through it

1. Open the stack → **VPN** tab.
2. Choose the tunnel and tick the **services** that should use it – usually only the app itself, e.g. `termix`. Its database can stay as it is.
3. Click **Save and apply**. The service is recreated; its published ports and its domain keep working.

To stop using the VPN, choose **— no VPN —** and save.

## Status

**Settings → VPN** shows for each tunnel:

- **connected** – contact with the WireGuard server in the last 3 minutes;
- **connecting…** – just started, waiting for the first contact;
- **not working** – no contact for 2 minutes; the apps behind it are cut off.

If the tunnel container restarts (for example after a reboot), Stackmoor reconnects the apps that use it by itself. **Restart** starts the tunnel again; **Replace config** loads a new file.

## Requirements

- WireGuard support in the server's kernel – standard on Debian 11+, Ubuntu 20.04+, Raspberry Pi OS and Unraid.
- Docker Compose 2.24 or newer (installed by the Stackmoor install script).
- A service with its own network mode (`network_mode: host`) cannot go through a VPN.
