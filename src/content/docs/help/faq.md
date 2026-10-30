---
title: FAQ
description: Questions about Stackmoor, and how it compares with other panels.
---

## Is Stackmoor free?

Yes. It is open source under the [AGPL-3.0](https://github.com/gadziunet/stackmoor/blob/main/LICENSE) license: you may use, change and share it freely. If you distribute a changed version or offer it as a service, you must publish your changes under the same license.

## Is it safe to put on the internet?

No. Stackmoor controls Docker, which means full control over the machine. Keep it on your local network or behind a VPN. For apps, [local domains](/guides/local-domains/) give you HTTPS without opening anything to the internet.

## Can I keep using my stacks from the shell?

Yes. Stacks are ordinary folders with a `compose.yaml` in `/opt/stacks/<name>/`. `docker compose` works there as usual.

## Can I manage several servers?

Not yet – Stackmoor manages the server it runs on.

## Several user accounts?

Not yet – there is one administrator account.

## Which languages does the panel speak?

English and Polish. Translations are welcome – see the [repository](https://github.com/gadziunet/stackmoor#development).

## How is Stackmoor made?

It is written with the help of [Claude](https://claude.ai) by Anthropic. The author designs the features, reviews every change and tests each release on real servers (Debian and Unraid) before publishing it. Automated tests run on every push.

## How does it compare with other panels?

Stackmoor does less than a full Docker platform, and more where one home server needs it:

| | Stackmoor | Dockge | Portainer CE |
|---|---|---|---|
| Compose stacks in the browser | yes | yes | yes |
| App data moved into the stack folder automatically | yes | no | no |
| Backups of app data and databases, with restore | yes – S3 / B2 | no | no |
| Local domains with certificates, built in | yes – Caddy | no | no |
| Many servers | not yet | yes – agents | yes |
| Several user accounts | one admin | one admin | yes |
| License | AGPL-3.0 | MIT | zlib |

Based on each project's documentation, October 2026. Something out of date? [Open an issue](https://github.com/gadziunet/stackmoor-docs/issues).
