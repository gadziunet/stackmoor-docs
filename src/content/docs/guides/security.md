---
title: Security
description: What to protect on a server with Stackmoor, and how – step by step.
---

Stackmoor controls Docker on your server. Whoever can log in to the panel can start any container – in practice they control the whole server. The same is true for every Docker panel (Portainer, Dockge…). So the most important thing is simple: **only you can reach the panel.**

## The most important

### Keep the panel off the internet

- **Don't forward ports to the server** on your router – neither the panel's port (5001) nor 80/443. The local domain (`*.home.example.com`) points to a private address, so it works only at home, and that's how it should stay.
- **From outside, connect through a VPN** to your home network (WireGuard, the VPN on your router, Tailscale…) and open the panel as if you were at home.
- To make some app public, don't forward 80/443 to Stackmoor's Caddy – the panel's address would become public too. Public addresses through Pangolin are planned.

### A strong password

The panel requires at least 10 characters. Use a long, random one from a password manager (16 or more characters). After 10 wrong attempts in 15 minutes, logging in from that address is blocked for a while.

### Keep everything up to date

- **The panel** – the bar *New panel version* shows when an update is out. See [Updates](/guides/updates/).
- **Stacks** – update them yourself or turn on [automatic updates](/guides/updates/#automatic-updates).
- **The system** – turn on automatic security patches in [Settings → Server](/guides/server/) (Debian/Ubuntu).

### Backups

Set up [backups](/backups/setup/). They are encrypted – keep the backup password somewhere other than the server, e.g. in your password manager. Without it, nobody can restore them, including you.

## The server

### SSH

- Log in with a **key** instead of a password, and don't log in as root. In `/etc/ssh/sshd_config`:
  ```
  PermitRootLogin no
  PasswordAuthentication no
  ```
  Then `sudo systemctl restart ssh`. Check that logging in with the key works **before** you close the current session.

### Firewall – and a trap with Docker

A firewall like `ufw` limits who can reach the server's services, e.g. only your home network:

```
sudo ufw allow from 192.168.1.0/24 to any port 22 proto tcp
sudo ufw enable
```

:::caution[Docker bypasses ufw]
Ports that containers publish (`ports:` in compose) are reachable even when ufw blocks them – Docker adds its own rules in front of ufw. So the real protection is the router (no port forwarding), and in compose: publish only what is needed.
:::

### Publish only what is needed

If an app is opened through its address in the [local domain](/guides/local-domains/), it doesn't need its own port on the server at all – Caddy reaches it inside Docker. Remove its `ports:` or limit them to the server itself:

```yaml
ports:
  - "127.0.0.1:8080:80"   # only from the server itself, not from the network
```

## Apps (stacks)

- **Images from trusted sources** – official ones, or the app authors' own (Docker Hub *Official* / *Verified*, the project's GitHub). Avoid random images that copy a popular name.
- **Passwords in `.env`**, not in `compose.yaml` – the editor has a separate field for it. Both are in the backup, encrypted.
- **Be careful with:**
  - `privileged: true` – the container can do almost anything on the server,
  - mounting `/var/run/docker.sock` into an app – the app gets the same power as the panel,
  - `network_mode: host` – the app sees the server's whole network. Sometimes it is needed (e.g. Wake-on-LAN or network scanning), but only then.
- **Databases** – pin the version (`postgres:16`, not `latest`) and leave them out of [automatic updates](/guides/updates/#automatic-updates) if you prefer to update them yourself.

## What Docker and Stackmoor already do

- **Docker** wraps every container in AppArmor (Debian/Ubuntu) or SELinux (Fedora) and seccomp, which blocks dangerous system calls. Check it with:
  ```
  docker info --format '{{.SecurityOptions}}'
  ```
  You should see `apparmor` (or `selinux`) and `seccomp`. Containers with `privileged: true` lose this protection.
- **Stackmoor:**
  - login sessions in a cookie that scripts on the page can't read, valid only for the panel's own pages,
  - a limit on login attempts,
  - API keys of DNS providers and backup credentials stored encrypted,
  - encrypted backups,
  - [panel only through its domain](/guides/panel-address/) – opening it by IP redirects to the domain with a certificate,
  - deleting a stack moves its folder to `.trash/` instead of deleting the data.
- Stackmoor connects to the internet only for what you use: update checks (GitHub), pulling images, your DNS provider and your backup storage. It sends no data about you.

## Checklist

- [ ] The panel isn't reachable from the internet – no port forwarding on the router
- [ ] From outside only through a VPN
- [ ] A long password from a password manager
- [ ] Automatic system patches on ([Settings → Server](/guides/server/))
- [ ] Backups set up, the backup password kept outside the server
- [ ] SSH with a key, no root login
- [ ] Apps publish only the ports they need
