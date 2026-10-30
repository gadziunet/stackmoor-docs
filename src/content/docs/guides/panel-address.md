---
title: Panel address
description: Open the panel itself at its own domain and optionally block access by IP address.
---

Once [local domains](/guides/local-domains/) work, the panel itself can have an address too.

## Give the panel an address

**Settings → Domains → Panel address:** enter a name, e.g. `stackmoor`, and click **Save**. The panel is then also available at `https://stackmoor.home.example.com`.

Saving only reloads Caddy's configuration – nothing is downloaded or restarted.

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
