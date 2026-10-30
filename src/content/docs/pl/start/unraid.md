---
title: Instalacja na Unraid
description: Stackmoor jako kontener Dockera na Unraid.
---

Na Unraid dodajesz Stackmoor jak zwykły kontener: **Docker → Add Container**.

## Ustawienia kontenera

| Pole | Wartość |
|---|---|
| Name | `stackmoor` |
| Repository | `ghcr.io/gadziunet/stackmoor:latest` |
| Network type | `bridge` |
| WebUI | `http://[IP]:[PORT:5001]/` |

Potem dodaj przez **Add another Path, Port, Variable…**:

| Typ | Kontener | Host | Uwagi |
|---|---|---|---|
| Port | `5001` | `5001` | Dowolny wolny port hosta |
| Path | `/var/run/docker.sock` | `/var/run/docker.sock` | Dostęp do Dockera |
| Path | `/mnt/user/appdata/stackmoor/stacks` | `/mnt/user/appdata/stackmoor/stacks` | **Ta sama ścieżka po obu stronach** |
| Variable | `STACKS_DIR` | `/mnt/user/appdata/stackmoor/stacks` | Musi się zgadzać ze ścieżką wyżej |
| Path | `/app/data` | `/mnt/user/appdata/stackmoor/data` | Ustawienia panelu (SQLite) |

:::caution[Ta sama ścieżka w środku i na zewnątrz]
Panel podaje Dockerowi hosta położenie stacków, więc folder stacków musi mieć **tę samą ścieżkę w kontenerze i na hoście**, a `STACKS_DIR` musi na niego wskazywać. Inaczej stacki znikną z panelu po aktualizacji. Panel pokazuje ostrzeżenie, gdy folder nie jest podpięty poprawnie.
:::

## Aktualizacje na Unraid

Panel nie może podmienić kontenera, którym zarządza Unraid. Gdy pojawi się aktualizacja, zrób ją w Unraid: **Docker → Check for Updates → Update** przy `stackmoor`.

## Domeny lokalne na Unraid

Panel Unraid zajmuje porty 80 i 443. Jeśli konfigurujesz [domeny lokalne](/pl/guides/local-domains/), wybierz dla Caddy inne porty w **Ustawienia → Domeny → Zaawansowane: porty** – albo najpierw przenieś panel Unraid na inne porty.
