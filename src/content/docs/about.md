---
title: Why Stackmoor
description: Where Stackmoor came from, who it is for and who makes it.
---

## It started with a worry

I run my apps at home with Docker Compose. One of them is [Termix](https://github.com/Termix-SSH/Termix), and one day I realised I had no good answer to a simple question: *what happens if I lose its data?*

The panels I used could start and stop stacks, but a backup meant reaching for an external app or a script: working in the terminal, copying everything to a local disk by hand, then syncing it somewhere safe. Restoring was the same, only more stressful. And most of those tools just copy folders – a database that is running while its files are copied can come back broken. To be safe, a backup has to **dump the database** first.

I wanted backing up and restoring to be as easy as in [Cloudron](https://www.cloudron.io): a few clicks in the panel, no terminal.

Domains were the same story: one more app (a reverse proxy) to install, configure and keep in sync with your stacks.

## What I wanted instead

One simple panel that does the whole job:

- **Plain Docker Compose** – no app catalog, no special format. The `compose.yaml` you write is what runs.
- **No paths to type** – each app keeps its data in its own folder, created for you.
- **Backups built in** – databases dumped while apps keep running, everything encrypted and sent to one S3 or Backblaze B2 bucket, with checksums checked. One app or the whole server can be brought back.
- **Domains built in** – a local domain with a real HTTPS certificate, set next to the stack, not in another tool.
- **A clear interface** – settings for domains and backups where you expect them.

The ideas are borrowed honestly: whole-server backups to one bucket, with apps running, come from [Cloudron](https://www.cloudron.io); folders created automatically and plain compose files come from [Dockge](https://github.com/louislam/dockge).

## Who it is for

People who prefer **simple and comfortable** over endlessly configurable – a home server, a homelab, a small office. If you want your stacks running, on your own domain and safely backed up, without gluing three tools together, Stackmoor is for you.

## The name

A boat that is **moored** is tied up safely in harbour. Stackmoor is the harbour for your stacks: they stay where you put them, and they don't drift away when something goes wrong. (The first names, StackPanel and Moorline, were already taken.)

## Who makes it

Stackmoor is made by **[Gadziunet](https://gadziunet.pl)** and is free and open source under the [AGPL-3.0](https://github.com/gadziunet/stackmoor/blob/main/LICENSE) licence.

It is built with the help of **Claude**, an AI assistant by Anthropic. Every change is reviewed and tested by hand on real servers – Debian and Unraid – before it is released.

Found a bug or have an idea? [Open an issue on GitHub](https://github.com/gadziunet/stackmoor/issues).
