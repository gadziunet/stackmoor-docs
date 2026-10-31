---
title: Panel address
description: Open the panel itself at its own domain and optionally block access by IP address.
---

Once [local domains](/guides/local-domains/) work, the panel itself can have an address too.

## Give the panel an address

When you add a domain, the panel gets the address `my` right away – e.g. `https://my.home.example.com`.

To change it: **Settings → Panel address**, enter another name (e.g. `stackmoor`) and click **Save**. Leave the field empty to turn the panel address off.

Saving only reloads Caddy's configuration – nothing is downloaded or restarted.

<figure class="shot" data-shot="panel-address">
<img class="shot-light" src="/screens/en/panel-address-light.webp" alt="Settings → Panel address" width="996" height="234" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/en/panel-address-dark.webp" alt="Settings → Panel address" width="996" height="234" loading="lazy" decoding="async" />
</figure>

## Allow the panel only at its address

You can block opening the panel by IP address (e.g. `http://192.168.1.50:5001`). After that, the panel only opens at its domain, and visits by IP are redirected there.

To make sure you can't lock yourself out:

- the option can only be turned on **while you have the panel open at its domain** – proof that the address works,
- requests from your own server (for example health checks) still work.

:::note
Your browser treats the domain and the IP address as two different sites, so you log in once more after switching.
:::

## If the domain stops working

Unlock the panel from the server's shell:

```bash
docker exec stackmoor node src/cli.js unlock
```

On Unraid, use your container's name instead of `stackmoor`. After that the panel opens by IP address again.
