---
title: Pierwszy stack
description: Tworzenie, uruchamianie i zarządzanie stackiem Docker Compose w Stackmoor.
---

**Stack** to jedna aplikacja opisana plikiem `compose.yaml` – na przykład Nextcloud z bazą danych. Każdy stack ma własny folder: `/opt/stacks/<nazwa>/`.

## Nowy stack

1. Kliknij **+ Nowy stack**.
2. Nadaj nazwę: małe litery, cyfry, `-` i `_`, np. `miniflux`.
3. Wklej `compose.yaml` – na przykład z dokumentacji aplikacji.
4. Opcjonalnie dodaj plik `.env` ze zmiennymi.
5. Kliknij **Utwórz i uruchom**.

Przed zapisem plik jest sprawdzany przez `docker compose config`. Błędny plik nigdy nie zostanie zapisany – zobaczysz komunikat z błędem.

Po zapisie panel pokazuje dokładnie, co zmienił – zwykle, gdzie będą dane aplikacji (zob. [Automatyczne wolumeny](/pl/guides/automatic-volumes/)).

<figure class="shot" data-shot="overview">
<img class="shot-light" src="/screens/pl/overview-light.webp" alt="Panel Stackmoor z otwartym stackiem" width="1280" height="860" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/overview-dark.webp" alt="Panel Stackmoor z otwartym stackiem" width="1280" height="860" loading="lazy" decoding="async" />
</figure>

## Przykład: Miniflux z PostgreSQL

```yaml
services:
  miniflux:
    image: miniflux/miniflux:latest
    ports:
      - "8090:8080"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://miniflux:secret@db/miniflux?sslmode=disable
      RUN_MIGRATIONS: 1
      CREATE_ADMIN: 1
      ADMIN_USERNAME: admin
      ADMIN_PASSWORD: zmien-mnie-prosze
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: miniflux
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miniflux
    volumes:
      - db:/var/lib/postgresql/data
volumes:
  db:
```

Nazwany wolumen `db` staje się folderem `./data/db` w stacku – bez wpisywania ścieżek.

## Przyciski

| Przycisk | Co robi |
|---|---|
| **Uruchom** | `docker compose up -d` |
| **Restart** | Uruchamia kontenery ponownie |
| **Aktualizuj** | Pobiera nowe obrazy i odtwarza kontenery (najpierw [kopia](/pl/backups/setup/), jeśli skonfigurowana) |
| **Zatrzymaj** | Zatrzymuje kontenery, ale ich nie usuwa |
| **Wyłącz** | Zatrzymuje i usuwa kontenery – dane w `./data` zostają |
| **Otwórz ↗** | Otwiera aplikację w nowej karcie: pod jej [domeną](/pl/guides/local-domains/), jeśli ją ma, a bez niej pod adresem serwera z opublikowanym portem. Gdy adresów jest kilka, pokazuje krótką listę. |

Każda operacja pokazuje wyjście na żywo i zapisuje się w zakładce **Historia**.

<figure class="shot" data-shot="stack">
<img class="shot-light" src="/screens/pl/stack-light.webp" alt="Stack: przyciski i edytor compose" width="1020" height="725" loading="lazy" decoding="async" />
<img class="shot-dark" src="/screens/pl/stack-dark.webp" alt="Stack: przyciski i edytor compose" width="1020" height="725" loading="lazy" decoding="async" />
</figure>

## Porty

Zanim stack wystartuje, panel sprawdza jego publikowane porty. Jeśli port zajmuje inny kontener, zobaczysz który i wolny port do wyboru.

## Usuwanie stacka

**Usuń** prosi o wpisanie nazwy stacka, wyłącza go i przenosi jego folder do `/opt/stacks/.trash/`. Nic nie jest kasowane na stałe – usuń folder z kosza sam, gdy będziesz pewien.
