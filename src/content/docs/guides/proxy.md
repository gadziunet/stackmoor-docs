---
title: Proxy for other servers
description: Give Proxmox, a router, a NAS or any other device in your network an address in your domain with a real certificate.
---

[Local domains](/guides/local-domains/) give every stack an address like `cloud.home.example.com`. A **proxy** does the same for things Stackmoor does not run: Proxmox, your router, a NAS, Home Assistant on another machine. Caddy forwards the address to the device and adds a real certificate – the same wildcard certificate your stacks use.

## Why

If you used Nginx Proxy Manager just to give your other servers a name, you don't need it next to Stackmoor: the panel already runs Caddy for your stacks, so it can serve the rest of your network as well. One place, one certificate, and you can see on the dashboard whether each server responds.

## Add a proxy

You need a [local domain](/guides/local-domains/) first.

1. Click **+ Proxy** next to **+ New stack** (on a phone: **+ Proxy** on the dashboard).
2. **Name** – anything you like, e.g. `Proxmox`. The address is filled in from it (`proxmox`); you can change it.
3. **Target** – where the traffic goes: `https://` or `http://`, the device's IP address or name and its port, e.g. `https://192.168.1.10` and `8006`.
4. For `https` targets with their own certificate – Proxmox, UniFi, most routers and NAS boxes – leave **Don’t check this server’s certificate** on.
5. Click **Check connection**. You see whether the server answers, how fast, and what kind of certificate it has.
6. Click **Save and turn on the address**. It works right away – no new certificate is needed.

<figure class="shot" data-shot="proxy-form">
<img class="shot-light" src="/screens/en/proxy-form-light.webp" alt="A new proxy: name, address, target and the connection check" width="732" height="414" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/proxy-form-dark.webp" alt="A new proxy: name, address, target and the connection check" width="732" height="414" loading="lazy" decoding="async" />
</figure>

## On the dashboard

Proxies have their own section under your stacks. Their cards have a dashed frame and a **PROXY** label, so you can tell them apart from apps. Each card shows the target, the address and whether the server responds.

The panel checks every proxy **once a minute**. When a server stops (or starts again) responding, it shows up in the recent events, and the status bar shows how many proxies respond – e.g. `proxy 2/3`.

There is no **Restart** or backup for a proxy: Stackmoor does not manage that server, it only gives it an address. The **Domains** tab lists proxies together with your stacks' addresses.

<figure class="shot" data-shot="proxy-dashboard">
<img class="shot-light" src="/screens/en/proxy-dashboard-light.webp" alt="Proxies on the dashboard" width="1216" height="225" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/proxy-dashboard-dark.webp" alt="Proxies on the dashboard" width="1216" height="225" loading="lazy" decoding="async" />
</figure>

## Advanced

- **Send the target’s own address as the Host header** – some servers only answer to their own name or IP. Turn this on if the address opens but the server shows an error or a blank page.
- **Show its state on the dashboard** – turn it off for devices that are often switched off on purpose.

## Good to know

- The target must be reachable **from the server** running Stackmoor – it is the server that connects, not your browser.
- WebSockets work without any setting, so web consoles (Proxmox noVNC, Home Assistant) work too.
- When the target redirects to its own address (Unraid sends you to `http://192.168.1.10:8086/Dashboard`), Stackmoor turns that back into your address – just like Nginx Proxy Manager. Redirects to other addresses are left alone.
- A stack running with `network_mode: host` doesn't need a proxy: give it an address in its own **Domain** tab with the port it listens on.
