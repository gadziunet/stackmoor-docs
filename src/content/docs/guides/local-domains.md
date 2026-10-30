---
title: Local domains
description: Give every stack an address like cloud.home.example.com with a real HTTPS certificate.
---

Stackmoor can give every stack an address such as `cloud.home.example.com` with a valid HTTPS certificate – no ports to remember. The server does **not** need to be reachable from the internet: the certificate is obtained through your DNS provider's API.

## How it works

- A Caddy container (`stackmoor-caddy`) sits in front of your stacks.
- It holds **one wildcard certificate** (`*.home.example.com`) from Let's Encrypt, proven through your DNS provider's API (DNS-01).
- Stacks with an address join a shared Docker network, and Caddy forwards each address to the right container and port.

## Set it up

You can do this right after installing – the panel asks *How do you want to open the panel?* after you create your account – or any time later in **Settings → Domains**.

1. **Choose a domain** you own, e.g. `home.example.com`. Apps get `<name>.home.example.com`, the panel itself `my.home.example.com`.
2. **Pick the DNS provider** and paste its API key. Keys are stored encrypted.
3. **Check the server's IP address** – the address in your network, e.g. `192.168.1.50`. It is filled in from the address you opened the panel with.
4. Click **Save and apply** (in the wizard: **Check and set up**). Stackmoor first [checks the domain](#before-saving-the-domain-is-checked), then adds the DNS record and starts Caddy. The first certificate can take a minute or two (with netcup about 15 minutes).
5. **Open a stack → Domain:** add an address – subdomain, service and the port the app listens on **inside** its container (the right number in `"8080:80"`).

:::tip
A stack with an address does not need to publish any port at all.
:::

## The DNS record is added for you

Your addresses need one DNS record: `*.home.example.com` → the server's IP. With these providers Stackmoor adds it (or updates it) through the API, so there is nothing to do in the provider's dashboard:

**Cloudflare, Bunny DNS, Hetzner, DigitalOcean, Porkbun, deSEC, DuckDNS**

With the other providers, the form shows the record to add by hand: an `A` record for `*.home.example.com` pointing to the server's IP. A local IP like `192.168.1.50` is fine. If you prefer to manage the record yourself, untick *Add the DNS record automatically*.

## Before saving, the domain is checked

The first time you save a domain, Stackmoor checks that:

- **the API key works** and the domain is in that account – a wrong key shows up right away, not minutes later as a missing certificate;
- **the domain is not used yet** – if `*.home.example.com` already points to another server (for example your Cloudron), you get a warning with that address. Choose a different domain (e.g. a subdomain), or click **Use anyway** to point it to this server.

## DNS providers

| Provider | What you need | Where to get it |
|---|---|---|
| Cloudflare | API token | My Profile → API Tokens → token with *Zone:Read* and *Zone:DNS:Edit* for your domain |
| Bunny DNS | API key | dash.bunny.net → Account settings → API key |
| OVHcloud | Endpoint, application key, application secret, consumer key | api.ovh.com/createToken with rights to `/domain/zone/*`. Europe: endpoint `ovh-eu` |
| Hetzner | API token | Hetzner Console → project → Security → API tokens (read & write) |
| DigitalOcean | Personal access token | API → Generate new token with write access |
| Porkbun | API key, secret API key | Account → API Access, then turn on *API Access* for the domain |
| Namecheap | API user, API key | Profile → Tools → API Access; whitelist the server's public IP |
| GoDaddy | API key, API secret | developer.godaddy.com → API Keys → Production key |
| IONOS | API key (`prefix.secret`) | developer.hosting.ionos.de → API keys |
| netcup | Customer number, API key, API password | CCP → Master data → API |
| Gandi | Personal access token | account.gandi.net → Personal Access Tokens with LiveDNS rights |
| AWS Route 53 | Access key ID, secret access key, hosted zone ID (optional) | IAM user allowed to list zones and change records |
| deSEC | Token | desec.io → Token management |
| DuckDNS | Token | Top of duckdns.org after logging in; domain e.g. `myhome.duckdns.org` |

The provider can be changed any time; saved keys are never shown again, only their last characters.

**No supported provider?** Choose *No provider – internal certificate*. Caddy then uses its own certificate authority, and browsers warn until you trust Caddy's root certificate on your devices.

## Ports

Caddy uses ports 80 and 443 on the server. If they are taken (on Unraid by its web UI), choose others under **Advanced: ports**.

## Apps on the host network

Services with `network_mode: host` can't join Caddy's network. Caddy reaches them through the host instead – just give the port the app listens on.

## DNS rebinding protection

Some DNS filters and routers (Pi-hole, AdGuard, ControlD, Fritz!Box, some ISP routers) block public names that point to private IPs like `192.168.x.x`. If an address does not open in the browser, allow your domain in that filter.
