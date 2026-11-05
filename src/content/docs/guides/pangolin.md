---
title: Pangolin
description: Public addresses for chosen apps through your own Pangolin – next to the local domain, with Pangolin's login in front.
---

[Local domains](/guides/local-domains/) work only at home (or through a VPN). When you want an app reachable from anywhere – for family, for a phone without VPN – Stackmoor can give it a **public address through [Pangolin](https://github.com/fosrl/pangolin)**, a self-hosted tunnelled reverse proxy (usually on a small VPS). No ports are opened at home: the server connects out to Pangolin.

## Before you start

- A running Pangolin (version with the Integration API) and a domain set up in it.
- The **Integration API** turned on in Pangolin's `config.yml`:
  ```yaml
  flags:
    enable_integration_api: true
  ```
  and reachable at its own address, e.g. `https://api.pangolin.example.com/v1` (see Pangolin's docs on the Integration API).
- An **API key** for your organization: in Pangolin *Organization → API Keys → Generate*. It needs these permissions: list domains; create, get and delete sites; create, update and delete resources; create targets.

## Connect

**Network → Pangolin:**

1. Enter the Pangolin address (the dashboard), the Integration API address, the **organization ID** (you see it in Pangolin's address bar) and the API key, then click **Save and check**. Stackmoor shows the domains it found.
2. Click **Connect this server**. Stackmoor creates a site called *Stackmoor* in Pangolin and starts its tunnel client **Newt** as the container `stackmoor-newt`. After a moment the page shows *Newt: running* and *In Pangolin: online*.

<figure class="shot" data-shot="pangolin">
<img class="shot-light" src="/screens/en/pangolin-light.webp" alt="Network → Pangolin" width="996" height="857" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/pangolin-dark.webp" alt="Network → Pangolin" width="996" height="857" loading="lazy" decoding="async" />
</figure>

## Give an app a public address

Open the stack → **Domain** tab → **Public address (Pangolin)**. Choose the subdomain and a domain from Pangolin, the service and its port, and click **Add public address**.

<figure class="shot" data-shot="stack-public">
<img class="shot-light" src="/screens/en/stack-public-light.webp" alt="A public address in the stack's Domain tab" width="956" height="386" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/stack-public-dark.webp" alt="A public address in the stack's Domain tab" width="956" height="386" loading="lazy" decoding="async" />
</figure>

- **Pangolin login is on by default.** Only users you let in in Pangolin (*Resources → the address → Authentication*) get through. Turning it off asks for confirmation – then anyone on the internet can open the app and its own login is the only protection.
- A **CNAME** domain in Pangolin is used as it is, without a subdomain.
- Apps with `network_mode: host` and apps connected through the [VPN](/guides/vpn/) work too.
- The app keeps its local address; the public one is extra.

Removing the address removes the resource in Pangolin. Deleting the stack removes its public addresses too. **Disconnect** removes the site with all its addresses from Pangolin and stops Newt.

## Good to know

- Nothing is opened in your router: Newt connects out to Pangolin, Pangolin handles the certificate.
- Newt joins the same Docker network as Caddy (`stackmoor`); apps with a public address are added to it, like for local addresses.
- If the panel can't reach Pangolin's API, check the API address (it usually ends with `/v1`) and that the Integration API is turned on. Read [Security](/guides/security/) before you make anything public.
