---
title: Automatyczne wolumeny
description: Jak Stackmoor trzyma dane każdej aplikacji we własnym folderze stacka.
---

Nie musisz wymyślać ścieżek na hoście. Każdy stack ma folder `/opt/stacks/<nazwa>/`, a jego dane `/opt/stacks/<nazwa>/data/`. Wszystko o aplikacji jest w jednym miejscu – łatwo ją przenieść i łatwo zrobić [kopię](/pl/backups/setup/).

## Co jest zmieniane

Przy zapisie stacka wolumeny są przepisywane tak:

| W Twoim compose | Po zapisie |
|---|---|
| `- /config` | `- ./data/app-config:/config` |
| `- /jakas/sciezka:/config` | `- ./data/app-config:/config` |
| `- db_data:/var/lib/mysql` | `- ./data/db_data:/var/lib/mysql` |
| nic, ale obraz deklaruje `VOLUME /data` | przy starcie dochodzi `- ./data/app-data:/data` |

Po zapisie panel zawsze pokazuje listę zmian. Komentarze w pliku zostają.

## Czego panel nie rusza

- Ścieżek systemowych, np. `/var/run/docker.sock`, `/dev`, `/etc/localtime`.
- Ścieżek hosta z **listy wyjątków** w **Ustawienia → Foldery** – domyślnie `/mnt` i `/media`. To miejsce na biblioteki multimediów i inne duże foldery. **Nie** trafiają do kopii.
- Ścieżek ze zmiennymi `${ZMIENNA}`.
- Ścieżek względnych w stacku, np. `./config`.
- Wolumenów oznaczonych `external`.

## Właściciel folderów

Foldery powstają przed startem stacka, z właścicielem `PUID:PGID` – domyślnie `1000:1000`, do zmiany w **Ustawienia → Foldery**. Dzięki temu nie należą do roota.

## Pojedyncze pliki

Jeśli aplikacja montuje pojedynczy **plik** (np. `./nginx.conf:/etc/nginx/nginx.conf`), a go nie ma, panel nie uruchomi stacka. Docker utworzyłby w tym miejscu pusty folder. Najpierw utwórz plik, potem uruchom stack.

## Wyłączanie

Automatyczne wolumeny można wyłączyć dla jednego stacka polem **Automatyczne wolumeny** pod edytorem. Plik compose jest wtedy używany dokładnie tak, jak go napisałeś.
