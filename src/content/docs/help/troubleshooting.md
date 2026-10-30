---
title: Troubleshooting
description: Common problems and how to fix them.
---

## The panel

### “Port … is already in use” when installing

Another program uses port 5001. Install on another port: `curl … | sudo PORT=5002 bash`.

### “The stacks folder … is not mounted from the host”

The stacks folder must have the same path inside the container and on the host, and `STACKS_DIR` must point to it. With the install script this is automatic; on Unraid check the [container settings](/start/unraid/).

### I can't open the panel by IP address any more

The panel is set to open only at its domain. If the domain doesn't work, unlock it:

```bash
docker exec stackmoor node src/cli.js unlock
```

### The panel looks old after an update

Reload the page once with **Ctrl+Shift+R** (**Cmd+Shift+R** on a Mac).

## Stacks

### A stack doesn't start: port in use

The message names the container that uses the port and suggests a free one. Change the left number in `ports:` (e.g. `"8081:80"`) and start again.

### “Missing configuration files that the app mounts as single files”

The stack mounts a single file that does not exist yet. Create it in the stack folder first – otherwise Docker would create an empty folder in its place.

## Local domains

### The certificate is “not issued yet”

The first certificate can take a minute or two (netcup: about 15 minutes). Click **Refresh** in **Settings → Domains**. If an error appears there, it usually means a wrong API key or missing rights for the DNS zone.

### The address doesn't open

- Check the DNS record: `*.home.example.com` → the server's IP.
- DNS filters and routers with **rebinding protection** (Pi-hole, AdGuard, ControlD, some routers) block names that point to private IPs. Allow your domain there.
- Ports 80/443 may be used by something else – choose other ones under **Advanced: ports**.

## Backups

### “The storage already holds backups made with a different encryption password”

The bucket and folder already contain a repository created with another password. Enter that password, or choose another folder for a new repository.

### “Database dump of … failed”

Check the output under the error. Common causes: the container's database user or password variables were changed after the database was created, or the service is not really a database – then mark it with `stackmoor.backup.dump: none` (see [Databases](/backups/databases/)).

### “Checksum verification failed”

Some data in the bucket is damaged or missing. Make a new backup right away, check the storage provider's status, and run **Verify everything** again.
